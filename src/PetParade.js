import React, { Component } from 'react';

class PetParade extends Component {

	state= {
		pets: [],
		filteredPets: [],
		selectedShelter: ''
	}

render() {
	let pets = this.props.pets;
	let selectedShelter = this.props.shelter
	
	console.log(pets)
	console.log(selectedShelter)


	let filteredPets = pets.filter((pet)=> {
			return pet.shelterId.$t === selectedShelter
	})	

console.log(filteredPets)

	return(

		<div className="section2">
			{filteredPets.map((pet) =>
					<div key={pet.id.$t} className = "item">
	                <div className ='petName'>~ {pet.name.$t} ~<br/>{pet.breeds.breed.$t}</div>
	                {pet.media.photos.photo[2].$t ?
	                	(<img src={pet.media.photos.photo[2].$t} alt={pet.name.$t} />
	                	) : (
	                	<p>no image available</p>
	                	)
	                	}
	                <div>
	                </div>
					</div>
				)}
		</div>

		)
}
}

export default PetParade