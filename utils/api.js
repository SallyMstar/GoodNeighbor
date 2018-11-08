import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Axios from 'axios';

const Kennel =() {

var axios = require('axios');

module.exports = {
	petParade: function(shelter) {
		var shelterURL = 'http://api.petfinder.com/shelter.get?key=1edf8545fafb2f223f05f30911af67fa&id=OH1144&output=basic&format=json';

		return axios.get(petURL)
			.then(function(response) {
				return response;
			});
	}
}
}