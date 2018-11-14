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
				console.log(orderedResults)
				this.setState({
					shelter: orderedResults
				})
				console.log(this.state.shelter)
			})
		}
getShelterPets(selectedShelter) {

	let urlShelter = 'http://api.petfinder.com/shelter.getPets?key=1edf8545fafb2f223f05f30911af67fa&output=basic&format=json&id='+selectedShelter;
	this.setState({selectedShelter: selectedShelter})
	// get array of pets in the selected shelter
	axios.get(urlShelter)
		.then(res => {
				let shelterPets = res.data.petfinder.pets.pet
			this.setState({
				shelterPets: shelterPets
			})
		console.log(shelterPets)
		})
	}

onShelterSelect(event) {
	let selectedShelter = event.target.value
	console.log(selectedShelter)
	if(selectedShelter == 'all') {
		this.setState({
			selectedShelter: 'all',
			shelterPets: [],
		})
		return
		}
		this.getShelterPets(selectedShelter)
	}



 render() {

	let pets = this.state.pets;
	let shelters = this.state.shelter

    return (

<div id = "root">
	<div id = "header">
		<h1>Furry Friend Finder</h1>
	</div>
	<div id = "container">

		<div id= 'menu' className = "section1">
				<legend><h2><em>View adoptable pets</em></h2></legend>
  			<form>
		            <select 
		            	id="shelterMenu" 
		            	value={this.state.selectedShelter} 
		            	onChange={this.onShelterSelect}>
		            	<option value='all' >View any shelter's adoptable pets:</option>
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

		<div id = "map" role='application'>
			<MapMaker shelters={this.state.shelter} pets={this.state.pets} selectedShelter={this.state.selectedShelter} />
		</div>
			<PetParade 
				pets={this.state.pets} 
				shelterPets={this.state.shelterPets} 
				selectedShelter={this.state.selectedShelter} 
				/>
	</div>
	<div className='section3'>
	All pet data was provided by PetFinder API / <a href="https://pngtree.com/free-icon/paws_626868">Paw Print Icon</a> from pngtree.com
	</div>
</div>
   );
  }
}

export default App;
