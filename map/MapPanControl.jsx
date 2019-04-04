class Pan extends React.Component {
  handleUpPanClick() {
    this.state.leafletMap.panBy([0, -100]);
    window.console.log('Panning up');
  }

  handleDownPanClick() {
    this.state.leafletMap.panBy([0, 100]);
    window.console.log('Panning down');
  }

  handleLeftPanClick() {
    this.state.leafletMap.panBy([-100, 0]);
    window.console.log('Panning left');
  }

  handleRightPanClick() {
    this.state.leafletMap.panBy([100, 0]);
    window.console.log('Panning right');
  }

  render() {
    window.console.log('this.state.currentZoomLevel ->', this.state.currentZoomLevel);

    return (
      <Control position="topright">
        <div
        style={{
          backgroundColor: 'black',
          padding: '5px',
        }}
        >
          <div style={{ marginLeft: '37px' }}>
              <button onClick={this.handleUpPanClick}>
                  Pan up
              </button>
          </div>
          <div>
              <button onClick={this.handleLeftPanClick}>
                  Pan left
              </button>
              <button onClick={this.handleRightPanClick}>
                  Pan right
              </button>
          </div>
          <div style={{ marginLeft: '30px' }}>
              <button onClick={this.handleDownPanClick}>
                  Pan down
              </button>
          </div>
        </div>
      </Control>
    );
  }
}
