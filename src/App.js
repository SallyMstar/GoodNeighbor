import React, { Component } from 'react';
import sortBy from 'sort-by'
import axios from 'axios'
import MapMaker from './MapMaker';
import './App.css';

class App extends Component {

	state = {
		pets: [],
		shelter: []
	}
	componentDidMount() {
			const urlShelter = 'http://api.petfinder.com/shelter.get?key=1edf8545fafb2f223f05f30911af67fa&id=OH1144&output=basic&format=json';
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
					shelter: res.data.petfinder.shelters.shelter
				})
			})
			}


 render() {

	let pets = this.state.pets;
	let shelters = this.state.shelter
	console.log(shelters)

    return (

<div id = "root">
	<div id = "header">
		<h1>Furry Friend Finder</h1>
		<span className = "section1">
		</span>
			<div id="menu">
				<legend><h2><em>View adoptable pets below the map</em></h2></legend>
  			<form>
		            <select id="shelterMenu">
		            	<option value=''>Select a shelter to view more details: </option>
			            {shelters.map((shelter, index, key) =>
		            	<option 
		            		key={index}
		            		id={key}
		            		value={shelter.name.$t}
		            		onClick={ this.onShelterSelect }>
		            		{shelter.name.$t}
		            	</option>
		            )}
		            </select>
			</form>
			</div>
	</div>

	<div id = "container">

		<div id = "map">
			<MapMaker shelters={this.state.shelter} />
		</div>

		<div className="section2">

		
		</div>

		<div className = "section3">
			{pets.map((pet) =>
					<div key={pet.id.$t} className = "item">
	                <div className ='petName'>~ {pet.name.$t} ~<br/>{pet.breeds.breed.$t}</div>
	                {pet.media.photos.photo[2].$t ?
	                	(<img src={pet.media.photos.photo[2].$t} />
	                	) : (
	                	<p>no image available</p>
	                	)
	                	}
	                <div>
	                </div>
					</div>
				)}
		</div>

	</div>

	<div id = "footer">
		Page Footer
	</div>
</div>
   );
  }
}

export default App;
