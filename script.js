var side, canvas, context, mouseX, mouseY, radius, canvasMargin;

var azimuthal, north, south;

window.onload = function() {
    /*canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		mouseX = mousePos.x;
		mouseY = mousePos.y;
	}, false);*/

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
    draw();
};

function draw() {
	azimuthal.context.canvas.width = azimuthal.side;
	azimuthal.context.canvas.height = azimuthal.side;

	north.context.canvas.width = north.side;
	north.context.canvas.height = north.side;

	south.context.canvas.width = south.side;
	south.context.canvas.height = south.side;

	// Azimuthal equidistant
		context = azimuthal.context;
		radius = azimuthal.radius - canvasMargin;
		// Latitudes
		for (var i = 1; i <= 18; i++) {
			context.beginPath();
			context.arc(radius + canvasMargin, radius + canvasMargin, radius * i / 18, 0, 2 * Math.PI, false);
			context.lineWidth = 1;
			context.strokeStyle = '#003300';
			context.stroke();
			context.closePath();
		}
		
		// Longitudes
		for (var i = 0; i < 360; i += 10) {
			var t = 2 * radius * Math.cos(i / 360 * Math.PI);
			var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
			var y = Math.sqrt(t ** 2 - x ** 2);
			context.beginPath();
			context.moveTo(radius + x + canvasMargin, y + canvasMargin);
			t = radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 18) ** 2 - t ** 2 / 4) / (radius / 18);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(radius + x + canvasMargin, radius * 17 / 18 + y + canvasMargin);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(radius + canvasMargin, radius * 17 / 18 + canvasMargin);
		context.lineTo(radius + canvasMargin, radius * 19 / 18 + canvasMargin);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(radius * 17 / 18 + canvasMargin, radius + 3);
		context.lineTo(radius * 19 / 18 + canvasMargin, radius + canvasMargin);
		context.stroke();

	// North pole
		context = north.context;
		radius = north.radius - canvasMargin;
		// Latitudes
		for (var i = 1; i <= 9; i++) {
			context.beginPath();
			context.arc(radius + canvasMargin, radius + canvasMargin, radius * i / 9, 0, 2 * Math.PI, false);
			context.lineWidth = 1;
			context.strokeStyle = '#003300';
			context.stroke();
			context.closePath();
		}
		
		// Longitudes
		for (var i = 0; i < 360; i += 10) {
			var t = 2 * radius * Math.cos(i / 360 * Math.PI);
			var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
			var y = Math.sqrt(t ** 2 - x ** 2);
			context.beginPath();
			context.moveTo(radius + x + canvasMargin, y + canvasMargin);
			t = radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 18) ** 2 - t ** 2 / 4) / (radius / 18);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(radius + x + canvasMargin, radius * 17 / 18 + y + canvasMargin);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(radius + canvasMargin, radius * 8 / 9 + canvasMargin);
		context.lineTo(radius + canvasMargin, radius * 10 / 9 + canvasMargin);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(radius * 8 / 9 + canvasMargin, radius + canvasMargin);
		context.lineTo(radius * 10 / 9 + canvasMargin, radius + canvasMargin);
		context.stroke();

	// South pole
		context = south.context;
		radius = south.radius - canvasMargin;
		// Latitudes
		for (var i = 1; i <= 9; i++) {
			context.beginPath();
			context.arc(radius + canvasMargin, radius + canvasMargin, radius * i / 9, 0, 2 * Math.PI, false);
			context.lineWidth = 1;
			context.strokeStyle = '#003300';
			context.stroke();
			context.closePath();
		}
		
		// Longitudes
		for (var i = 0; i < 360; i += 10) {
			var t = 2 * radius * Math.cos(i / 360 * Math.PI);
			var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
			var y = Math.sqrt(t ** 2 - x ** 2);
			context.beginPath();
			context.moveTo(radius + x + canvasMargin, y + canvasMargin);
			t = radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 18) ** 2 - t ** 2 / 4) / (radius / 18);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(radius + x + canvasMargin, radius * 17 / 18 + y + canvasMargin);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(radius + canvasMargin, radius * 8 / 9 + canvasMargin);
		context.lineTo(radius + canvasMargin, radius * 10 / 9 + canvasMargin);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(radius * 8 / 9 + canvasMargin, radius + canvasMargin);
		context.lineTo(radius * 10 / 9 + canvasMargin, radius + canvasMargin);
		context.stroke();
	
	drawPoint(80, -150, 'red');
	drawPoint(80, +150, 'green');
	drawPoint(60, -20, 'red');
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
	context.arc(radius + x + canvasMargin, y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
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
		context.arc(radius + x + canvasMargin, y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
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
		context.arc(radius + x + canvasMargin, y + radius - k + canvasMargin, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}