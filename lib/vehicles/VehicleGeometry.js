import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

const tiUrl = "https://maps.trimet.org/otp_mod/index";

class VehicleGeometry extends MapLayer {

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  getRouteDirPattern(vehicle) {
    const r = vehicle.routeId;
    const d = vehicle.directionId;
    const p = vehicle.patternId;
    return `${r}:${d}:${p}`;
  }

  getUrl(vehicle) {
    const rdp = this.getRouteDirPattern(vehicle);
    let retVal = `${tiUrl}/patterns/TriMet:${rdp}/geometry`;
    console.log("V GEO URL: " + retVal);
    return retVal
  }

  callGeometryWS(vehicle) {
    // https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
    fetch(`${tiUrl}/patterns/TriMet:190:0:04/geometry`)
    .then(res => {
      let retVal = res.json();
      return retVal;
    })
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.log("VEH GEOMETRY fetch() error: " + error);
    });
  }

  getGeometry(vehicle) {
    // eg:
    const rdp = this.getRouteDirPattern(vehicle);
    let geom = this.patterns[rdp];
    if(!geom) {
      let ws = this.callGeometryWS(vehicle);
      geom = ws.points;
      this.patterns[rdp] = geom;
    }
    const retVal = geom;
    return retVal;
  }


  render () {
    const vehicle = this.props.trackedVehicle;
    if(!vehicle)
      return <FeatureGroup />;

    this.getUrl(vehicle);
    console.log(vehicle);

    let pattern = null;
    if(!pattern)
      return <FeatureGroup />;

    const color = '#00bfff';
    const pts = polyline.decode(pattern.points);

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
