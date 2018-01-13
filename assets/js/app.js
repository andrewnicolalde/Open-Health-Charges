function convertCSVtoJSON(csv){
	let lines = csv.split(/\r\n|\n/);
	var data = [];

	for(var i = 0; i < lines.length; i++){
		data.push(lines[i].split(','));
	}

	return data;
}

window.onload = function(){
	fetch('/')
}
