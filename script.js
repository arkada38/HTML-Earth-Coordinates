//Longitude is a geographic coordinate that specifies the east-west position of a point on the Earth's surface.
//Latitude is a geographic coordinate that specifies the north–south position of a point on the Earth's surface.

var side, canvas, context, mouseX, mouseY, radius, canvasMargin;

let azimuthal, northern, southern, western, eastern;

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

	azimuthal.side = size;
	northern.side = size;
	southern.side = size;
	western.side = size;
	eastern.side = size;

	azimuthal.radius = azimuthal.side / 2 - canvasMargin;
	northern.radius = northern.side / 2 - canvasMargin;
	southern.radius = southern.side / 2 - canvasMargin;
	western.radius = western.side / 2 - canvasMargin;
	eastern.radius = eastern.side / 2 - canvasMargin;
	
	azimuthal.canvas.style.width = styleSize;
	northern.canvas.style.width = styleSize;
	southern.canvas.style.width = styleSize;
	western.canvas.style.width = styleSize;
	eastern.canvas.style.width = styleSize;

	azimuthal.canvas.style.height = styleSize;
	northern.canvas.style.height = styleSize;
	southern.canvas.style.height = styleSize;
	western.canvas.style.height = styleSize;
	eastern.canvas.style.height = styleSize;

    draw();
};

function initHemispheres(size) {
	let styleSize = Math.round(size / window.devicePixelRatio) + 'px';

    azimuthal = {
		canvas: document.getElementById('cv_azimuthal'),
		context: document.getElementById('cv_azimuthal').getContext('2d'),
		side: size,
		radius: size / 2 - canvasMargin,
		steps: 18
	};
	azimuthal.canvas.style.width = styleSize;
	azimuthal.canvas.style.height = styleSize;
	
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
}

function addMouseMoveListener() {
    azimuthal.canvas.addEventListener('mousemove', function(evt) {
		let mousePos = getMousePos(azimuthal.canvas, evt);
		let coordinates = getCoordinates(azimuthal, mousePos);
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
}

function drawPoleGrid(map) {
	let context = map.context;
	let radius = map.radius - canvasMargin;
	let steps = map.steps;

	// Latitudes (окружности)
	for (let i = 1; i <= steps; i++) {
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

function drawHemisphereGrid(map) {
	let context = map.context;
	let radius = map.radius - canvasMargin;
	let steps = map.steps;

	context.beginPath();

	// Окружность сферы
	context.arc(radius + canvasMargin, radius + canvasMargin,
		radius, 0, 2 * Math.PI, false);
	context.lineWidth = 1;
	context.strokeStyle = '#003300';

	// Вертикаль
	context.moveTo(radius + canvasMargin, canvasMargin);
	context.lineTo(radius + canvasMargin, 2 * radius + canvasMargin);

	context.stroke();
	context.closePath();

	// Longitudes (дуги)
	for (let i = 1; i < steps / 2; i++) {
		// Длина хорды (расстояние между полюсами)
		let t = 2 * radius;
		// Высота сегмента
		let hs = t * i / steps;
		// Радиус окружности, дающей дугу
		let r = hs / 2 + t ** 2 / 8 / hs;
		// Высота равнобедренного треугольника
		// Расстояние до центра окружности
		let h = Math.sqrt(r ** 2 - t ** 2 / 4)

		let alfa = Math.asin(t * (azimuthal.steps - 2) / azimuthal.steps / 2 / r);

		// Левая часть
		context.beginPath();
		context.arc(radius + canvasMargin + h, radius + canvasMargin,
			r, Math.PI - alfa, Math.PI + alfa, false);
		context.stroke();
		context.closePath();

		// Правая часть
		context.beginPath();
		context.arc(radius + canvasMargin - h, radius + canvasMargin,
			r, 2 * Math.PI - alfa, 2 * Math.PI + alfa, false);
		context.stroke();
		context.closePath();
	}

	steps = azimuthal.steps;
	// Latitudes (горизонтальные линии)
	for (let i = 1; i < steps; i++) {
		// Высота сегмента
		let h = 2 * radius * i / steps;
		// Длина хорды
		t = Math.sqrt(h * (8 * radius - 4 * h));

		context.beginPath();

		context.moveTo(canvasMargin + radius - t / 2, h + canvasMargin);
		context.lineTo(canvasMargin + radius + t / 2, h + canvasMargin);

		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}
}

function draw() {
	azimuthal.context.canvas.width = azimuthal.side;
	azimuthal.context.canvas.height = azimuthal.side;

	northern.context.canvas.width = northern.side;
	northern.context.canvas.height = northern.side;

	southern.context.canvas.width = southern.side;
	southern.context.canvas.height = southern.side;

	western.context.canvas.width = western.side;
	western.context.canvas.height = western.side;

	eastern.context.canvas.width = eastern.side;
	eastern.context.canvas.height = eastern.side;

	// Azimuthal equidistant
	drawPoleGrid(azimuthal);
	// Northern hemisphere
	drawPoleGrid(northern);
	// Southern hemisphere
	drawPoleGrid(southern);
	// Western hemisphere
	drawHemisphereGrid(western);
	// Eastern hemisphere
	drawHemisphereGrid(eastern);
	
	drawPoint(13.750, -100.517, 'red');
	drawPoint(55.75, -37.833, 'green');
	drawPoint(-33.8861, 151.263, 'green');
	drawPoint(-33.3960395, 18.8309002, 'green');
	drawPoint(-34.6156537, -58.5737505, 'green');
	/*drawPoint(60, 40, 'red');
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
	drawPoint(-90, 0, 'brown');*/
}

function drawPoint(latitude, longitude, colour) {
	var k, t, x, y;
	/*
	k - расстояние от полюса к координате
	t - хорда
	*/
	
	latitude = Math.min(Math.max(-90, latitude), 90);
	longitude = Math.min(Math.max(-180, longitude), 180);
	
	if (longitude < -90) longitude += 360;
	
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
	context.arc(radius + x + canvasMargin + .5,
		y + radius - k + canvasMargin + .5, 3, 0, 2 * Math.PI, false);
	context.lineWidth = 1;
	context.strokeStyle = colour;
	context.stroke();
	context.closePath();
	
	if (0 <= latitude && latitude <= 90) {
		// Northern hemisphere
		context = northern.context;
		radius = northern.radius - canvasMargin;
		
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
		// Southern hemisphere
		context = southern.context;
		radius = southern.radius - canvasMargin;

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
	
	if (0 <= longitude && longitude <= 180) {
		// Western hemispere
		context = western.context;
		radius = western.radius - canvasMargin;
		
		let t1 = 2 * radius;
		let h1 = radius * Math.abs(longitude - 90) / 90;
		let r = h1 / 2 + t1 ** 2 / 8 / h1;
		let t2 = t1 * Math.abs(latitude) / 90;
		let h2 = r - Math.sqrt(r ** 2  - t2 ** 2 / 4);
		if (longitude < 90) h2 = -h2;
		
		x = t1 - t1 * longitude / 180 + h2;
		y = t1 - t1 * (latitude + 90) / 180;
		
		context.beginPath();
		context.arc(x + canvasMargin,
			y + canvasMargin, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
	
	if (longitude > 180) longitude -= 360;
	
	if (-180 <= longitude && longitude <= 0) {
		// Eastern hemispere
		context = eastern.context;
		radius = eastern.radius - canvasMargin;
		
		let t1 = 2 * radius;
		let h1 = radius * Math.abs(longitude + 90) / 90;
		let r = h1 / 2 + t1 ** 2 / 8 / h1;
		let t2 = t1 * Math.abs(latitude) / 90;
		let h2 = r - Math.sqrt(r ** 2  - t2 ** 2 / 4);
		if (longitude > -90) h2 = -h2;
		
		x = -t1 * longitude / 180 - h2;
		y = t1 - t1 * (latitude + 90) / 180;
		
		context.beginPath();
		context.arc(x + canvasMargin,
			y + canvasMargin, 3, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
	}
}

function getCoordinates(map, mousePos) {
	// Расстояние от центра по горизонтали
	let x = mousePos.x * window.devicePixelRatio - map.radius + canvasMargin;
	// Расстояние от центра по вертикали
	let y = mousePos.y * window.devicePixelRatio - map.radius + canvasMargin;

	let latitude, longitude;
	
	if (map == northern) {
		// Расстояние от центра до точки (широта)
		latitude = 90 - Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 90;

		// Угол (долгота)
		longitude = 90 - Math.atan(x / -y) / Math.PI * 180;
		if (y > 0) longitude = longitude - 180;
	}
	
	if (map == southern) {
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
	
	if (map == western) {
		// По вертикали (широта)
		latitude = -90 * y / map.radius;

		// По горизонтали (долгота)
		// Поиск центра окружности по 3 точкам
		// (через пересечение перпендикуляров)
		// Коэффициент наклона первой прямой
		let ma = (map.radius + y) / x;
		// Коэффициент наклона второй прямой
		let mb = -(map.radius - y) / x;
		// Расстояние от центра полушария до радиуса
		let rx = (ma * mb * (-2 * map.radius) + (mb - ma) * x) / 2 / (mb - ma);
		// Радиус дуги долготы
		let r = Math.sqrt(y ** 2 + (x - rx) ** 2);

		let b = r - Math.abs(rx);
		if ( x > 0) b = -b;

		longitude = 90 + (b / map.radius) * 90;
	}
	
	if (map == eastern) {
		// По вертикали (широта)
		latitude = -90 * y / map.radius;

		// По горизонтали (долгота)

		// Поиск центра окружности по 3 точкам
		// (через пересечение перпендикуляров)

		// Коэффициент наклона первой прямой
		let ma = (map.radius + y) / x;
		// Коэффициент наклона второй прямой
		let mb = -(map.radius - y) / x;
		// Расстояние от центра полушария до радиуса
		let rx = (ma * mb * (-2 * map.radius) + (mb - ma) * x) / 2 / (mb - ma);
		// Радиус дуги долготы
		let r = Math.sqrt(y ** 2 + (x - rx) ** 2);

		let b = r - Math.abs(rx);
		if ( x > 0) b = -b;

		longitude = -90 + (b / map.radius) * 90;
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
