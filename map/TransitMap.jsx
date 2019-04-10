import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet_css';

import Control from 'react-leaflet-control';
import BaseLayerControl from './BaseLayerControl.jsx';
import SelectVehicles from '../vehicles/SelectVehicles.jsx';
import AllVehicles from '../vehicles/AllVehicles.jsx';

class TransitMap extends React.Component {
  state = {
    leafletMap: null,
    baseLayer: this.props.config.baseLayers[1]
  };

  componentDidMount() {
    this.setState({leafletMap: this.leafletMap.leafletElement});
  }

  // TODO: using a single TileLayer, which we change URLs on, is a bit strange ... do multiple
  // layers, and find a way to not render them in the layer switcher (e.g., config that as an
  // option -- buttons or layer switcher).

  // TODO: maxZoom on the map should be N (20 / 22); layers should then not zoom beyond their max

  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={this.props.center}
          zoom={this.props.zoom}
          maxZoom={this.props.config.maxZoom || "20"}
        >
          <TileLayer
            url={this.state.baseLayer.url}
            maxZoom={this.state.baseLayer.maxZoom}
            attribution={this.state.baseLayer.attribution}
          />
          <Control position="topright">
            <BaseLayerControl map={this} baseLayers={this.props.config.baseLayers} />
          </Control>

          <SelectVehicles map={this} routeId={this.props.routeId} />
        </Map>
      </div>
    );
  }
}

export default TransitMap;
