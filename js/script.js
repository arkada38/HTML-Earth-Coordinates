'use strict';

//Longitude is a geographic coordinate that specifies the east-west position of a point on the Earth's surface.
//Latitude is a geographic coordinate that specifies the north–south position of a point on the Earth's surface.

var side, canvas, context, mouseX, mouseY, radius, canvasMargin;

let nothern_azimuthal, southern_azimuthal, northern, southern, western, eastern;

window.onload = function() {
	let size = window.innerWidth * 0.33 - 44;
	size *= window.devicePixelRatio;
	canvasMargin = 2;

	initHemispheres(size);

    addMouseMoveListener();

	draw();
};

window.onresize = function(event) {
	var size = Math.round(window.innerWidth * 0.33 - 44);
	let styleSize = size + 'px';
	size *= window.devicePixelRatio;

	nothern_azimuthal.side = size;
	southern_azimuthal.side = size;
	northern.side = size;
	southern.side = size;
	western.side = size;
	eastern.side = size;

	nothern_azimuthal.radius = nothern_azimuthal.side / 2 - canvasMargin;
	southern_azimuthal.radius = nothern_azimuthal.side / 2 - canvasMargin;
	northern.radius = northern.side / 2 - canvasMargin;
	southern.radius = southern.side / 2 - canvasMargin;
	western.radius = western.side / 2 - canvasMargin;
	eastern.radius = eastern.side / 2 - canvasMargin;
	
	nothern_azimuthal.canvas.style.width = styleSize;
	southern_azimuthal.canvas.style.width = styleSize;
	northern.canvas.style.width = styleSize;
	southern.canvas.style.width = styleSize;
	western.canvas.style.width = styleSize;
	eastern.canvas.style.width = styleSize;

	nothern_azimuthal.canvas.style.height = styleSize;
	southern_azimuthal.canvas.style.height = styleSize;
	northern.canvas.style.height = styleSize;
	southern.canvas.style.height = styleSize;
	western.canvas.style.height = styleSize;
	eastern.canvas.style.height = styleSize;

    draw();
};

var initHemispheres = function(size) {
	let styleSize = Math.round(size / window.devicePixelRatio) + 'px';

    nothern_azimuthal = {
		canvas: document.getElementById('cv_nothern_azimuthal'),
		context: document.getElementById('cv_nothern_azimuthal').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 18
	};
	nothern_azimuthal.canvas.style.width = styleSize;
	nothern_azimuthal.canvas.style.height = styleSize;

    southern_azimuthal = {
		canvas: document.getElementById('cv_southern_azimuthal'),
		context: document.getElementById('cv_southern_azimuthal').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 18
	};
	southern_azimuthal.canvas.style.width = styleSize;
	southern_azimuthal.canvas.style.height = styleSize;
	
	northern = {
		canvas: document.getElementById('cv_north'),
		context: document.getElementById('cv_north').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 9
	};
	northern.canvas.style.width = styleSize;
	northern.canvas.style.height = styleSize;
	
	southern = {
		canvas: document.getElementById('cv_south'),
		context: document.getElementById('cv_south').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 9
	};
	southern.canvas.style.width = styleSize;
	southern.canvas.style.height = styleSize;
	
	western = {
		canvas: document.getElementById('cv_west'),
		context: document.getElementById('cv_west').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 12
	};
	western.canvas.style.width = styleSize;
	western.canvas.style.height = styleSize;
	
	eastern = {
		canvas: document.getElementById('cv_east'),
		context: document.getElementById('cv_east').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 12
	};
	eastern.canvas.style.width = styleSize;
	eastern.canvas.style.height = styleSize;
};

var addMouseMoveListener = function() {
    nothern_azimuthal.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(nothern_azimuthal.canvas, evt);
		let coordinates = getCoordinates(nothern_azimuthal, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);

    southern_azimuthal.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(southern_azimuthal.canvas, evt);
		let coordinates = getCoordinates(southern_azimuthal, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);

	northern.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(northern.canvas, evt);
		let coordinates = getCoordinates(northern, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);
	
	southern.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(southern.canvas, evt);
		let coordinates = getCoordinates(southern, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);
	
	western.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(western.canvas, evt);
		let coordinates = getCoordinates(western, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);
	
	eastern.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(eastern.canvas, evt);
		let coordinates = getCoordinates(eastern, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "black");
	}, false);
};

var draw = function() {
	nothern_azimuthal.context.canvas.width = nothern_azimuthal.side;
	nothern_azimuthal.context.canvas.height = nothern_azimuthal.side;

	southern_azimuthal.context.canvas.width = southern_azimuthal.side;
	southern_azimuthal.context.canvas.height = southern_azimuthal.side;

	northern.context.canvas.width = northern.side;
	northern.context.canvas.height = northern.side;

	southern.context.canvas.width = southern.side;
	southern.context.canvas.height = southern.side;

	western.context.canvas.width = western.side;
	western.context.canvas.height = western.side;

	eastern.context.canvas.width = eastern.side;
	eastern.context.canvas.height = eastern.side;

	// Nothern azimuthal equidistant
	drawPoleGrid(nothern_azimuthal);
	// Southern azimuthal equidistant
	drawPoleGrid(southern_azimuthal);
	// Northern hemisphere
	drawPoleGrid(northern);
	// Southern hemisphere
	drawPoleGrid(southern);
	// Western hemisphere
	drawHemisphereGrid(western);
	// Eastern hemisphere
	drawHemisphereGrid(eastern);
	
	drawPoint(55.7498598,37.352323, 'green', 'Moscow');
	drawPoint(54.9700936,82.8093239, 'blue', 'Novosibirsk');
	drawPoint(43.1738098,131.9657976, 'blue', 'Vladivostok');
	drawPoint(39.9390731, 116.1172797, 'green', 'Beijing');

	drawPoint(52.5069704,13.2846504, 'red', 'Berlin');
	drawPoint(51.528308,-0.3817765, 'blue', 'London');

	drawPoint(34.0207305, -118.6919138, 'green', 'Los Angeles');
	drawPoint(40.6976637,-74.1197636, 'green', 'New York');

	drawPoint(7.883403,98.374404, 'green', 'Phuket');

	drawPoint(-37.9716929,144.7729595, 'red', 'Melbourne');
	drawPoint(-33.8478796,150.7918925, 'green', 'Sydney');
	drawPoint(-32.0391738,115.6813572, 'green', 'Perth');
	drawPoint(-12.425724,130.8632685, 'green', 'Darwin');
	drawPoint(-27.3812534,152.7130162, 'green', 'Brisbane');
	drawPoint(-34.9998826,138.3309827, 'green', 'Adelaide');
	drawPoint(-41.2442198,174.6918153, 'gold', 'Wellington');

	drawPoint(-54.6239778,-65.2356668, 'blue', 'Bahía Thetis');
	drawPoint(-34.6156625,-58.5033379, 'blue', 'Buenos Aires');
	drawPoint(-23.6815315,-46.8754808, 'blue', 'São Paulo');
	drawPoint(-33.4724228,-70.7699136, 'blue', 'Santiago de Chile');

	drawPoint(35.6693863,139.6012976, 'blue', 'Tokyo');
	//drawPoint(60, +20, 'blue', '');

	let australia = [
		[-34.264812, 115.037942],
		[-33.536345, 115.012443],
		[-21.896028, 113.987959],
		[-19.594009, 121.370696],
		[-16.393486, 123.008589],
		[-14.050751, 126.844672],
		[-15.097462, 129.531224],
		[-12.171271, 131.008389],
		[-12.178349, 136.521382],
		[-14.821877, 135.203514],
		[-17.656810, 140.751118],
		[-10.746499, 142.407247],
		[-26.133513, 152.372047],
		[-37.620577, 149.552889],
		[-39.069166, 146.349534],
		[-38.022707, 140.579265],
		[-31.550406, 130.177650],
		[-34.890339, 117.315896]
	];
	drawArea(australia, 'rgba(254,203,212,0.3)');
};

var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
};
