import React from 'react';
import { Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import './vehicles.css';

class SelectVehicles extends React.Component {
  state = {
    selected_routes: [],
    selected_stop: null,

    vehicles: [],
    route_data: []  // TBD Array of <RouteData > components, which comprise route and stop geo data
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
    const d = Date.now();
    const r = this.props.routeId;  // (might have to strip off TriMet, etc...

    fetch(`http://localhost:54145/vehicles/routes/${r}?time=${d}`)
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
      <div className="vehicles">
      {
        this.state.vehicles.map((vehicle, idx) => {
          console.log(this.state.vehicles.length);
          const icon = divIcon({
            html: `<span>${vehicle.routeId}</span>`,
          });
          const key = vehicle.id;
          const position = [vehicle.lat, vehicle.lon];

          return (
            <Marker icon={icon} key={key} position={position}>
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

export default SelectVehicles;
