import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {

	state = {
		pets: [],
		shelters: []
	}
	componentDidMount() {
		let urlShelter = 'http://api.petfinder.com/shelter.get?key=1edf8545fafb2f223f05f30911af67fa&id=OH1144&output=basic&format=json';
		let urlPets = 'http://api.petfinder.com/pet.find?key=1edf8545fafb2f223f05f30911af67fa&location=45150&output=basic&format=json';

		axios.get(urlPets)
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
					shelters: res.data.petfinder.shelter
				})
			})

	}

  render() {
	return(
		<div id="container">
			<h4>Home</h4>
				<p>Stuff here</p>
		</div>
	)
		
}

}

export default Home