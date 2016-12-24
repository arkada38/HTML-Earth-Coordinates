var side, canvas, context, mouseX, mouseY, radius;

window.onload = function() {
    canvas = document.getElementById('cv');
	context = canvas.getContext('2d');
	side = Math.min(window.innerWidth / 3, window.innerHeight);
  
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		mouseX = mousePos.x;
		mouseY = mousePos.y;
	}, false);

	draw();
};

window.onresize = function(event) {
	side = Math.min(window.innerWidth / 3, window.innerHeight);
    draw();
};

window.onmousemove = function(event) {
    draw();
};

function draw() {
	context.canvas.width  = 3 * side;
	context.canvas.height = side;
	
	context.font = '20pt Calibri';
    context.fillText(mouseX + 'x' + mouseY, 0, 20);
	
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    radius = side / 2;

	// Azimuthal equidistant
		// Latitudes
		for (var i = 1; i <= 18; i++) {
			context.beginPath();
			context.arc(radius, radius, radius * i / 18, 0, 2 * Math.PI, false);
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
			context.moveTo(radius + x, y);
			t = radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 18) ** 2 - t ** 2 / 4) / (radius / 18);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(radius + x, radius * 17 / 18 + y);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(radius, radius * 17 / 18);
		context.lineTo(radius, radius * 19 / 18);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(radius * 17 / 18, radius);
		context.lineTo(radius * 19 / 18, radius);
		context.stroke();

	// North pole
		// Latitudes
		for (var i = 1; i <= 9; i++) {
			context.beginPath();
			context.arc(3 * radius, radius, radius * i / 9, 0, 2 * Math.PI, false);
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
			context.moveTo(3 * radius + x, y);
			t = 2 * radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 9) ** 2 - t ** 2 / 4) / (radius / 9);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(3 * radius + x, radius * 8 / 9 + y);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(3 * radius, radius * 8 / 9);
		context.lineTo(3 * radius, radius * 10 / 9);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(2 * radius + radius * 8 / 9, radius);
		context.lineTo(2 * radius + radius * 10 / 9, radius);
		context.stroke();

	// South pole
		// Latitudes
		for (var i = 1; i <= 9; i++) {
			context.beginPath();
			context.arc(5 * radius, radius, radius * i / 9, 0, 2 * Math.PI, false);
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
			context.moveTo(5 * radius + x, y);
			t = 2 * radius / 9 * Math.cos(i / 360 * Math.PI);
			x = t * Math.sqrt((radius / 9) ** 2 - t ** 2 / 4) / (radius / 9);
			y = Math.sqrt(t ** 2 - x ** 2);
			context.lineTo(5 * radius + x, radius * 8 / 9 + y);
			context.stroke();
		}
		
		// Vertical of cross
		context.beginPath();
		context.moveTo(5 * radius, radius * 8 / 9);
		context.lineTo(5 * radius, radius * 10 / 9);
		context.stroke();
		
		// Horisontal of cross
		context.beginPath();
		context.moveTo(4 * radius + radius * 8 / 9, radius);
		context.lineTo(4 * radius + radius * 10 / 9, radius);
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
	
    k = radius * (90 - latitude) / 180;
	t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
	x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
	y = Math.sqrt(t ** 2 - x ** 2);
	
	if (isNaN(x)) {
		x = 0;
		y = 0;
	}
	
	context.beginPath();
	context.arc(radius + x, y + radius - k, 3, 0, 2 * Math.PI, false);
	context.lineWidth = 3;
	context.strokeStyle = colour;
	context.stroke();
	context.closePath();
	
	if (0 <= latitude && latitude <= 90) {
		// North pole
		k = radius * (1 - (latitude / 90));
		t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		if (isNaN(x)) {
			x = 0;
			y = 0;
		}
		
		context.beginPath();
		context.arc(3 * radius + x, y + radius - k, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
	
	if (-90 <= latitude && latitude <= 0) {
		// South pole
		k = radius * (1 + (latitude / 90));
		t = 2 * k * Math.sin((longitude - 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		if (isNaN(x)) {
			x = 0;
			y = 0;
		}
		
		context.beginPath();
		context.arc(5 * radius + x, y + radius - k, 3, 0, 2 * Math.PI, false);
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