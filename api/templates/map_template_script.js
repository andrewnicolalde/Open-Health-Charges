function getHeatMap(){
	heat = L.heatLayer({{ heatPoints }}, {radius: 25}, {0.2: 'red', 0.4: 'lime', 0.6: 'blue'});
	return heat;
}