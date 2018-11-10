import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


class MapMaker extends Component {

	state = {}


  render() {
	let shelters = this.props.shelters
      	{shelters.map((shelter) => {
      		let name = shelter.name.$t;
      		let id = shelter.id.$t;
      		shelter.location = {
      			lat: shelter.latitude.$t,
      			lng: shelter.longitude.$t
      			}
      		shelter.title = name
      		shelter.key = id
      		})}

      	console.log(shelters)

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

      	{shelters.map((shelter, index) => 
 			<Marker 
				key={index}
 				title={shelter.title}
 				name={shelter.key}
 				position={shelter.location} />
      			)}
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyEUmiQYNT6nrZK6ACULxyVASU8XcyWNc'
})(MapMaker)