// from https://stackoverflow.com/questions/54099898/react-locate-on-map

import React, { Component } from "react";
import myWithLeaflet from './MyWithLeaflet';
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {
  componentDidMount() {
    const { options, startDirectly } = this.props;
    const { map } = this.props.leaflet;

    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      lc.start();
    }
  }

  render() {
    return null;
  }
}

export default myWithLeaflet(LocateControl);
