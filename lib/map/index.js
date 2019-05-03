import React from 'react';
import { render } from 'react-dom';
import config from "json-loader!yaml-loader!../common/config.yml";
import TransitMap from "./TransitMap";
const urlParams = new URLSearchParams(window.location.search);

/**
 *  note: this is a simple test script that's an entry into the TransitMap component
 *        further, we see it's the only thing loading the config.yml (important, since the real
 *        config.yml file(s) ewon't be sourced out of this Component Library).
 */
const zoom = urlParams.get("zoom") || config.map.initZoom;
const ll = urlParams.get("center");
const rte = urlParams.get("routeId");
const ctr = ll ? ll.split(",") : [config.map.initLat, config.map.initLon];

render(
  <TransitMap config={config.map} center={ctr} zoom={zoom} routeId={rte} />,
  document.getElementById('map'),
);
