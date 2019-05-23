import React from 'react';

import 'leaflet';
import 'leaflet-rotatedmarker';
import { FeatureGroup,  MapLayer, Marker, Popup, Tooltip } from "react-leaflet";
import RotatedMarker from '../map/RotatedMarker';
import makeVehicleIcon from './icons';

// polyfills
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';

class SelectVehicles extends MapLayer {
  state = {
    selected_routes: [],
    selected_stop: null,

    vehicles: [],
    route_data: []  // TBD Array of <RouteData > components, which comprise route and stop geo data
  };

  _startRefreshing() {
    // initial vehicle refresh
    this.getVehicles();

    // get refresh values from config (default 5 seconds), and convert from secs to millisecs
    let refresh = 5000;
    if(this.props.config.refresh) {
       let r = this.props.config.refresh;
       if(r > 0 && r <= 100)
         r = r * 1000;
       if(r >= 1000 && r < 100000)
         refresh = r;
    }

    // do the recurring refresh of the get vehicles AJAX call
    this._refreshTimer = setInterval(() => {
      this.getVehicles();
    }, refresh);
  }

  _stopRefreshing() {
    if(this._refreshTimer)
      clearInterval(this._refreshTimer);
  }

  componentDidMount() {
    //if(this.props.visible)  ?? who sets this.props.visible
      this._startRefreshing();
  }

  componentWillUnmount () {
    this._stopRefreshing();
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.visible && nextProps.visible) {
      this._startRefreshing();
    }
    else if(this.props.visible && !nextProps.visible) {
      this._stopRefreshing();
    }
  }

  getVehicles() {
    const d = Date.now();
    const r = this.props.routeId || this.props.config.default;  // (might have to strip off TriMet, etc...

    fetch(`${this.props.config.url}/routes/${r}?time=${d}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        this.setState({
          vehicles: res
        });
      });
  }

  // need to implement create interface (and update interface for older React-Leaflet versions)
  createLeafletElement(props) {}
  updateLeafletElement(props) {}

  render() {
    return(
      <FeatureGroup>
        {this.state.vehicles.map((v) => {
          console.log(this.state.vehicles.length);

          const position = [v.lat, v.lon];

          let status = "unknown";
          if(v.status == "IN_TRANSIT_TO")
            status = "en-route to stop ";
          else if(v.status == "STOPPED_AT")
            if(v.stopSequence == 1)
              status = "beginning route from stop ";
            else
              status = "stopped at ";

          let lastReport = "";
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

          let vehicle = "";
          if(v.vehicleId.indexOf('+') > 0)
            vehicle = "Vehicles: " + v.vehicleId.replace(/\+/g, ", ");
          else
            vehicle = "Vehicle: " + v.vehicleId;

          const stopLink = `https://trimet.org/ride/stop.html?stop_id=${v.stopId}`;
          const icon = makeVehicleIcon(v.routeType, v.routeShortName);

          // todo: put this valid 360 deg in service
          let heading = v.heading;
          if(heading == null || heading < 0 || heading >= 360)
            heading = 1;

          return (
            <RotatedMarker rotationAngle={heading} rotationOrigin={'center center'} icon={icon} key={v.id} position={position} >
              <Popup>
                <span><b>{v.routeLongName}</b></span><br/>
                <span>Last reported: {lastReport}</span><br/>
                <span>Report date: {v.reportDate}</span><br/>
                <span>Status: {status} <a target="#" href={stopLink}>{v.stopId}</a></span><br/>
                <span>{vehicle}</span><br/>
              </Popup>
              { (L.Browser.mobile !== true) &&
                <Tooltip>
                  <span><b>{v.routeShortName}</b>: {lastReport}</span>
                </Tooltip>
              }
            </RotatedMarker>
          );
        })
      }
      </FeatureGroup>
    )
  }
}

export default SelectVehicles;
