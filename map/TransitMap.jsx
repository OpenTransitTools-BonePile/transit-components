import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import BaseLayerControl from './BaseLayerControl.jsx';

export default class TransitMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      leafletMap: null,
      baseLayer: props.config.baseLayers[1]
    };
  }

  componentDidMount() {
    this.setState({leafletMap: this.leafletMap.leafletElement});
  }

  // TODO: using a single TileLayer, which we change URLs on, is a bit strange ... do multiple
  // layers, and find a way to not render them in the layer switcher (e.g., config that as an
  // option -- buttons or layer switcher).

  // TODO: maxZoom on the map should be 24, and layers should then not zoom beyond their spec'd max

  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={[this.props.config.initLat, this.props.config.initLon]}
          zoom={this.props.config.initZoom}
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
        </Map>
      </div>
    );
  }
}
