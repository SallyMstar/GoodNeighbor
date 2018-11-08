var apiKey = '1edf8545fafb2f223f05f30911af67fa'; // assign our key to a variable, easier to read

// the next line and function set up the button in our html to be clickable and reactive 
document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
	document.getElementById('submitZip').addEventListener('click', function(event){
		event.preventDefault();
		var zip = document.getElementById('zip').value; // this line gets the zip code from the form entry
		var url = 'http://api.petfinder.com/pet.find';
		var url2 = 'http://api.petfinder.com/shelter.get';
		
		// Within $.ajax{...} is where we fill out our query 
		$.ajax({
			url: url,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				'location': zip,
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				console.log(response); // debugging
				let pets = []
				    pets = response.petfinder.pets.pet

	response.petfinder.pets.pet.map((pet, index) => {
				var petName = response.petfinder.pets.pet[index].name.$t;
			if(response.petfinder.pets.pet[index].media.photos.photo[2].$t) {
				var img = response.petfinder.pets.pet[index].media.photos.photo[2].$t;
			} else {
				img = response.petfinder.pets.pet[index].media.photos.photo[0].$t0
			}
				var id = response.petfinder.pets.pet[index].id.$t;
				var breed = response.petfinder.pets.pet[index].breeds.breed.$t
				var shelterId = response.petfinder.pets.pet[index].shelterId.$t

				var newName = document.createElement('a');
				var newDiv = document.createElement('div');
				newName.textContent = petName +', '+ breed;
				newName.href = 'https://www.petfinder.com/petdetail/' + id;

				var newImg = document.createElement('img');
				newImg.src = img;

				var list = document.createElement("div");
				list.setAttribute("id", "List");
				document.body.appendChild(list);

				newDiv.appendChild(newName);
				list.appendChild(newDiv);
				list.appendChild(newImg);
		$.ajax({
			url: url2,
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				key: apiKey,
				id: shelterId,
				output: 'basic',
				format: 'json'
			},
			// Here is where we handle the response we got back from Petfinder
			success: function( response ) {
				console.log(response); // debugging
				var shelterName = response.petfinder.shelter.name.$t;
				var lat = response.petfinder.shelter.latitude.$t;
				var lng = response.petfinder.shelter.longitude.$t;
				var id = response.petfinder.shelter.id.$t;

				var newShelterName = document.createElement('a');
				var newShelterDiv = document.createElement('div');
				newShelterName.textContent = shelterName + ', ' +lat+', '+ lng;
				newShelterName.href = 'https://www.petfinder.com/shelters/' + id+'.html';
				
				var shelterList = document.createElement("div");
				shelterList.setAttribute("id", "shelterList");
				document.body.appendChild(shelterList);

				newShelterDiv.appendChild(newShelterName);
				shelterList.appendChild(newShelterDiv);

			}
		})
	})
		}
	})

		})

}