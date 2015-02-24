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

var selected, BGposX, ctx, keyPressed, key_x, key_y, key_speed, interval, x_mousePos, y_mousePos, x_jet, y_jet, fire, jet_id;

BGposX = 0;
jet_id = document.getElementById("jet-container");

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
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);
	if (Math.abs(BGposX) >= img.width) {
    	BGposX = 0;
	}
	
	BGposX -= 8;
})();

//---KEYBOARD CONTROLS
keyPressed = [];
window.onkeydown = function(input) {
	console.log(input.keyCode);
	keyPressed[input.keyCode] = true;
}
window.onkeyup = function(input) {
	keyPressed[input.keyCode] = false;
}

key_x = jet_id.style.left;
key_y = jet_id.style.top;
key_speed = 5;

function updateKeys() {
	fire.style.cssText += 'background: url(' + random_fire() + '), url("fire3-tiny.png");';

	//--LEFT
	if (keyPressed[37] || keyPressed[65]) {
        key_x -= key_speed;
	}
	//--RIGHT
    if (keyPressed[39] || keyPressed[68]) {
        key_x += key_speed;
    }
    //--UP
    if (keyPressed[38] || keyPressed[87]) {
        key_y -= key_speed;
    }
    //--DOWN
    if (keyPressed[40] || keyPressed[83]) {
        key_y += key_speed;
    }

    //--this code prevents jetContainer from being moved out of view in the browser.
	if(key_x >= ctx.canvas.width - jet_id.offsetWidth) {
		jet_id.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
		key_x = ctx.canvas.width - jet_id.offsetWidth;
	}
	else if(key_x <= 0) {
		jet_id.style.left = 0 + 'px';
		key_x = 0;
	}
	else{
		jet_id.style.left = key_x + 'px';
	}

	if(key_y >= ctx.canvas.height - jet_id.offsetHeight) {
		jet_id.style.top = ctx.canvas.height - jet_id.offsetHeight + 'px';
		key_y = ctx.canvas.height - jet_id.offsetHeight;
	}
	else if(key_y <= 0) {
		jet_id.style.top = 0 + 'px';
		key_y = 0;
	}
	else {
		jet_id.style.top = key_y + 'px';
	}	
}
interval = setInterval(updateKeys, 1);


//---MOUSE CONTROLS
selected = null;

jet_id.onmousedown = function() {
	clearInterval(interval);
	grab(this);
	return false;
}

function grab(jetContainer) {
	selected = jetContainer;
	x_jet = x_mousePos - selected.offsetLeft;
	y_jet = y_mousePos - selected.offsetTop;
}

function random_fire() {
	var fires = ['fire1.png', 'fire2.png'];
	return fires[Math.floor(Math.random() * fires.length)];
}

fire = document.getElementById('fire');

function move_plane(jetContainer) {
	var jet_positionX, jet_positionY, input;
	x_mousePos = jet_id.pageX || window.event.clientX;
	y_mousePos = jet_id.pageY || window.event.clientY;
	
	if (selected !== null) {
		fire.style.cssText += 'background: url(' + random_fire() + '), url("fire3-tiny.png");';

		//--this code prevents jetContainer from being moved out of view in the browser.
		jet_positionX = x_mousePos - x_jet;
		if(jet_positionX >= ctx.canvas.width - jet_id.offsetWidth) {
			jet_id.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
		}
		else if(jet_positionX <= 0) {
			jet_id.style.left = 0 + 'px';
		}
		else{
			jet_id.style.left = jet_positionX + 'px';
		}

		jet_positionY = y_mousePos - y_jet;
		if(jet_positionY >= ctx.canvas.height - jet_id.offsetHeight) {
			jet_id.style.top = ctx.canvas.height - jet_id.offsetHeight + 'px';
		}
		else if(jet_positionY <= 0) {
			jet_id.style.top = 0 + 'px';
		}
		else {
			jet_id.style.top = jet_positionY + 'px';
		}
	}
}

function let_go() {
	if(selected !== null) {
		interval = setInterval(updateKeys, 1);
	}
	selected = null;
}
document.onmousemove = move_plane;
document.onmouseup = let_go;


