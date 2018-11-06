import React, { Component } from 'react';
import MapMaker from './MapMaker';
import './App.css';

class App extends Component {
  render() {
    return (

<div id = "root">
	<div id = "header">
		<h1>
			Page Header
		</h1>
	</div>
		<div id = "container">
		<div id = "map">
				<MapMaker />
		</div>
		<div class = "section1">
				<div class = "item">
					Div Section 1
				</div>
			</div>
		<div class = "section3">
				<div class = "item">
					Div Section 3
				</div>
				<div class = "item">
					Div Section 3
				</div>
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
