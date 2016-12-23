var side, canvas, context, mouseX, mouseY;

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
    var radius = side / 2;

	// Azimuthal equidistant
    for (var i = 1; i < 19; i++) {
		context.beginPath();
		context.arc(centerY, centerY, radius * i / 18, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}
	
	for (var i = 0; i <= 180; i += 10) {
		var t = 2 * radius * Math.sin(i / 180 * Math.PI);
		var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
		var y = Math.sqrt(t ** 2 - x ** 2);
		context.beginPath();
		context.moveTo(centerY + x, y);
		context.lineTo(centerY - x, 2 * radius - y);
		context.stroke();
	}

	// North pole
    for (var i = 1; i < 10; i++) {
		context.beginPath();
		context.arc(2 * radius + centerY, centerY, radius * i / 9, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}
	
	for (var i = 0; i <= 180; i += 10) {
		var t = 2 * radius * Math.sin(i / 180 * Math.PI);
		var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
		var y = Math.sqrt(t ** 2 - x ** 2);
		context.beginPath();
		context.moveTo(2 * radius + centerY + x, y);
		context.lineTo(2 * radius + centerY - x, 2 * radius - y);
		context.stroke();
	}

	// South pole
    for (var i = 1; i < 10; i++) {
		context.beginPath();
		context.arc(4 * radius + centerY, centerY, radius * i / 9, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}
	
	for (var i = 0; i <= 180; i += 10) {
		var t = 2 * radius * Math.sin(i / 180 * Math.PI);
		var x = t * Math.sqrt(radius ** 2 - t ** 2 / 4) / radius;
		var y = Math.sqrt(t ** 2 - x ** 2);
		context.beginPath();
		context.moveTo(4 * radius + centerY + x, y);
		context.lineTo(4 * radius + centerY - x, 2 * radius - y);
		context.stroke();
	}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
    };
}