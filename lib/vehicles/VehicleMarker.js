import React from 'react';

import 'leaflet';
import 'leaflet-rotatedmarker';
import { divIcon } from "leaflet";
import { Marker, CircleMarker, Popup, Tooltip } from "react-leaflet";
import myWithLeaflet from '../map/MyWithLeaflet';

import VehicleTracker from './VehicleTracker';

import RotatedMarker from '../map/RotatedMarker';
import makeVehicleIcon from './icons';


class VehicleMarker extends React.Component {

  getLastReportDate(v) {
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
    return lastReport;
  }

  makeToolTip() {
    const v = this.props.vehicle;

    let rsn = v.routeShortName;
    if(rsn != null && rsn.length <= 3)
      rsn = "Line " + rsn;

    return (
      <Tooltip>
        <span><b>{rsn}</b>: {this.getLastReportDate(v)}</span>
      </Tooltip>
    );
  }

  makePopup() {
    const v = this.props.vehicle;

    let status = "unknown";
    if(v.status == "IN_TRANSIT_TO")
      status = "en-route to stop ";
    else if(v.status == "STOPPED_AT")
      if(v.stopSequence == 1)
        status = "beginning route from stop ";
      else
        status = "stopped at ";

    let vehicle = "";
    if(v.vehicleId.indexOf('+') > 0)
      vehicle = "Vehicles: " + v.vehicleId.replace(/\+/g, ", ");
    else
      vehicle = "Vehicle: " + v.vehicleId;

    const stopLink = `https://trimet.org/ride/stop.html?stop_id=${v.stopId}`;

    return (
      <Popup>
        <div>
          <span><b>{v.routeLongName}</b></span><br/>
          <span>Last reported: {this.getLastReportDate(v)}</span><br/>
          <span>Report date: {v.reportDate}</span><br/>
          <span>Status: {status} <a target="#" href={stopLink}>{v.stopId}</a></span><br/>
          <span>Trip: {v.tripId}, Block: {v.blockId}</span><br/>
          <span>{vehicle}</span> <br/>
          <VehicleTracker vehicle={v} marker={this} controller={this.props.controller} />  <br/>
        </div>
      </Popup>
    );
  }

  isTracking() {
    const retVal = this.props.controller.isTrackingVehicle(this.props.vehicle);
    return retVal;
  }

  makeCircleMarker(size) {
    const v = this.props.vehicle;

    const position = [v.lat, v.lon];
    let zPos = 0;

    let classnames = 'vehicle-marker vehicle-circle';
    if(this.isTracking()) {
      classnames = classnames + ' vehicle-circle-selected';
      zPos = 1000;
    }

    const icon = divIcon({
      className: classnames,
      iconSize: [size, size]
    });
    return(
      <Marker
        icon={icon}
        position={position}
        zIndexOffset={zPos}
      >
        { this.makePopup() }
        { (L.Browser.mobile !== true) && this.makeToolTip() }
      </Marker>
    );
  }

  makeRotatedMarker() {
    const v = this.props.vehicle;

    const position = [v.lat, v.lon];
    let zPos = 0;

    let heading = v.heading;
    if(heading == null || heading < 0 || heading >= 360)
      heading = 0;

    let classnames = 'vehicle-marker vehicle-icon';
    if(this.isTracking()) {
      classnames = classnames + ' vehicle-icon-selected';
      zPos = 1000;
    }

    const icon = makeVehicleIcon(classnames, v.routeType, v.routeShortName);
    return(
      <RotatedMarker
        rotationAngle={heading}
        rotationOrigin={'center center'}
        icon={icon}
        position={position}
        zIndexOffset={zPos}
      >
        { this.makePopup() }
        { (L.Browser.mobile !== true) && this.makeToolTip() }
      </RotatedMarker>
    );
  }

  getZoom() {
    let retVal = 15;
    try {
      const zoom = this.props.leaflet.map.getZoom();
      retVal = zoom;
    }
    catch (e) {
      // console.log(e);
    }
    return retVal;
  }

  makeMarker() {
    const zoom = this.getZoom();
    if(zoom >= this.props.closeZoom)
      return this.makeRotatedMarker();
    else if(zoom >= this.props.midZoom)
      return this.makeCircleMarker(13.0);
    else if(zoom >= this.props.farZoom)
      return this.makeCircleMarker(9.0);
    else
      return this.makeCircleMarker(5.0);
  }

  render() {
    return( this.makeMarker() );
  }
}

export default myWithLeaflet(VehicleMarker);
