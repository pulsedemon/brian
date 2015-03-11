var selected, W, H, BGposX, get_enemy, jet_id, fire, canvas, ctx,
	speed_x, speed_y, enemy_wrapper,
	keyPressed, key_x, key_y, key_speed, y_mouse_pos, x_mouse_pos, x_jet, y_jet;

selected = null;
BGposX = 0;
jet_id = document.getElementById('jet-container');
fire = document.getElementById('fire');

canvas = document.getElementById('background-canvas');
	ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
(function draw_background() {
	var img;
	img = new Image();
	img.src = 'skies.jpg';
	
	W = canvas.width;
	H = canvas.height;

	requestAnimationFrame(draw_background);
	ctx.clearRect(0, 0, W, H);
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);

	if (Math.abs(BGposX) >= img.width) {
    	BGposX = 0;
	}

	BGposX -= 8;
})();


//---ENEMY CREATOR-------//
var enemies = {
	enemy1: {
		w: 100,
		h: 50,
		y_pos: 400,
		x_pos: window.innerWidth,
	},
	enemy2: {
		w: 50,
		h: 50,
		y_pos: 100,
		x_pos: window.innerWidth,
	},
	enemy3: {
		w: 150,
		h: 200,
		y_pos: 100,
		x_pos: window.innerWidth,		
	},
	enemy4: {
		w: 100,
		h: 300,
		y_pos: 300,
		x_pos: window.innerWidth,		
	},
};

function random_enemies() {
	var enemy = [enemies.enemy1, enemies.enemy2, enemies.enemy3, enemies.enemy4];
	return enemy[Math.floor(Math.random() * enemy.length)];
}

function random_spawn() {
	var timer = [300, 1420, 1800];
	return timer[Math.floor(Math.random() * timer.length)];
}

speed_x = 3;
speed_y = 3; 

get_enemy = random_enemies();

enemy_wrapper = document.getElementById('enemy-wrapper');

function push_enemy() {
	var create_enemy;
	create_enemy = document.createElement('div');
	create_enemy.className = 'enemy';
	create_enemy.style.cssText = 'width: '+ get_enemy.w +'px; height:'+ get_enemy.h +'px; top:' + get_enemy.y_pos + 'px; left:' + get_enemy.x_pos + 'px;'; 
	enemy_wrapper.appendChild(create_enemy);
	get_enemy = random_enemies();
}
setInterval(push_enemy, random_spawn());

function enemy_init() {
	select_enemy = document.querySelectorAll('.enemy');
	if(select_enemy.length > 0) {
		for(i = 0; i < select_enemy.length; i++) {

			//--ENEMY MOVEMENT
			enemy_posX = parseInt(select_enemy[i].style.left);
			enemy_posX -= 3;
			select_enemy[i].style.left = enemy_posX + 'px';
			if(parseInt(select_enemy[i].style.left) <= 0 - parseInt(select_enemy[i].style.width)) {
				enemy_wrapper.removeChild(select_enemy[i]);
			}
		}
	}	
}

setInterval(enemy_init, 1);

//---KEYBOARD CONTROLS
function random_thruster_img() {
	var fires = ['fire1.png', 'fire2.png'];
	return fires[Math.floor(Math.random() * fires.length)];
}

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

	fire.style.cssText += 'background: url(' + random_thruster_img() + '), url("fire3-tiny.png");';

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

setInterval(update_keys, 1);

//---MOUSE CONTROLS
jet_id.onmousedown = function() {
	grab(this);
	return false;
}

function grab(jetContainer) {
	selected = jetContainer;
	x_jet = x_mouse_pos - jetContainer.offsetLeft;
	y_jet = y_mouse_pos - jetContainer.offsetTop;
}

function move_plane(jetContainer) {
	var jet_positionX, jet_positionY;
	x_mouse_pos = jetContainer.pageX || jetContainer.clientX;
	y_mouse_pos = jetContainer.pageY || jetContainer.clientY;
	
	//--this code prevents #jet-container from being moved out of view in the browser.
	if (selected !== null) {
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



