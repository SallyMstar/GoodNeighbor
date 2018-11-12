import React, { Component } from 'react';
import sortBy from 'sort-by'
import axios from 'axios'
import MapMaker from './MapMaker';
import PetParade from './PetParade';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

	this.state = {
		pets: [],
		shelter: [],
		selectedShelter: ''
	};

	this.onShelterSelect = this.onShelterSelect.bind(this);
}

	componentDidMount() {
			const urlPets = 'http://api.petfinder.com/pet.find?key=1edf8545fafb2f223f05f30911af67fa&location=45150&output=basic&format=json';
			const urlLocations = 'http://api.petfinder.com/shelter.find?key=1edf8545fafb2f223f05f30911af67fa&location=45150&output=basic&format=json';

		axios.get(urlPets)  // get array of pets in the Cincinnati area
			.then(res => {
				this.setState({
					pets: res.data.petfinder.pets.pet
				})
			})
		axios.get(urlLocations)
			.then(res => {
				let orderedResults = res.data.petfinder.shelters.shelter.sort(sortBy('name.$t'))
				this.setState({
					shelter: res.data.petfinder.shelters.shelter
				})
			})
	}


onShelterSelect(event) {
	console.log(event.target.value)
	this.setState({selectedShelter: event.target.value})
}


 render() {

	let pets = this.state.pets;
	let shelters = this.state.shelter

    return (

<div id = "root">
	<div id = "header">
		<h1>Furry Friend Finder</h1>
		<span className = "section1">
			<div id="menu">
				<legend><h2><em>View adoptable pets</em></h2></legend>
  			<form>
		            <select id="shelterMenu" value={this.state.value} onChange={this.onShelterSelect}>
			            {shelters.map((shelter, index, key) =>
		            	<option 
		            		key={index}
		            		id={key}
		            		value={shelter.id.$t}
		            		onClick={ this.onShelterSelect }>
		            		{shelter.name.$t}
		            	</option>
		            )}
		            </select>
			</form>
		</div>
		</span>

	</div>

	<div id = "container">

		<div id = "map">
			<MapMaker shelters={this.state.shelter} pets={this.state.pets} petSelector={this.petSelector}/>
		</div>

			<PetParade shelter={this.state.selectedShelter} pets={this.state.pets} petSelector={this.petSelector} />
	</div>
</div>
   );
  }
}

export default App;
