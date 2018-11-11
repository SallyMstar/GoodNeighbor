import React, { Component } from 'react';

class Shelter extends Component {

	state = {
		shelter: []
	}

render() {

	let shelters = this.props.shelters

return (
        <div id="menu">
  	<form>
			<legend> Find A Pet Near You Who Needs a Home</legend>
		<input type="select">
            <ul>
            	<li id="option1">test 1</li>
            	<li id="option2">test 2</li>
            	<li id="option3">test 3</li>
            	<li id="option4">test 4</li>
            </ul>
        </input>
	</form>
        </div>

		)
}
}

export default Shelter