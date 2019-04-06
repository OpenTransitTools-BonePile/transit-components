import React from 'react';

export default class BaseLayerControl extends React.Component {

  handleLeftPanClick() {
    this.props.map.setState({baseLayer: this.props.baseLayers[0]});
  }

  handleRightPanClick() {
    this.props.map.setState({baseLayer: this.props.baseLayers[1]});
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
