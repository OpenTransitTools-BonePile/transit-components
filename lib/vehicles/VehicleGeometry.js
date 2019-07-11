import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

const tiUrl = "https://maps.trimet.org/otp_mod/index";

class VehicleGeometry extends MapLayer {
  patterns = [];

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  cachePattern(pat, rdp) {
    let geom = pat.points;
    this.patterns[rdp] = geom;
  }

  getRouteDirPattern(vehicle) {
    const r = vehicle.routeId;
    const d = vehicle.directionId;
    const p = vehicle.patternId;
    return `${r}:${d}:${p}`;
  }

  getUrl(vehicle, rdp) {
    if(!rdp)
      rdp = this.getRouteDirPattern(vehicle);

    let retVal = `${tiUrl}/patterns/TriMet:${rdp}/geometry`;
    return retVal
  }

  callGeometryWS(vehicle) {
    // https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
    const rdp = this.getRouteDirPattern(vehicle);
    let geomWsUrl = this.getUrl(vehicle);
    let retVal = null;
    geomWsUrl = `${tiUrl}/patterns/TriMet:190:0:04/geometry`; // todo - testing...remove me
    console.log("Calling GEO URL: " + geomWsUrl);
    fetch(geomWsUrl)
    .then(res => {
      retVal = res.json();
      return retVal;
    })
    .then(json => {
      //console.log(json);
      this.cachePattern(json, rdp);
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
    const rdp = this.getRouteDirPattern(vehicle);
    let geom = this.patterns[rdp];
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
