//Longitude is a geographic coordinate that specifies the east-west position of a point on the Earth's surface.
//Latitude is a geographic coordinate that specifies the north–south position of a point on the Earth's surface.

var side, canvas, context, mouseX, mouseY, radius, canvasMargin;

let azimuthal, north, south;

window.onload = function() {
    var size = window.innerWidth * 0.33 - 44;
	canvasMargin = 2;

	azimuthal = {
		canvas: document.getElementById('cv_azimuthal'),
		context: document.getElementById('cv_azimuthal').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin
	}

	north = {
		canvas: document.getElementById('cv_north'),
		context: document.getElementById('cv_north').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin
	}

	south = {
		canvas: document.getElementById('cv_south'),
		context: document.getElementById('cv_south').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin
	}

	azimuthal.canvas.addEventListener('click', function(evt) {
		let mousePos = getMousePos(azimuthal.canvas, evt);
		let coordinates = getCoordinates(azimuthal, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "orange");
	}, false);

	north.canvas.addEventListener('click', function(evt) {
		let mousePos = getMousePos(north.canvas, evt);
		let coordinates = getCoordinates(north, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "orange");
	}, false);

	south.canvas.addEventListener('click', function(evt) {
		let mousePos = getMousePos(south.canvas, evt);
		let coordinates = getCoordinates(south, mousePos);
		draw();
		drawPoint(coordinates.latitude, coordinates.longitude, "orange");
	}, false);

	draw();
};

window.onresize = function(event) {
	var size = window.innerWidth * 0.33 - 44;

	azimuthal.side = size;
	north.side = size;
	south.side = size;

	azimuthal.radius = azimuthal.side / 2 - canvasMargin;
	north.radius = north.side / 2 - canvasMargin;
	south.radius = south.side / 2 - canvasMargin;

    draw();
};

window.onmousemove = function(event) {
    //draw();
};

function drawGrid(context, radius, steps) {
	// Latitudes (окружности)
	for (var i = 1; i <= steps; i++) {
		context.beginPath();
		context.arc(radius + canvasMargin, radius + canvasMargin,
			radius * i / steps, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}

	// Longitudes (линии)
	for (let i = 0; i < 360; i += 10) {
		// Хорда - растояние между вершинами линий по внешнему кругу
		let t = 2 * radius * Math.cos(i / 360 * Math.PI);
		// Величина отклонения вершины по горизонтали по внешнему кругу
		let x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
		// Величина отклонения вершины по вертикали по внешнему кругу
		let y = Math.sqrt(t ** 2 - x ** 2);

		context.beginPath();
		context.moveTo(radius + x + canvasMargin, y + canvasMargin);

		// Хорда - растояние между вершинами линий по внутреннему кругу
		t = 2 * radius / steps * Math.cos(i / 360 * Math.PI);
		// Величина отклонения вершины по горизонтали по внутреннему кругу
		x = t * Math.sqrt((radius / steps) ** 2 - t ** 2 / 4) /
			(radius / steps);
		// Величина отклонения вершины по вертикали по внутреннему кругу
		y = Math.sqrt(t ** 2 - x ** 2);

		context.lineTo(radius + x + canvasMargin,
			radius * (steps - 1) / steps + y + canvasMargin);
		context.stroke();
	}

	// Vertical of cross
	context.beginPath();
	context.moveTo(radius + canvasMargin, radius * (steps - 1) / steps + canvasMargin);
	context.lineTo(radius + canvasMargin, radius * (steps + 1) / steps + canvasMargin);
	context.stroke();

	// Horisontal of cross
	context.beginPath();
	context.moveTo(radius * (steps - 1) / steps + canvasMargin, radius + canvasMargin);
	context.lineTo(radius * (steps + 1) / steps + canvasMargin, radius + canvasMargin);
	context.stroke();
}

function draw() {
	azimuthal.context.canvas.width = azimuthal.side;
	azimuthal.context.canvas.height = azimuthal.side;

	north.context.canvas.width = north.side;
	north.context.canvas.height = north.side;

	south.context.canvas.width = south.side;
	south.context.canvas.height = south.side;

	// Azimuthal equidistant
	drawGrid(azimuthal.context, azimuthal.radius - canvasMargin, 18);
	// North pole
	drawGrid(north.context, north.radius - canvasMargin, 9);
	// South pole
	drawGrid(south.context, south.radius - canvasMargin, 9);
	
	drawPoint(80, -150, 'red');
	drawPoint(80, +150, 'green');
	drawPoint(60, 40, 'red');
	drawPoint(60, +20, 'green');
	drawPoint(40, -80, 'red');
	drawPoint(40, +80, 'green');
	drawPoint(20, -100, 'red');
	drawPoint(20, +100, 'green');
	drawPoint(0, -170, 'red');
	drawPoint(0, +170, 'green');
	
	drawPoint(-80, -150, 'purple');
	drawPoint(-80, +150, 'lime');
	drawPoint(-60, -20, 'purple');
	drawPoint(-60, +20, 'lime');
	drawPoint(-40, -80, 'purple');
	drawPoint(-40, +80, 'lime');
	drawPoint(-20, -100, 'purple');
	drawPoint(-20, +100, 'lime');
	drawPoint(+90, 0, 'gold');
	drawPoint(-90, 0, 'brown');
}

function drawPoint(latitude, longitude, colour) {
	var k, t, x, y;
	/*
	k - расстояние от полюса к координате
	t - хорда
	*/
	
	latitude = Math.min(Math.max(-90, latitude), 90);
	longitude = Math.min(Math.max(-180, longitude), 180);
	
	if (longitude < -90) longitude = 360 + longitude;
	
	// Azimuthal equidistant
	context = azimuthal.context;
	radius = azimuthal.radius - canvasMargin;
	
    k = radius * (90 - latitude) / 180;
	t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
	x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
	y = Math.sqrt(t ** 2 - x ** 2);
	
	if (isNaN(x)) {
		x = 0;
		y = 0;
	}

	context.beginPath();
	context.arc(radius + x + canvasMargin,
		y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
	context.lineWidth = 1;
	context.strokeStyle = colour;
	context.stroke();
	context.closePath();
	
	if (0 <= latitude && latitude <= 90) {
		// North pole
		context = north.context;
		radius = north.radius - canvasMargin;
		
		k = radius * (1 - (latitude / 90));
		t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		if (isNaN(x)) {
			x = 0;
			y = 0;
		}
		
		context.beginPath();
		context.arc(radius + x + canvasMargin,
			y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
	
	if (-90 <= latitude && latitude <= 0) {
		// South pole
		context = south.context;
		radius = south.radius - canvasMargin;

		k = radius * (1 + (latitude / 90));
		t = 2 * k * Math.sin((longitude - 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		if (isNaN(x)) {
			x = 0;
			y = 0;
		}
		
		context.beginPath();
		context.arc(radius + x + canvasMargin,
			y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
}

function getCoordinates(map, mousePos) {
	// Расстояние от центра по горизонтали
	let x = mousePos.x - map.radius + canvasMargin;
	// Расстояние от центра по вертикали
	let y = mousePos.y - map.radius + canvasMargin;

	let latitude, longitude;
	
	if (map == north) {
		// Расстояние от центра до точки (широта)
		latitude = 90 - Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 90;

		// Угол (долгота)
		longitude = 90 - Math.atan(x / -y) / Math.PI * 180;
		if (y > 0) longitude = longitude - 180;
	}
	
	if (map == south) {
		// Расстояние от центра до точки (широта)
		latitude = -90 + Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 90;

		// Угол (долгота)
		longitude = 90 + Math.atan(x / -y) / Math.PI * 180;
		if (y > 0) longitude = longitude - 180;
	}
	
	if (map == azimuthal) {
		// Расстояние от центра до точки (широта)
		latitude = 90 - Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 180;

		// Угол (долгота)
		longitude = 90 - Math.atan(x / -y) / Math.PI * 180;
		if (y > 0) longitude = longitude - 180;
	}

	return {
		latitude: latitude,
		longitude: longitude
	};
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}