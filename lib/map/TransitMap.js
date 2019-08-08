import React from 'react';
import { createRef } from 'react';
import { Map, TileLayer, LayersControl } from 'react-leaflet';

import Control from 'react-leaflet-control';
import BaseLayerControl from './BaseLayerControl';
import LocateControl from './LocateControl';

import SelectVehicles from '../vehicles/SelectVehicles';
import ErrorBoundary from '../common/ErrorBoundary';


class TransitMap extends React.Component {
  state = {
    leafletMap: null,
    baseLayer: this.props.config.baseLayers[this.props.config.baseLayersInitial || 0]
  };

  componentDidMount() {
    this.setState({leafletMap: this.leafletMap.leafletElement});
  }

  // TODO: using a single TileLayer, which we change URLs on, is a bit strange ... do multiple
  // layers, and find a way to not render them in the layer switcher (e.g., config that as an
  // option -- buttons or layer switcher).

  // TODO: maxZoom on the map should be N (20 / 22); layers should then not zoom beyond their max

  currentLocation() {
    const locateOptions = {
      position: 'topright',
      strings: {
          title: 'Show me where I am, yo!'
      },
      onActivate: () => {} // callback before engine starts retrieving locations
    }
    return locateOptions;
  }

  render() {
    return (
      <div>
        <Map
          ref={m => { this.leafletMap = m; }}
          center={this.props.center}
          zoom={this.props.zoom}
          maxZoom={this.props.config.maxZoom || "20"}
        >
          <TileLayer
            url={this.state.baseLayer.url}
            maxZoom={this.state.baseLayer.maxZoom}
            attribution={this.state.baseLayer.attribution}
          />

          <ErrorBoundary>
            <Control position="topright">
              <BaseLayerControl map={this} baseLayers={this.props.config.baseLayers} />
            </Control>
          </ErrorBoundary>

            {this.props.config.overlays && this.props.config.overlays.map((overlayConfig, k) => {
              switch (overlayConfig.type) {
                case 'vehicles':
                  return (
                    <ErrorBoundary>
                      <SelectVehicles visible={true} key={k} {...overlayConfig} />
                    </ErrorBoundary>
                  );
                default:
                  return null;
              }
            })}
        </Map>
      </div>
    );
  }
}

export default TransitMap;
