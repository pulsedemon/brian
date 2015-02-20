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
	var W, H, img;
	W = canvas.width;
	H = canvas.height;
	img = new Image();
	img.src = 'skies.jpg';

	window.requestAnimationFrame(draw_background);
	ctx.clearRect(0, 0, W, H);
	ctx.fillRect(0, 0, W, H);
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);
	if (Math.abs(BGposX) >= img.width) {
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
	return fires[Math.floor(Math.random() * fires.length)];5
}

fire = document.getElementById('fire');

function move_plane(jetContainer) {
	var jet_positionX, jet_positionY;
	x_pos = jetContainer.pageX || window.event.clientX;
	y_pos = jetContainer.pageY || window.event.clientY;
	if (selected !== null) {

		// this code prevents jetContainer from being moved out of view in the browser.
		jet_positionX = x_pos - x_element;
		if(jet_positionX >= ctx.canvas.width - jet_id.offsetWidth) {
			selected.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
		}
		else if(jet_positionX <= 0) {
			selected.style.left = 0 + 'px';
		}
		else{
			selected.style.left = jet_positionX + 'px';
		}

		jet_positionY = y_pos - y_element;
		if(jet_positionY >= ctx.canvas.height - jet_id.offsetHeight) {
			selected.style.top = ctx.canvas.height - jet_id.offsetHeight + 'px';
		}
		else if(jet_positionY <= 0) {
			selected.style.top = 0 + 'px';
		}
		else {
		selected.style.top = jet_positionY + 'px';
		}

		fire.style.cssText += 'background: url(' + random_fire() + '), url("fire3-tiny.png");';
	}	
}

function let_go() {
	selected = null;
}

document.onmousemove = move_plane;
document.onmouseup = let_go;
