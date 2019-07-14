import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

//const tiUrl = "https://maps.trimet.org/otp_mod/index";
// localhost:54445/ti/patterns/TriMet:409973/geometry
const tiUrl = "http://localhost:54445/ti";

class VehicleGeometry extends MapLayer {
  patterns = [];

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  cachePattern(pat, key) {
    let geom = pat.points;
    this.patterns[key] = geom;
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

    let retVal = `${tiUrl}/patterns/${ap}/geometry?date=${d}`;
    return retVal
  }

  callGeometryWS(vehicle) {
    // https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
    let retVal = null;

    const ap = this.getAgencyPattern(vehicle);
    let geomWsUrl = this.getUrl(vehicle, ap);
    //geomWsUrl = `${tiUrl}/patterns/TriMet:190:0:04/geometry`; // todo - testing...remove me

    console.log("Calling GEO URL: " + geomWsUrl);
    fetch(geomWsUrl)
    .then(res => {
      retVal = res.json();
      return retVal;
    })
    .then(json => {
      this.cachePattern(json, ap);
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
    const pts = polyline.decode(pattern);
    console.log("drawing...")

    const segments = [];
    segments.push(
      <Polyline
        positions={pts}
        weight={4}
        color={color}
        opacity={1}
        key={pattern.patternId}
      />
    );

    return segments.length > 0
      ? <FeatureGroup><div>{segments}</div></FeatureGroup>
      : <FeatureGroup />;
  }
}

export default VehicleGeometry;
