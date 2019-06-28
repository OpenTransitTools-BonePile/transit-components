import 'leaflet';
import React from 'react';
import { FeatureGroup,  MapLayer, withLeaflet } from "react-leaflet";

import VehicleMarker from "./VehicleMarker";

// polyfills
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';


function catchFetchErrors(response) {
    // :see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class SelectVehicles extends MapLayer {
  state = {
    selectedRoutes: [],
    selectedStop: null,
    routeData: [],  // TBD Array of <RouteData > components, which comprise route and stop geo data
    mapZoom: 0,

    vehicles: []
  };

  // these zoom layers control which markers are shown (e.g. closeZoom is where icons are turned on)
  closeZoom = 15;
  midZoom = 13;
  farZoom = 10;


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

  setAnimationClass(doAnimate) {
    const animateClass = 'vehicle-animate';

    let markers = document.getElementsByClassName("vehicle-marker");
    for(let i = 0; i < markers.length; i++) {
      if(doAnimate)
        markers[i].classList.add(animateClass);
      else
        markers[i].classList.remove(animateClass);
    }
    let z = 1;
  }

  startZoomCB() {
    if(this.props.visible) {
      this.setAnimationClass(false);
    }
  }

  endZoomCB() {
    if(this.props.visible) {
      // set state, so that markers will redraw on zoom
      // TODO: if calling setState here is perf-problematic, could call setState only on this.closeZoom = (zoom / zoom-1)
      const zoom = this.props.leaflet.map.getZoom();
      this.setState({mapZoom: zoom});

      this.setAnimationClass(true);
    }
  }

  enableCallBacks() {
    this.props.leaflet.map.on('zoomstart', () => { this.startZoomCB('start'); });
    this.props.leaflet.map.on('zoomend', () => { this.endZoomCB('end'); });
  }

  componentDidMount() {
    if (this.props.visible) {
      this._startRefreshing();
    }
    this.enableCallBacks();
  }

  componentWillUnmount() {
    this._stopRefreshing();
  }
  
  componentDidUpdate() {
    this.setAnimationClass(true);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.visible && nextProps.visible) {
      this._startRefreshing();
    }
    else if (this.props.visible && !nextProps.visible) {
      this._stopRefreshing();
    }
    this.enableCallBacks();
  }

  isNewer(res) {
    /** compares datestamp header of the data to last load's datestamp */
    let retVal = true;
    let lm = res.headers.get('Last-Modified');
    let lmd = new Date(lm);

    if (this.lastModified === null) {
      this.lastModified == lmd;  // last modified is empty, so set it and say data is new
      retVal = true;
    }
    else {
      if (this.lastTimeStamp > lmd)
        retVal = false;
      else
        this.lastTimeStamp = lmd;
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

      // eg: https://maps.trimet.org/gtfs/rt/vehicles/routes/100
      fetch(`${this.props.api}/routes/${r}?time=${d}`)
      .then(catchFetchErrors)
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
      })
      .catch(error => {
        this.setBusy(false); // unlock the busy flag on errors
        console.log("VEH fetch() error: " + error);
      });
    }
  }

  // need to implement create interface (and update interface for older React-Leaflet versions)
  createLeafletElement(props) {}
  updateLeafletElement(props) {}


  // TODO: turn off animate css
  // this.context.map.on('moveend', () => {

  // { /* see below: https://react-leaflet.js.org/docs/en/context.html */ }
  // <LeafletConsumer>{context => console.log(context)}</LeafletConsumer>

  render() {
    const vehicles = this.state.vehicles;
    console.log(vehicles.length);

    if(!vehicles || vehicles.length === 0)
      return <FeatureGroup id="vehicles fg" />;
    else
      return (
        <FeatureGroup id="vehicles fg" >
          {
            vehicles.map((v) => <VehicleMarker key={"vm" + v.id}
                                               vehicle={v}
                                               closeZoom={this.closeZoom}
                                               midZoom={this.midZoom}
                                               farZoom={this.farZoom}
            />)
          }
        </FeatureGroup>
      );
  }
}

export default withLeaflet(SelectVehicles);
