import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Axios from 'axios'

const apiKey = '1edf8545fafb2f223f05f30911af67fa'; // assign our key to a variable, easier to read

class GetPets extends Component {

	state = {
		pets: [],
		shelters: []
	}
	componentDidMount() {
		let urlShelter = 'http://api.petfinder.com/shelter.get?key=1edf8545fafb2f223f05f30911af67fa&id=OH1144&output=basic&format=json';
		let urlPets = 'http://api.petfinder.com/pet.find?key=1edf8545fafb2f223f05f30911af67fa&location=45150&output=basic&format=json';

		Axios.get(urlPets)
			.then(res => {
				console.log(res)
				this.setState({
					pets: res.data.petfinder.pets.pet
				})
			})

		Axios.get(urlShelter)
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

		{this.state.pets.pet}

		</div>
	)
		
}

}

export default GetPets