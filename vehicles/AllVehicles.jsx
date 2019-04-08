import React from 'react';
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";

class AllVehicles extends React.Component {
  state = {
    vehicles: []
  };

  componentDidMount() {
    this.getVehicles();
    this.interval = setInterval(() => {
      this.getVehicles();
    }, 15000);
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
        console.log(this.state.vehicles);
      });
  }

  render() {
    console.log(this.state.vehicles);
    return (() =>
      <div>
      {

        this.state.vehicles.map(vehicle => {
          const { routeNumber, type } = vehicle;
          const icon = divIcon({
            html: `<span>${routeNumber}</span>`,
          });

          return (
            <Marker
              icon={icon}
              key={vehicle.vehicleID}
              position={[vehicle.latitude, vehicle.longitude]}
            />
          );
        })
      }
      </div>
    )
  }
}

export default AllVehicles;
