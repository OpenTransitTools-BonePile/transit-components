import React from 'react';

import 'leaflet';
import 'leaflet-rotatedmarker';

class VehicleTracker extends React.Component {
  state = {
    buttonText: "Track Vehicle"
  }

  handleClick() {
    if(this.state.isTracking) {
      this.setState({
        isTracking: false,
        buttonText: "Track Vehicle"
      });
      this.props.controller.setState({trackedVehicle: null})
    } else {
      this.setState({
        isTracking: true,
        buttonText: "Stop Tracking"
      });

      this.props.controller.setState({trackedVehicle: this.props.vehicle})
    }
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>{this.state.buttonText}</button>
    );
  }
}

export default VehicleTracker;
