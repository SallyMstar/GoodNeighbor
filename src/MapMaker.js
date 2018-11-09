import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


class MapMaker extends Component {


  render() {
	let shelters = this.props.shelters
  	console.log(shelters);

      	{shelters.map((shelter) => {
      		console.log(shelter.id.$t)
      		console.log(shelter.name.$t)
      		console.log(shelter.latitude.$t)
      		console.log(shelter.longitude.$t)
      		})}
      	
    return (
      <Map google={this.props.google} 
      		zoom={11}
      		initialCenter={{
      			lat: 39.14506,
      			lng: -84.374384
      		}}
      		style={{
      			height: '85%',
      			width: '100%'
       		}}
      		>

      	{shelters.map((shelter) => 
 			<Marker 
 				key={shelter.id.$t}
 				title={shelter.name.$t}
 				name={shelter.id.$t}
 				position={{
 					lat: 39.1406,
 					lng: -84.374384
 				}} />
      			)}
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyEUmiQYNT6nrZK6ACULxyVASU8XcyWNc'
})(MapMaker)