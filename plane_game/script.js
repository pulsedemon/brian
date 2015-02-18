/*var blocks = {
	block1: {
		width: '100px',
		height: '50px'
	},
	block2: {
		width: '50px',
		height: '50px'
	},
	block3: {
		width: '150px',
		height: '200px'
	},
	blockk4: {
		width: '100px',
		height: '300px'
	}
};*/

var selected, BGposX, ctx, x_pos, y_pos, x_element, y_element, fire, jet_id;

selected = null;

BGposX = 0;


canvas = document.getElementById('background-canvas');
ctx = canvas.getContext('2d');
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

(function draw_background() {
	var img, W, H;
	W = canvas.width;
	H = canvas.height;
	img = new Image();
	img.src = 'skies.jpg';

	window.requestAnimationFrame(draw_background);
	ctx.clearRect(0, 0, W, H);
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);

	if (Math.abs(BGposX) > img.width) {
    	BGposX = 0;
	}
	
	BGposX -= 8;
})();

/*function random_objects() {
	var objects = ['blocks.block1', 'blocks.block2', 'blocks.block3', 'blocks.block4'];
	return [Math.floor(Math.random() * objects.length)]
}*/

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
}

document.onmousemove = move_plane;
document.onmouseup = let_go;
