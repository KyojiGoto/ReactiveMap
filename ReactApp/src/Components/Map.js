import React, {Component} from 'react';
// npm install react-leaflet
// npm install leaflet react react-dom # npm
import './Map.scss';
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerCluster from "./MarkerCluster";

var zoom = 3;
function myFunction(x) {
  if (x.matches) { // If media query matches
    zoom = 2;
  }
}


class MyMap extends Component {

    render () {
      var x = window.matchMedia("(max-width: 700px)")
      myFunction(x) // Call listener function at run time
      x.addListener(myFunction) // Attach listener function on state changes 

      return (
        <div id="map-wrapper">
          <Map id='mapid' center={[56.1304, -106.3468]} 
            zoom={zoom}
            maxZoom={19}
            minZoom={2}
            worldCopyJump={true} 
            maxBounds={[[-90, -Infinity],[90, Infinity]]} 
            zoomControl={false}
            maxBoundsViscosity={0.2}
            boundsOptions={{padding: [50, 50]}}>
            <ZoomControl position="bottomright" />
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerCluster markers={this.props.foodbanks ? this.props.foodbanks : []} bounds={this.props.bounds ? this.props.bounds : null} userLoc={this.props.userLoc ? this.props.userLoc : null}/>
          </Map>
        </div>
      )
    }
  }
  
  export default MyMap