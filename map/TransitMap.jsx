import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import Control from 'react-leaflet-control';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const mapCenter = [39.9528, -75.1638];
const zoomLevel = 12;

/*
 TODO:
   a) switch between tilesets ... and make a layer control
   b) move layer (and pan) control into separate component
   c) configuration
   d) add search
   e) add overlays (routes)
   f) add vehicles (separate component lib)
   g) localize
*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentZoomLevel: zoomLevel,
      leafletMap: null
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
    this.setState({ currentZoomLevel: newZoomLevel });
  }

  handleRightPanClick() {
    this.state.leafletMap.panBy([100, 0]);
    window.console.log('Panning right');
  }

  handleLeftPanClick() {
    this.state.leafletMap.panBy([-100, 0]);
    window.console.log('Panning left');
  }

  render() {
    window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);

    return (
    <div>
      <Map
      ref={m => { this.leafletMap = m; }}
      center={mapCenter}
      zoom={zoomLevel}
      >
        <TileLayer
        attribution={stamenTonerAttr}
        url={stamenTonerTiles}
        />
        <Control position="topright">
          <div
          style={{
            backgroundColor: 'black',
            padding: '5px',
          }}
          >
            <div>
              <button onClick={() => this.handleLeftPanClick()}>
                Map
              </button>
              <button onClick={() => this.handleRightPanClick()}>
                Aerial
              </button>
            </div>
          </div>
        </Control>
      </Map>
    </div>
    );
  }
}

render(
  <App />,
  document.getElementById('mount'),
);
