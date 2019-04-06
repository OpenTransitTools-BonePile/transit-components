import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

import BaseLayerControl from './BaseLayerControl.jsx';
import config from "json-loader!yaml-loader!../common/config.yml";

/*
 TODO:
   - switch between tilesets
   - configuration + default point and zoom, etc...
   - make a layer control
   - allow config to be injected into this class some way ... maybe via a test app

   a) HtmlWebpackPlugin({ with index templ ala MOD and index.html
   b) refactor config so that we're not hard-coded to use ../common/config.yml
   d) add search
   e) add overlays (routes)
   f) add vehicles (separate component lib)
   g) localize
   h) make a pan control
*/

class TransitMap extends React.Component {

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

  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={[this.props.config.initLat, this.props.config.initLon]}
          zoom={this.props.config.initZoom}
        >
          <TileLayer
            url={this.state.baseLayer.url}
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

render(
  <TransitMap config={config.map} />,
  document.getElementById('mount'),
);
