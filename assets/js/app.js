var mymap = null;
window.onload = function(){
	mymap = L.map('map').setView([38.0003554, -99.9364875], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
    	minZoom: 5,
	}).addTo(mymap);
	mymap.setZoom(5);
	var bounds = new L.LatLngBounds(new L.LatLng(51.802857, -128.999114), new L.LatLng(24.547442, -67.205436));
	getHeatMap().addTo(mymap);
	// Saved by Immanuel
	mymap.setMaxBounds(bounds);
};

function pan(dir){
    console.log("PAN");
    mymap.panBy([dir[0] * 100, dir[1] * 100]);
}

function zoomIn() {
	mymap.zoomIn();
}

function zoomOut() {
	mymap.zoomOut();
}