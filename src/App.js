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
		shelterPets: [],
		selectedShelter: 'all'
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
				console.log(orderedResults)
				this.setState({
					shelter: orderedResults
				})
				console.log(this.state.shelter)
			})
		}

onShelterSelect(event) {
	let selectedShelter = event.target.value
	console.log(selectedShelter)
	if(selectedShelter == 'all') {
		this.setState({
			selectedShelter: 'all',
			shelterPets: []
		})
		return
		}

	let urlShelter = 'http://api.petfinder.com/shelter.getPets?key=1edf8545fafb2f223f05f30911af67fa&output=basic&format=json&id='+selectedShelter;
	this.setState({selectedShelter: selectedShelter})
	// get array of pets in the selected shelter
	axios.get(urlShelter)
		.then(res => {
			this.setState({
				shelterPets: res.data.petfinder.pets.pet
			})
		console.log(this.state.shelterPets)
		})
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
		            <select 
		            	id="shelterMenu" 
		            	value={this.state.selectedShelter} 
		            	onChange={this.onShelterSelect}>
		            	<option value='all' >Select a shelter:</option>
		            	<option value='all' >View 25 nearby pets from any shelter</ option>
			         	{shelters.map((shelter, index, key) =>
		            	<option 
		            		key={index}
		            		id={key}
		            		value={shelter.id.$t}
		            		onClick={ this.onShelterSelect }>
		            		{shelter.name.$t} ({shelter.id.$t})
		            	</option>
		            )}
		            </select>
			</form>
		</div>
		</span>

	</div>

	<div id = "container">

		<div id = "map">
			<MapMaker shelters={this.state.shelter} pets={this.state.pets} selectedShelter={this.state.selectedShelter} />
		</div>
			<PetParade pets={this.state.pets} shelterPets={this.state.shelterPets} selectedShelter={this.state.selectedShelter} />
	</div>
</div>
   );
  }
}

export default App;
