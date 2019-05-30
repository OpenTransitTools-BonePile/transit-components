import React from 'react';

import 'leaflet';
import { FeatureGroup,  MapLayer } from "react-leaflet";

import VehicleMarker from "./VehicleMarker";

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

    // get refresh values (default 10 seconds), and convert from secs to millisecs
    let refresh = 10000;
    if (this.props.refresh) {
      let r = this.props.refresh;
      if (r > 0 && r <= 100)
        r = r * 1000;
      if (r >= 1000 && r < 100000)
        refresh = r;
    }

    // do the recurring refresh of the get vehicles AJAX call
    this._refreshTimer = setInterval(() => {
      this.getVehicles();
    }, refresh);
  }

  _stopRefreshing() {
    if (this._refreshTimer)
      clearInterval(this._refreshTimer);
  }

  componentDidMount() {
    if (this.props.visible) // ?? who sets this.props.visible
      this._startRefreshing();
  }

  componentWillUnmount() {
    this._stopRefreshing();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this._startRefreshing();
    }
    else if (this.props.visible && !nextProps.visible) {
      this._stopRefreshing();
    }
  }

  getVehicles() {
    const d = Date.now();
    const r = this.props.routeId || this.props.default;  // (might have to strip off TriMet, etc...

    fetch(`${this.props.api}/routes/${r}?time=${d}`)
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
    console.log(this.state.vehicles.length);
    return (
      <FeatureGroup>
        { this.state.vehicles.map(v => <VehicleMarker vehicle={v} />) }
      </FeatureGroup>
    );
  }
}

export default SelectVehicles;
