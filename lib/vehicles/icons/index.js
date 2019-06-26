import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

import StreetcarIcon from './streetcar-icon';
import BusIcon from './bus-icon';
import GondolaIcon from './gondola-icon';
import RailIcon from './rail-icon';
import TramIcon from './tram-icon';


function makeVehicleIcon(cls, mode, defStr) {

  let icon = null;
  switch(mode) {
    case "BUS":
      icon = <BusIcon/>;
      break;
    case "TRAM":
      icon = <TramIcon/>
      break;
    case "SC":
      icon = <StreetcarIcon/>;
      break;
    case "GONDOLA":
      icon = <GondolaIcon/>;
      break;
    case "RAIL":
      icon = <RailIcon/>;
      break;
    default:
      icon = <BusIcon/>;
      break;
  }

  let retVal = null;
  if(mode != null)
    retVal = L.divIcon({
      html: ReactDOMServer.renderToString(icon),
      className: cls,
      popupAnchor: [0, -11],
      tooltipAnchor: [0, -11],
      iconSize: [22, 22]
    });
  else
    retVal = L.divIcon({
      html: `<span>${defStr || 'fxp'}</span>`,
     });

  return retVal;
}

export default makeVehicleIcon;