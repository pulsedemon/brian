var selected, x_pos, y_pos, x_element, y_element, fire, jet_id;

selected = null;

jet_id = document.getElementById("jet-container");

jet_id.onmousedown = function() {
	grab(this);
	return false;
}

function grab(jetContainer) {
	selected = jetContainer;
	x_element = x_pos - selected.offsetLeft;
	y_element = y_pos - selected.offsetTop;
}

function random_fire() {
	var fires = ['fire1.png', 'fire2.png'];
	return fires[Math.floor(Math.random() * fires.length)];
	console.log(fires);
}

fire = document.getElementById('fire');

function move_plane(jetContainer) {
	x_pos = jetContainer.pageX || window.event.clientX;
	y_pos = jetContainer.pageY || window.event.clientY;
	if (selected !== null) {
		selected.style.left = (x_pos - x_element) + 'px';
		selected.style.top = (y_pos - y_element) + 'px';
		fire.style.cssText += 'background: url(' + random_fire() + '), url("fire3-tiny.png");';
	}	
}

function let_go() {
	selected = null;
	fire.style.cssText = 'background: url("fire3-tiny.png");';
}

document.onmousemove = move_plane;
document.onmouseup = let_go;
