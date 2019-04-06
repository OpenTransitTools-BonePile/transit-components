import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';
import BaseLayerControl from './BaseLayerControl.jsx';

import config from "json-loader!yaml-loader!../common/config.yml";

const mapCenter = [config.map.initLat, config.map.initLon];
const zoomLevel = config.map.initZoom;

const xstamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a' +
' href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const xstamenXTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';

/*
 TODO:
   - switch between tilesets
   - configuration + default point and zoom, etc...
   - make a layer control
   a) HtmlWebpackPlugin({ with index templ ala MOD and index.html
   b) refactor config so that we're not hard-coded to use ../common/config.yml
   c) allow config to be injected into this class some way ... maybe via a test app
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
      zoom: zoomLevel,
      leafletMap: null,
      url: xstamenXTiles,
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
          center={mapCenter}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution={xstamenTonerAttr}
            url={this.state.url}
          />
          <Control position="topright">
            <BaseLayerControl map={this} />
          </Control>
        </Map>
      </div>
    );
  }
}

render(
  <TransitMap />,
  document.getElementById('mount'),
);
