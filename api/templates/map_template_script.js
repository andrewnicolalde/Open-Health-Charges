function getHeatMap(){
	heat = L.heatLayer({{ heatPoints }}, {radius: 25}, {0.2: 'blue', 0.4: 'lime', 0.6: 'red'});
	return heat;
}