window.onload = function() {
	var script = document.createElement("script");
	script.src = "https://code.jquery.com/jquery-1.11.3.min.js";
	script.onload = script.onreadystatechange = function() {
		$(document).ready(function() {
				console.log("injectJquery.js shd be done");
				});
	};
	document.body.appendChild(script);
};
