import React from 'react'
import { connect } from 'react-redux'
import { FeatureGroup, MapLayer, Polyline } from 'react-leaflet'
import polyline from '@mapbox/polyline';

class VehicleGeometry extends MapLayer {

  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(nextProps) {}
  createLeafletElement() {}
  updateLeafletElement() {}

  getVehicles() {
    // eg: https://maps.trimet.org/gtfs/rt/vehicles/routes/100
    //
    const tiUrl = "https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry"
    fetch(`${ti_url}/patterns/TriMet:190:0:04/geometry`)
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

  render () {
    const { pattern } = this.props;

    if(!pattern)
      return <FeatureGroup />;

    const color = '#00bfff';
    const pts = polyline.decode(pattern.points);

    const segments = [];
    segments.push(
      <Polyline
        positions={pts}
        weight={4}
        color={color}
        opacity={1}
        key={pattern.patternId}
      />
    );

    return segments.length > 0
      ? <FeatureGroup><div>{segments}</div></FeatureGroup>
      : <FeatureGroup />;
  }
}

export default VehicleGeometry;
