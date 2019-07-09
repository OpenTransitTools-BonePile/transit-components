import React from 'react'
import { connect } from 'react-redux'
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet'

import polyline from '@mapbox/polyline';

class VehicleGeometry extends MapLayer {

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

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
      : <FeatureGroup />
  }
}

export default VehicleGeometry;
