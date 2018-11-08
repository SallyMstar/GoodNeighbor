import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


class MapMaker extends Component {
  render() {
    return (
      <Map google={this.props.google} 
      		zoom={11}
      		initialCenter={{
      			lat: 39.159288,
      			lng: -84.496593
      		}}
      		style={{
      			height: '85%',
      			width: '100%'
       		}}
      		>
 
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyEUmiQYNT6nrZK6ACULxyVASU8XcyWNc'
})(MapMaker)