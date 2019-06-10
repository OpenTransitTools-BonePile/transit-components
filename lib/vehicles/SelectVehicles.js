import 'leaflet';
import React from 'react';
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
    if (this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this.setBusy(false);
    }
  }

  componentDidMount() {
    if (this.props.visible) {
      this._startRefreshing();
    }
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

  isNewer(res) {
    /** compares datestamp header of the data to last load's datestamp */
    let retVal = true;
    try {
      let lm = res.headers.get('Last-Modified');
      let lmd = new Date(lm);

      if(this.lastModified === null) {
        this.lastModified == lmd;  // last modified is empty, so set it and say data is new
        retVal = true;
      }
      else {
        if(this.lastTimeStamp > lmd)
          retVal = false;
        else
          this.lastTimeStamp = lmd;
      }
    }
    catch(e) {
      console.log(e);
    }
    return retVal;
  }

  isBusy() {
    return this._isBusy;
  }

  setBusy(val) {
    this._isBusy = val;
  }

  getVehicles() {
    const d = Date.now();
    const r = this.props.routeId || this.props.default;  // (might have to strip off TriMet, etc...

    // wrap the fetch with
    if(!this.isBusy()) {
      this.setBusy(true);

      fetch(`${this.props.api}/routes/${r}?time=${d}`)
      .then(res => {
        let retVal = null;
        if(this.isNewer(res))
          retVal = res.json();
        return retVal;
      })
      .then(json => {
        this.setBusy(false);
        if(json != null)
          this.setState({
            vehicles: json
          });
      });
    }
    else {
      console.log("note: previous vehicle /q still running...will skip this update and wait (to avoid race-condition)");
    }
  }

  // need to implement create interface (and update interface for older React-Leaflet versions)
  createLeafletElement(props) {}
  updateLeafletElement(props) {}

  render() {
    let vehicles = this.state.vehicles;
    console.log(vehicles.length);

    if(!vehicles || vehicles.length === 0)
      return <FeatureGroup id="vehicles fg" />;
    else
      return (
        <FeatureGroup id="vehicles fg" >
          { vehicles.map((v, i) => <VehicleMarker key={"vm" + i} vehicle={v} />) }
        </FeatureGroup>
      );
  }
}

export default SelectVehicles;
