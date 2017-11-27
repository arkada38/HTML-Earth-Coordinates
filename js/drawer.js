'use strict';

var drawPoleGrid = function(map) {
	let context = map.context;
	let radius = map.radius - canvasMargin;
	let steps = map.steps;

	context.globalAlpha = .5;

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
	
	context.globalAlpha = 1;
};

var drawHemisphereGrid = function(map) {
	let context = map.context;
	let radius = map.radius - canvasMargin;
	let steps = map.steps;

	context.globalAlpha = .5;
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

		let alfa = Math.asin(t * (nothern_azimuthal.steps - 2) / nothern_azimuthal.steps / 2 / r);

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

	steps = nothern_azimuthal.steps;
	// Latitudes (горизонтальные линии)
	for (let i = 1; i < steps; i++) {
		// Высота сегмента
		let h = 2 * radius * i / steps;
		// Длина хорды
		let t = Math.sqrt(h * (8 * radius - 4 * h));

		context.beginPath();

		context.moveTo(canvasMargin + radius - t / 2, h + canvasMargin);
		context.lineTo(canvasMargin + radius + t / 2, h + canvasMargin);

		context.lineWidth = 1;
		context.strokeStyle = '#003300';
		context.stroke();
		context.closePath();
	}

	context.globalAlpha = 1;
};

var getCoordinates = function(map, mousePos) {
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
	
	if (map == nothern_azimuthal) {
		// Расстояние от центра до точки (широта)
		latitude = 90 - Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 180;

		// Угол (долгота)
		longitude = 90 - Math.atan(x / -y) / Math.PI * 180;
		if (y > 0) longitude = longitude - 180;
	}
	
	if (map == southern_azimuthal) {
		// Расстояние от центра до точки (широта)
		latitude = -90 + Math.sqrt(x ** 2 + y ** 2) /
			map.radius * 180;

		// Угол (долгота)
		longitude = 90 + Math.atan(x / -y) / Math.PI * 180;
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

		longitude = (1 - b / map.radius) * 90;
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

		longitude = (-1 - b / map.radius) * 90;
	}

	return {
		latitude: latitude,
		longitude: longitude
	};
};

var drawPoint = function(latitude, longitude, colour, title = '') {
	let k, t, x, y;
	/*
	k - расстояние от полюса к координате
	t - хорда
	*/

	let pointSize = 3 * window.devicePixelRatio;
	
	latitude = Math.min(Math.max(-90, latitude), 90);
	longitude = Math.min(Math.max(-180, longitude), 180);
	
	if (longitude < -90) longitude += 360;
	
	//#region Nothern azimuthal equidistant
	context = nothern_azimuthal.context;
	radius = nothern_azimuthal.radius - canvasMargin;
	
    k = radius * (90 - latitude) / 180;
	t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
	x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
	y = Math.sqrt(t ** 2 - x ** 2);
	
	drawPolePointAndTitle();
	//#endregion
	
	//#region Southern azimuthal equidistant
	context = southern_azimuthal.context;
	radius = southern_azimuthal.radius - canvasMargin;
	
    k = radius * (90 + latitude) / 180;
	t = 2 * k * Math.sin((longitude - 90) / 360 * Math.PI);
	x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
	y = Math.sqrt(t ** 2 - x ** 2);
	
	drawPolePointAndTitle();
	//#endregion
	
	//#region Northern hemisphere
	if (0 <= latitude && latitude <= 90) {
		context = northern.context;
		radius = northern.radius - canvasMargin;
		
		k = radius * (1 - (latitude / 90));
		t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		drawPolePointAndTitle();
	}
	//#endregion
	
	//#region Southern hemisphere
	if (-90 <= latitude && latitude <= 0) {
		context = southern.context;
		radius = southern.radius - canvasMargin;

		k = radius * (1 + (latitude / 90));
		t = 2 * k * Math.sin((longitude - 90) / 360 * Math.PI);
		x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
		y = Math.sqrt(t ** 2 - x ** 2);
	
		drawPolePointAndTitle();
	}
	//#endregion
	
	//#region Western hemispere
	if (0 <= longitude && longitude <= 180) {
		context = western.context;
		radius = western.radius - canvasMargin;
		
		let t1 = 2 * radius;
		let h1 = radius * Math.abs(longitude - 90) / 90;
		let r = h1 / 2 + t1 ** 2 / 8 / h1;
		let t2 = t1 * Math.abs(latitude) / 90;
		let h2 = r - Math.sqrt(r ** 2  - t2 ** 2 / 4);
		if (longitude < 90) h2 = -h2;
		
		x = t1 * longitude / 180 - h2;
		y = t1 - t1 * (latitude + 90) / 180;
		
		drawPointAndTitle();
	}
	//#endregion
	
	if (longitude > 180) longitude -= 360;
	
	//#region Eastern hemispere
	if (-180 <= longitude && longitude <= 0) {
		context = eastern.context;
		radius = eastern.radius - canvasMargin;
		
		let t1 = 2 * radius;
		let h1 = radius * Math.abs(longitude + 90) / 90;
		let r = h1 / 2 + t1 ** 2 / 8 / h1;
		let t2 = t1 * Math.abs(latitude) / 90;
		let h2 = r - Math.sqrt(r ** 2  - t2 ** 2 / 4);
		if (longitude > -90) h2 = -h2;
		
		x = t1 * (180 + longitude) / 180 + h2;
		y = t1 - t1 * (latitude + 90) / 180;
		
		drawPointAndTitle();
	}
	//#endregion

	function drawPolePointAndTitle() {
		if (isNaN(x)) {
			x = 0;
			y = 0;
		}
	
		context.beginPath();
		context.arc(radius + x + canvasMargin,
			y + radius - k + canvasMargin, pointSize, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
		
		context.font = "20px Arial";
		context.fillStyle = colour;
		context.textAlign = "center";
		context.fillText(title, radius + x + canvasMargin,
			y + radius - k + canvasMargin - pointSize * 2);
	}

	function drawPointAndTitle() {
		context.beginPath();
		context.arc(x + canvasMargin,
			y + canvasMargin, pointSize, 0, 2 * Math.PI, false);
		context.lineWidth = 1;
		context.strokeStyle = colour;
		context.stroke();
		context.closePath();
		
		context.font = "20px Arial";
		context.fillStyle = colour;
		context.textAlign = "center";
		context.fillText(title, x + canvasMargin,
			y + canvasMargin - pointSize * 2);
	}
};

var drawArea = function(points, fillColour, strokeColour = 'rgba(0,0,0,.5)') {
    //#region Nothern azimuthal equidistant
    context = nothern_azimuthal.context;
    radius = nothern_azimuthal.radius - canvasMargin;
        
    context.beginPath();

    for (let i = 0; i < points.length; i++) {
        let k, t, x, y;
        /*
        k - расстояние от полюса к координате
        t - хорда
        */
        
        let latitude = Math.min(Math.max(-90, points[i][0]), 90);
        let longitude = Math.min(Math.max(-180, points[i][1]), 180);
        
        if (longitude < -90) longitude += 360;
        
        k = radius * (90 - latitude) / 180;
        t = 2 * k * Math.cos((longitude + 90) / 360 * Math.PI);
        x = t * Math.sqrt(k ** 2 - t ** 2 / 4) / k;
        y = Math.sqrt(t ** 2 - x ** 2);
        
        if (i === 0) context.moveTo(radius + x + canvasMargin, y + radius - k + canvasMargin);
        else context.lineTo(radius + x + canvasMargin, y + radius - k + canvasMargin);
    }

    context.closePath();
    context.fillStyle = fillColour;
    context.fill();
    context.strokeStyle = strokeColour;
    context.stroke();
    //#endregion
};
