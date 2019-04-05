import React from 'react';

const stamenTonerTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png';
const stamenTonerAttr = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const stamenXTiles = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
const stamenXAttr = 'Map tiles by <a href="http://stamen.com">Xmen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const tiles = [
  {t: stamenTonerTiles, a: stamenTonerAttr},
  {t: stamenXTiles, a: stamenXAttr}
];

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
};
