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
      if(geomWsUrl.includes('geojson'))
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
    /** try to find a vertex in the line geometry near the vehicle's position
     *  hacky line intersection uses rounding points to 3 decimal places and comparing
     */
    let retVal = 0;
    let places = 3;
    let start = 0;  // todo - cache last start point, for quicker calc (might not be needed)

    let lat = vehicle.lat.round(places);
    let lon = vehicle.lon.round(places);

    let found = 0;
    let numFound = 0;
    for(let x = start; x < geom.length; x++) {
      if(geom[x][0].round(places) === lat && geom[x][1].round(places) === lon) {
        found = x;
        numFound++;
        continue;
      }
      // the following allows multiple found (simplified) intersections, and take last point as snap
      if(found > 0) {
        retVal = found - Math.floor(numFound/2);
        break;
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
