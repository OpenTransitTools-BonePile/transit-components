import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

// const tiUrl = "https://maps.trimet.org/otp_mod/index";
// const tiUrl = "http://localhost:54445/ti";
//const tiUrl = "https://maps7.trimet.org/ti/index";
const tiUrl = "https://betaplanner.trimet.org/ws/ti/v0/index";

//const geojson = "";  // use this setting if want to use encoded vs. geojson
const geojson = "/geojson";


Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

class VehicleGeometry extends MapLayer {
  patterns = [];

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  cachePatternEncoded(pat, key) {
    let geom = pat.points;
    const pts = polyline.decode(geom);
    this.patterns[key] = pts;
  }

  cachePatternGeojson(pat, key) {
    /**
     * will cache the [[lat,lon], [lat,lon], etc...] coords
     * note: geojson uses [lon,lat] (e.g., [X, Y], so must reverse that to match encoded coords
     */
    let revCoords = [];
    for(const c of pat.coordinates)
      revCoords.push(c.reverse())
    this.patterns[key] = revCoords;
  }

  getAgencyPattern(vehicle) {
    const a = vehicle.agencyId || "TriMet";
    const p = vehicle.shapeId;
    return `${a}:${p}`;
  }

  getUrl(vehicle, ap) {
    const d = Date.now();
    if(!ap)
      ap = this.getAgencyPattern(vehicle);

    let retVal = `${tiUrl}/patterns/${ap}/geometry${geojson}?date=${d}`;
    return retVal
  }

  isNorthbound(vehicle) {
    return (vehicle.heading <= 45.0 || vehicle.heading >= 315.0);
  }
  isSouthbound(vehicle) {
    return (vehicle.heading >= 135.0 && vehicle.heading <= 225.0);
  }
  isEastbound(vehicle) {
    return (vehicle.heading > 45.0 && vehicle.heading < 135.0);
  }
  isWestbound(vehicle) {
    return (vehicle.heading > 225.0 && vehicle.heading < 315.0);
  }

  callGeometryWS(vehicle) {
    // https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
    let retVal = null;

    const ap = this.getAgencyPattern(vehicle);
    let geomWsUrl = this.getUrl(vehicle, ap);

    console.log("Calling GEO URL: " + geomWsUrl);
    fetch(geomWsUrl)
    .then(res => {
      retVal = res.json();
      return retVal;
    })
    .then(json => {
      if(geomWsUrl.indexOf('geojson') >= 0)
        this.cachePatternGeojson(json, ap);
      else
        this.cachePatternEncoded(json, ap);
    })
    .catch(error => {
      console.log("VEH GEOMETRY fetch() error: " + error);
    });
    return retVal;
  }

  findPointOnLine(vehicle, geom) {
    /** brute-force find a vertex in the line geometry near the vehicle's position
     *  a bit hacky line intersection uses rounding points to N decimal places (rough find)
     *  and then looking for the nearest lat / lon in that subset of points
     */
    let retVal = 0;

    // step 1: round our vehicle position to 2 decimal 'places'
    let places = 2;
    let lat = vehicle.lat.round(places);
    let lon = vehicle.lon.round(places);

    // step 2: bunch of variables for finding the best split point of the line to the vehicle
    let found = 0;
    let bestEqualsBest = false;
    let bestLat = -1;
    let bestLon = -1;
    let closeLat = 111.111;
    let closeLon = 111.111;

    // step 3: loop thru the whole line (probably a better / quick sort way to do this, but...)
    //         note: tried to optimize to stop looping entire route, but not good for 72 (Swan Is)
    for(let i = 0; i < geom.length; i++) {

      // step 4: find a rough set of points in the line that are near the vehicle position (2 decimal places)
      if(geom[i][0].round(places) === lat && geom[i][1].round(places) === lon) {
        found = i;

        // step 5: find the closest lat & lon within this sub-set of rough split points
        let x = Math.abs(geom[i][1] - vehicle.lon);
        if(x < closeLon) {
          if(closeLon != 111.111)
            bestLon = i;
          closeLon = x;
        }

        let y = Math.abs(geom[i][0] - vehicle.lat);
        if(y < closeLat) {
          if(closeLat != 111.111)
            bestLat = i;
          closeLat = y;
        }

        // step 6: found will be index of the best
        if(bestLon > 0 && bestLon === bestLat) {
          found = i;
          retVal = i;
          bestEqualsBest = true;
        }
      }
    }

    // step 6b: eliminate step 6's result if there is a better lat/lon index close by each other
    if(bestEqualsBest && Math.abs(bestLon - bestLat) <= 10)
      bestEqualsBest = false;

    // step 7: have we 'found' any candidate line split points from looping thru the line ?
    if(bestEqualsBest === false && found > 0) {
      retVal = found;  // if so, let's use that rough index as a split-point

      // step 8: let's see if there's a better split point from step #5 above to use over 'found'
      //         note: we'll occasionally use the vehicle's heading to chose the best split point
      if(bestLat >= 0 && bestLon >= 0) {
        if(bestLat === bestLon)
          retVal = bestLat;
        else if(this.isNorthbound(vehicle) || this.isSouthbound(vehicle))
          retVal = bestLat;
        else
          retVal = bestLon;
      }
    }

    return retVal;
  }

  getGeometry(vehicle) {
    /**
     * find the vehicle's pattern, either in cache or via the pattern service (which is not request/
     * /response, thus might not come back in this call)
     */
    let retVal = null;

    // step 1: get the geometry (either from cache or by calling the pattern service)
    const key = this.getAgencyPattern(vehicle);
    let geom = this.patterns[key];
    if(!geom) {
      this.callGeometryWS(vehicle);
      geom = this.patterns[key];
    }

    // step 2: if we have a line geometry, let's break it in 2 at the vehicle location
    if(geom) {
      let geomGray = [];
      let geomColor = [];
      let mid = 0;

      if(vehicle.stopSequence === 1)
        mid = 0;
      else
        mid = this.findPointOnLine(vehicle, geom);

      for(let i = 0; i < geom.length; i++) {
        if(i <= mid)
          geomGray.push(geom[i]);
        if(i >= mid)
          geomColor.push(geom[i]);
      }
      retVal = [
        {key: key + "-PAST", geometry: geomGray},
        {key: key + "-FUTURE", geometry: geomColor},
      ];

    }

    return retVal;
  }

  render () {
    const vehicle = this.props.trackedVehicle;
    if(!vehicle)
      return <FeatureGroup />;

    let pattern = this.getGeometry(vehicle);
    if(!pattern)
      return <FeatureGroup />;

    console.log("drawing...")

    const gray = '#555555';
    const color = '#00bfff';
    const segments = [];
    segments.push(
      <Polyline
        key={pattern[0].key}
        positions={pattern[0].geometry}
        weight={4}
        color={gray}
        opacity={0.8}
      />
    );
    segments.push(
      <Polyline
        key={pattern[1].key}
        positions={pattern[1].geometry}
        weight={4}
        color={color}
        opacity={0.8}
      />
    );

    return segments.length > 0
      ? <FeatureGroup><div>{segments}</div></FeatureGroup>
      : <FeatureGroup />;
  }
}

export default VehicleGeometry;
