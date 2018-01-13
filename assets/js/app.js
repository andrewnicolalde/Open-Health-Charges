function convertCSVtoJSON(csv){
	let lines = csv.split(/\r\n|\n/);
	var data = [];

	for(var i = 0; i < lines.length; i++){
		data.push(lines[i].split(','));
	}

	return data;
}

window.onload = function(){
	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
}).addTo(mymap);
}
