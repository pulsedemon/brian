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
		height: '300px
'	}
};*/

var timeout, fps, selected, BGposX, ctx, keyPressed, key_x, key_y, key_speed, interval, y_mouse_pos, x_mouse_pos, x_jet, y_jet, fire, jet_id;

BGposX = 0;
jet_id = document.getElementById("jet-container");
fire = document.getElementById('fire');

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

	requestAnimationFrame(draw_background);
	ctx.clearRect(0, 0, W, H);
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);
	if (Math.abs(BGposX) >= img.width) {
    	BGposX = 0;
	}
	
	BGposX -= 8;
})();

//---MOUSE CONTROLS
selected = null;

jet_id.onmousedown = function() {
	grab(this);
	return false;
}

function grab(jetContainer) {
	selected = jetContainer;
	x_jet = x_mouse_pos - selected.offsetLeft;
	y_jet = y_mouse_pos - selected.offsetTop;
}

function random_fire() {
	var fires = ['fire1.png', 'fire2.png'];
	return fires[Math.floor(Math.random() * fires.length)];
}


function move_plane(jetContainer) {
	var jet_positionX, jet_positionY;
	x_mouse_pos = jetContainer.pageX || window.event.clientX;
	y_mouse_pos = jetContainer.pageY || window.event.clientY;
	
	if (selected !== null) {
		//--this code prevents #jet-container from being moved out of view in the browser.
		jet_positionX = x_mouse_pos - x_jet;
		if(jet_positionX >= ctx.canvas.width - jet_id.offsetWidth) {
			jet_id.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
		}
		else if(jet_positionX <= 0) {
			jet_id.style.left = 0 + 'px';
		}
		else{
			jet_id.style.left = jet_positionX + 'px';
		}

		jet_positionY = y_mouse_pos - y_jet;
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
	selected = null;
}
document.onmousemove = move_plane;
document.onmouseup = let_go;


//---KEYBOARD CONTROLS
keyPressed = [];
window.onkeydown = function(input) {
	keyPressed[input.keyCode] = true;
}
window.onkeyup = function(input) {
	keyPressed[input.keyCode] = false;
}
jet_id.style.left = 200 + 'px';
jet_id.style.top = 200 + 'px';

key_speed = 5;
function update_keys() {
	key_x = parseInt(jet_id.style.left);
	key_y = parseInt(jet_id.style.top);

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

    //--this code prevents #jet-container from being moved out of view in the browser.
	if(key_x >= ctx.canvas.width - jet_id.offsetWidth) {
		key_x = ctx.canvas.width - jet_id.offsetWidth;
	}
	else if(key_x <= 0) {
		key_x = 0;
	}
	else{
		jet_id.style.left = key_x + 'px';
	}

	if(key_y >= ctx.canvas.height - jet_id.offsetHeight) {
		key_y = ctx.canvas.height - jet_id.offsetHeight;
	}
	else if(key_y <= 0) {
		key_y = 0;
	}
	else {
		jet_id.style.top = key_y + 'px';
	}
}
inerval = setInterval(update_keys, 1);

