var mymap = null;
window.onload = function(){
	mymap = L.map('map').setView([38.0003554, -99.9364875], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
	}).addTo(mymap);
mymap.setZoom(5);
	getHeatMap().addTo(mymap);
};

function pan(){
	mymap.panBy([leap.getMovementDirection() * 100, leap.getMovementDirection() * 100]);
}