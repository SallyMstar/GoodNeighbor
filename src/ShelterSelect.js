import React, { Component } from 'react';

const ShelterSelect = (props) => {

	let shelterOptions = props.shelters


return(
		<div id="menu">
			<label for='shelterSelection'><h2><em>Select a shelter to view</em></h2></label>
  			<select id='shelterSelection'>
		            <option value=''>--Select a shelter--</option>
			         {shelterOptions.map((shelter, index) =>
		            	<option 
		            		key={index} 
		            		value={shelter.name.$t}>
		            			{shelter.name.$t}
		            	</option>
		            )}
			</select>
		</div>
)

}

export default ShelterSelect