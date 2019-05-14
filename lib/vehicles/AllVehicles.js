import React from 'react';

import { divIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

// polyfills
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

class AllVehicles extends React.Component {
  state = {
    vehicles: []
  };

  componentDidMount() {
    this.getVehicles();
    this.interval = setInterval(() => {
      this.getVehicles();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getVehicles() {
    fetch("https://pdxlivebus.now.sh")
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          vehicles: res
        });
      });
  }

  render() {
    return(
      <div class="vehicles">
      {
        this.state.vehicles.map((vehicle, idx) => {
          console.log(this.state.vehicles.length);
          const icon = divIcon({
            html: `<span>${vehicle.routeNumber}</span>`,
          });
          const key = vehicle.vehicleID;
          const position = [vehicle.latitude, vehicle.longitude];

          return (
            <Marker class="marker" icon={icon} key={key} position={position}>
              <Popup>
                <span>VEH: {key}</span>
              </Popup>
            </Marker>
          );
        })
      }
      </div>
    )
  }
}

export default AllVehicles;
