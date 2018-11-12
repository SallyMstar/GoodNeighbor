import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'



class MapMaker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      shelterData: []
    }

    this.onMarkerSelect = this.onMarkerSelect.bind(this);
  }

  onMarkerSelect = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    console.log(marker)
    console.log(this.state.selectedPlace)
  }


  render() {
	let shelters = this.props.shelters
      	{shelters.map((shelter) => {
      		let name = shelter.name.$t;
      		let id = shelter.id.$t;
      		let address = shelter.address1.$t;
      		let cityName = shelter.city.$t ;
      		let stateName = shelter.state.$t;
      		let zipcode = shelter.zip.$t;
      		shelter.location = {
      			lat: shelter.latitude.$t,
      			lng: shelter.longitude.$t
      			}
      		shelter.title = name
      		shelter.key = id
      		shelter.address = address
      		shelter.cityName = cityName
      		shelter.stateName = stateName
      		shelter.zipcode = zipcode
      		})}

    return (
      <Map google={this.props.google} 
      		zoom={11}
      		initialCenter={{
      			lat: 39.185393,
      			lng: -84.274159
      		}}
      		style={{
      			height: '85%',
      			width: '66%'
       		}}
      		>

      	{shelters.map((shelter, index) => 
 			<Marker 
				key={index}
 				title={shelter.title}
 				name={shelter.key}
 				position={shelter.location}
 				address={shelter.address}
 				cityName={shelter.city.$t}
 				stateName={shelter.state.$t}
 				zipCode={shelter.zip.$t}
 				onClick = { this.onMarkerSelect }
 				/>
      			)}
      	  <InfoWindow
	          	marker = { this.state.activeMarker }
	          	visible = { this.state.showingInfoWindow }
        		>
		          	<div>
		          		<h3>{ this.state.activeMarker.title }</h3>
		          		<p>{ this.state.activeMarker.address }<br />
		          		{ this.state.activeMarker.cityName }, { this.state.activeMarker.stateName } { this.state.activeMarker.zipCode }</p>
		          	</div>	          		
        		</ InfoWindow>
      	</Map>


    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyEUmiQYNT6nrZK6ACULxyVASU8XcyWNc'
})(MapMaker )