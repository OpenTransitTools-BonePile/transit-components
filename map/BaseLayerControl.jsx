import React from 'react';

class BaseLayerControl extends React.Component {

  mapTiles() {
    this.props.map.setState({baseLayer: this.props.baseLayers[0]});
  }

  aerialTiles() {
    this.props.map.setState({baseLayer: this.props.baseLayers[1]});
  }

  render() {
    window.console.log('BaseLayerControl render');
    return (
      <div
        style={{
          backgroundColor: 'black',
          padding: '5px',
        }}
      >
        <div id="blc">
          <button onClick={() => this.mapTiles()}>
            Map
          </button>
          <button onClick={() => this.aerialTiles()}>
            Aerial
          </button>
        </div>
      </div>
    );
  }
}

export default BaseLayerControl;
