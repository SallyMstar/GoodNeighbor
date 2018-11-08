import React, { Component } from 'react';
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

		axios.get(urlPets)  // get array of pets in the Cincinnati area
			.then(res => {
				console.log(res)
				this.setState({
					pets: res.data.petfinder.pets.pet
				})
			})
		axios.get(urlShelter)
			.then(res => {
				console.log(res)
				this.setState({
					shelter: res.data.petfinder.shelter
				})
			})
			}


 render() {

	let pets = this.state.pets;

    return (

<div id = "root">
	<div id = "header">
		<h1>
			Cincinnati Furry Friends
		</h1>
		<span className = "section1">
  			<form>
					<legend> Find A Pet Near You Who Needs a Home</legend>
					<input 
						type="text" 
						placeholder="zipcode"
						name="zip" 
						id="zip" 
						label="zip" />
					<input 
						type="submit" 
						id="submitZip" />
			</form>
			</span>
	</div>
		<div id = "container">
		<div id = "map">
				<MapMaker />
		</div>
		<div className = "section3">
		{pets.map((pet) =>
				<span key={pet.id.$t} className = "item">
                <div className ='petName'>~ {pet.name.$t} ~<br/>{pet.breeds.breed.$t}</div>
                {pet.media.photos.photo[2].$t ?
                	(<img src={pet.media.photos.photo[2].$t} />
                	) : (
                	<p>no image available</p>
                	)
                	}
				</span>

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
