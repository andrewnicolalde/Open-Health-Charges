var mymap = null;
window.onload = function(){
	mymap = L.map('map').setView([51.505, -0.09], 13);
	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18,
	}).addTo(mymap);

	//getHeatMap().addTo(mymap);
};

function pan(dir){
    console.log("PAN");	mymap.panBy([dir[0] * 100, dir[1] * 100]);
}