import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

// const tiUrl = "https://maps.trimet.org/otp_mod/index";
// const tiUrl = "http://localhost:54445/ti";
//const tiUrl = "https://maps7.trimet.org/ti/index";
const tiUrl = "https://betaplanner.trimet.org/ws/ti/v0/index";

//const geojson = "";  // use this setting if want to use encoded vs. geojson
const geojson = "/geojson";



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

  getGeometry(vehicle) {
    /**
     * find the vehicle's pattern, either in cache or in
     */
    const key = this.getAgencyPattern(vehicle);
    let geom = this.patterns[key];
    if(!geom) {
      this.callGeometryWS(vehicle);
      geom = this.patterns[key];
    }
    let retVal = geom;
    return retVal;
  }

  render () {
    const vehicle = this.props.trackedVehicle;
    if(!vehicle)
      return <FeatureGroup />;

    let pattern = this.getGeometry(vehicle);
    if(!pattern)
      return <FeatureGroup />;

    const color = '#00bfff';
    console.log("drawing...")

    const segments = [];
    segments.push(
      <Polyline
        positions={pattern}
        weight={4}
        color={color}
        opacity={1}
      />
    );

    return segments.length > 0
      ? <FeatureGroup><div>{segments}</div></FeatureGroup>
      : <FeatureGroup />;
  }
}

export default VehicleGeometry;
