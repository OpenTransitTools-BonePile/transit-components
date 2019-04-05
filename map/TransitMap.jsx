import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const stamenXTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenXAttr = 'Map tiles by <a href="http://stamen.com">Xmen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tiles = [
  {t: stamenTonerTiles, a: stamenTonerAttr},
  {t: stamenXTiles, a: stamenXAttr}
];

const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

/*
 TODO:
   - switch between tilesets
   a) configuration + default point and zoom, etc...
   b) make a layer control
   c) move layer (and pan) control into separate component
   d) add search
   e) add overlays (routes)
   f) add vehicles (separate component lib)
   g) localize
*/


export default class BaseLayerControl extends React.Component {

  handleRightPanClick() {
    this.props.map.setState({url: stamenTonerTiles});
  }

  handleLeftPanClick() {
    this.props.map.setState({url: stamenXTiles});
  }

  render() {
    window.console.log('BLA');
    return (
      <div
        style={{
          backgroundColor: 'black',
          padding: '5px',
        }}
      >
        <div id="blc">
          <button onClick={() => this.handleLeftPanClick()}>
            Map
          </button>
          <button onClick={() => this.handleRightPanClick()}>
            Aerial
          </button>
        </div>
      </div>
    );
  }
}


class TransitMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: zoomLevel,
      leafletMap: null,
      url: stamenXTiles,
    };
  }

  componentDidMount() {
    const leafletMap = this.leafletMap.leafletElement;
    this.setState({leafletMap: leafletMap});
    leafletMap.on('zoomend', () => {
      const updatedZoomLevel = leafletMap.getZoom();
      this.handleZoomLevelChange(updatedZoomLevel);
    });
  }

  handleZoomLevelChange(newZoomLevel) {
    this.setState({zoom: newZoomLevel});
  }


  render() {
    window.console.log('this.state.zoom ->', this.state.zoom);

    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={mapCenter}
          zoom={this.state.zoom}
        >
          <TileLayer
            attribution={stamenTonerAttr}
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
