import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react'


// No structure built yet. Just saving the code.

      	{shelters.map((shelter) => {
 			<Marker 
 				key={shelter.id.$t}
 				title={shelter.name.$t}
 				name={shelter.id.$t}
 				position={{
 					lat: 39.1406,
 					lng: -84.374384
 				}} />
      			)}
