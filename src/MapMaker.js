import React, { Component } from 'react'
import axios from 'axios'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'



class MapMaker extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedShelter: [],
      shelterData: [],
      shelterPets: []
    }

    this.onMarkerSelect = this.onMarkerSelect.bind(this);
  }

getShelterPets(selectedShelter) {

	let urlShelter = 'http://api.petfinder.com/shelter.getPets?key=1edf8545fafb2f223f05f30911af67fa&output=basic&format=json&id='+selectedShelter;
  // get array of pets in the selected shelter
  axios.get(urlShelter)
    .then(res => {
        this.setState({shelterPets: res.data.petfinder.pets.pet})
      	this.setState({selectedShelter: selectedShelter})
    console.log(this.state.shelterPets)
		})
	}

onMarkerSelect = (props, marker, e) => {
    this.setState({
      selectedShelter: props.name,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.getShelterPets(this.state.selectedShelter)
    console.log(this.state.activeMarker)
    console.log(this.state.selectedShelter)
  	}


  render() {
  	let selected = this.props.selectedShelter
  	console.log(selected)
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
      		zoom={10}
      		initialCenter={{
      			lat: 39.155393,
      			lng: -84.274159
      		}}
      		style={{
      			height: '85%',
      			width: '66%',
      			topmargin: '100px'
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
 				animation={(this.state.activeMarker)
 							&&(this.state.selectedShelter === shelter.key)
 							&&(this.props.google.maps.Animation.BOUNCE)}
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
                 Select this shelter from the menu to view our pets         		
        		</ InfoWindow>
      	</Map>
      	

    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyEUmiQYNT6nrZK6ACULxyVASU8XcyWNc'
})(MapMaker )