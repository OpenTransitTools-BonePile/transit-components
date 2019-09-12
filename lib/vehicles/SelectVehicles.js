import 'leaflet';
import React from 'react';
import { FeatureGroup,  MapLayer } from "react-leaflet";
import myWithLeaflet from '../map/MyWithLeaflet';

import VehicleMarker from "./VehicleMarker";
import VehicleGeometry from "./VehicleGeometry";

// polyfills
//import 'promise-polyfill/src/polyfill';
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

    trackedVehicle: null,
    vehicles: []
  };

  // these zoom layers control which markers are shown (e.g. closeZoom is where icons are turned on)
  closeZoom = 15;
  midZoom = 13;
  farZoom = 10;

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
    this.trackVehicle();
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

  /**
   * this method is used for backporting to React 15
   * v16:  return this.props.leaflet;
   * v15:  return this.context;
   */
  getLeafletContext() {
    return this.props.leaflet;
  }

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
    if(this._refreshTimer) {
      clearInterval(this._refreshTimer);
      this.setBusy(false);
    }
    if(this.state.trackedVehicle != null) {
      this.state.trackedVehicle = null;
    }
  }

  trackVehicle() {
    if(this.state.trackedVehicle != null && this.state.trackedVehicle.id != null) {
      let v = this.findVehicle(this.state.trackedVehicle.id);
      if(v != null) {
        const ll = [v.lat, v.lon];
        this.getLeafletContext().map.setView(ll);
        this.state.trackedVehicle = v;      // update the state with newest vehicle
      }
    }
  }

  isTrackingVehicle(vehicle) {
    let retVal = false;
    try {
      if(this.state.trackedVehicle && this.state.trackedVehicle.id == vehicle.id)
        retVal = true;
    } catch(e) {
      console.log(e);
      retVal = false;
    }
    return retVal;
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
      const zoom = this.getLeafletContext().map.getZoom();
      this.setState({mapZoom: zoom});

      this.setAnimationClass(true);
    }
  }

  enableCallBacks() {
    if(this.props.pauseAnimationOnZoom) {
      console.log("setting the zoomstart and zoomend callbacks to pause CSS animation on zoom");
      this.getLeafletContext().map.on('zoomstart', () => { this.startZoomCB('start'); });
      this.getLeafletContext().map.on('zoomend', () => { this.endZoomCB('end'); });
    }
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

  findVehicle(id) {
    let retVal = null;
    try {
      for(let i = 0; i < this.state.vehicles.length; i++) {
        let v = this.state.vehicles[i];
        if(v.id == id) {
          retVal = v;
          break;
        }
      }
    } catch (e) {
      console.log("ERROR findVehicle " + id + " " + e);
    }
    return retVal;
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
            vehicles.map((v) => <VehicleMarker key={v.id}
                                               vehicle={v}
                                               controller={this}
                                               closeZoom={this.closeZoom}
                                               midZoom={this.midZoom}
                                               farZoom={this.farZoom}
            />)
          }
          <VehicleGeometry trackedVehicle={this.state.trackedVehicle} />
        </FeatureGroup>
      );
  }
}

export default myWithLeaflet(SelectVehicles);
