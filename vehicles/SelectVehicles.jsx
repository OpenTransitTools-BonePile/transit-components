import React from 'react';

import 'leaflet';
import 'leaflet-rotatedmarker';
import { Marker, Popup } from "react-leaflet";
import RotatedMarker from '../map/RotatedMarker.jsx';
import makeVehicleIcon from './icons';
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
        this.state.vehicles.map((v, i) => {
          console.log(this.state.vehicles.length);

          const position = [v.lat, v.lon];

          var status = "unknown";
          if(v.status == "IN_TRANSIT_TO")
            status = "en-route to stop ";
          else if(v.status == "STOPPED_AT")
            if(v.stopSequence == 1)
              status = "beginning route from stop ";
            else
              status = "stopped at ";

          var lastReport = "";
          if(v.seconds > 60) {
            const min = Math.floor(v.seconds / 60);
            const sec = v.seconds - min * 60;
            const minStr = min == 1 ? "minute" : "minutes";

            if(sec > 0)
              lastReport = `${min} ${minStr} & ${sec} seconds ago`;
            else
              lastReport = `${min} ${minStr} ago`;
          } else {
            lastReport = `${v.seconds} seconds ago`;
          }

          var vehicle = "";
          if(v.vehicleId.indexOf('+') > 0)
            vehicle = "Vehicles: " + v.vehicleId.replace('+', ", ");
          else
            vehicle = "Vehicle: " + v.vehicleId;

          const stopLink = `https://trimet.org/ride/stop.html?stop_id=${v.stopId}`;
          const icon = makeVehicleIcon(v.routeType, v.routeShortName);

          return (
            <RotatedMarker rotationAngle={v.heading} rotationOrigin={'center center'} icon={icon} key={v.id} position={position} >
              <Popup>
                <span><b>{v.routeLongName}</b></span><br/>
                <span>Last reported: {lastReport}</span><br/>
                <span>Report date: {v.reportDate}</span><br/>
                <span>Status: {status} <a target="#" href={stopLink}>{v.stopId}</a></span><br/>
                <span>{vehicle}</span><br/>
              </Popup>
            </RotatedMarker>
          );
        })
      }
      </div>
    )
  }
}

export default SelectVehicles;
