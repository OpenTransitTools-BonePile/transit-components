import React from 'react';
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet';
import polyline from '@mapbox/polyline';

class VehicleGeometry extends MapLayer {

  componentDidMount() {
    this.getGeometry();
  }
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  getGeometry() {
    // eg: https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
    const tiUrl = "https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry";
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

  render () {
    const { pattern } = this.props;

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
