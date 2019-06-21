import React from 'react';

import 'leaflet';
import 'leaflet-rotatedmarker';
import { Marker, Popup, Tooltip } from "react-leaflet";
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
      <Tooltip key={"tt_" + this.props.key} >
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
      <Popup key={"pop_" + this.props.key} >
        <div>
          <span><b>{v.routeLongName}</b></span><br/>
          <span>Last reported: {this.getLastReportDate(v)}</span><br/>
          <span>Report date: {v.reportDate}</span><br/>
          <span>Status: {status} <a target="#" href={stopLink}>{v.stopId}</a></span><br/>
          <span>Trip: {v.tripId}, Block: {v.blockId}</span><br/>
          <span>{vehicle}</span><br/>
        </div>
      </Popup>
    );
  }

  makeRotatedMarker() {
    const v = this.props.vehicle;

    const position = [v.lat, v.lon];

    const icon = makeVehicleIcon(v.routeType, v.routeShortName);

    let heading = v.heading;
    if(heading == null || heading < 0 || heading >= 360)
      heading = 0;

    return(
      <RotatedMarker key={"rm_" + this.props.key} rotationAngle={heading} rotationOrigin={'center center'} icon={icon} key={v.id} position={position} >
        { this.makePopup() }
        { (L.Browser.mobile !== true) && this.makeToolTip() }
      </RotatedMarker>
    );
  }

  render() {
    return(
      this.makeRotatedMarker()
    );
  }
}

export default VehicleMarker;