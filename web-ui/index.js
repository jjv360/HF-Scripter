//
// App entry point

import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Screens/Main.js'

document.addEventListener("DOMContentLoaded", function() {

	// Render main app
    console.log("App start")
	var mainDiv = document.createElement("div");
	document.body.appendChild(mainDiv);
	ReactDOM.render(<Main/>, mainDiv);

});
