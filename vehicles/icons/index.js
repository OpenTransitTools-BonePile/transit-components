import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {divIcon} from 'leaflet';

import StreetcarIcon from './streetcar-icon';
import BusIcon from './bus-icon';
import GondolaIcon from './gondola-icon';
import RailIcon from './rail-icon';
import TramIcon from './tram-icon';
import TransitIcon from './transit-icon';


function makeVehicleIcon(mode, defStr) {

  var icon = null;
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
      icon = <TransitIcon/>;
      break;
  }

  var retVal = null;
  if(mode != null)
    retVal = L.divIcon({
      html: ReactDOMServer.renderToString(icon)
    });
  else
    retVal = divIcon({
      html: `<span>${defStr || 'fxp'}</span>`,
     });

  return retVal;
}

export default makeVehicleIcon;