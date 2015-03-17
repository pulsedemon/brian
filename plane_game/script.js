var	img, img_explosion, img_fire1, img_fire2, img_fire3, img_jet,
	background_animframe, enemy_animframe,
	get_enemy,
	selected, W, H, BGposX, jet_id, thruster, canvas, ctx,
	speed_x, speed_y, enemy_wrapper, counter, select_enemy, canvas_wrapper,
	keyPressed, key_speed, y_mouse_pos, x_mouse_pos, x_jet, y_jet;

img = new Image();
img.onload = function() {
}
img.src = 'skies.jpg';

img_explosion = new Image();
img_explosion.onload = function() {
}
img_explosion.src = 'explosion.png';

img_fire1 = new Image();
img_fire1.onload = function() {
}
img_fire1.src = 'fire1.png';

img_fire2 = new Image();
img_fire2.onload = function() {
}
img_fire2.src = 'fire2.png';

img_fire3 = new Image();
img_fire3.onload = function() {
}
img_fire3.src = 'fire3-tiny.png';

img_jet = new Image();
img_jet.onload = function() {
}
img_jet.src = 'jet.png';

selected = null;
BGposX = 0;
jet_id = document.getElementById('jet-container');
thruster = document.getElementById('thruster');

/*function game_start() {
	draw_background();
}*/

canvas = document.getElementById('background-canvas');
	ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	

W = window.innerWidth;
H = window.innerHeight;

function draw_background() {
	background_animframe = requestAnimationFrame(draw_background);
	ctx.clearRect(0, 0, W, H);
	ctx.drawImage(img, BGposX, 0);
	ctx.drawImage(img, img.width-Math.abs(BGposX), 0);

	if (Math.abs(BGposX) === img.width) {
    	BGposX = 0;
	}
	BGposX -= 8;
}
draw_background();

//---ENEMY CREATOR-------//
var enemy1, enemy2, enemy3, enemy4;

function enemies(w, h) {
	this.w = w;
	this.h = h;
	this.x_pos = window.innerWidth;
}

enemy1 = new enemies(200, 100);
enemy2 = new enemies(250, 150);
enemy3 = new enemies(150, 200);
enemy4 = new enemies(100, 300);

function random_y_pos() {
	var y_pos = [10, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
	return y_pos[Math.floor(Math.random() * y_pos.length)];
}

function random_enemies() {
	var enemy = [enemy1, enemy2, enemy3, enemy4];
	return enemy[Math.floor(Math.random() * enemy.length)];
}

function random_spawn() {
	var timer = [1, 2, 3];
	return timer[Math.floor(Math.random() * timer.length)];
}

get_enemy = random_enemies();

enemy_wrapper = document.getElementById('enemy-wrapper');
counter = 0;

function push_enemy() {
	var create_enemy;
	counter ++;
	if(counter >= random_spawn()) {
		create_enemy = document.createElement('div');
		create_enemy.className = 'enemy';
		create_enemy.style.cssText = 'width: '+ get_enemy.w +'px; height:'+ get_enemy.h +'px; top:' + random_y_pos() + 'px; left:' + get_enemy.x_pos + 'px;'; 
		enemy_wrapper.appendChild(create_enemy);
		get_enemy = random_enemies();
		random_spawn();
		counter = 0;
	}
}
var push_interval = setInterval(push_enemy, 200);

function move_enemy() {
	var enemy_x_pos, enemy_y_pos;
	enemy_animframe = requestAnimationFrame(move_enemy);
	select_enemy = document.querySelectorAll('.enemy');
	if(select_enemy.length > 0) {
		for(i = 0; i < select_enemy.length; i++) {
			enemy_x_pos = parseInt(select_enemy[i].style.left);
			enemy_x_pos -= 15;
			select_enemy[i].style.left = enemy_x_pos + 'px';
			if(parseInt(select_enemy[i].style.left) <= 0 - parseInt(select_enemy[i].style.width)) {
				enemy_wrapper.removeChild(select_enemy[i]);
			}

			/*enemy_y_pos = parseInt(select_enemy[i].style.top);
			select_enemy[i].style.top = enemy_y_pos + 'px';
			if(parseInt(select_enemy[i].style.top) >= 2) {
				enemy_y_pos -= 2;
				select_enemy[i].style.top = enemy_y_pos + 'px';	
				if(parseInt(select_enemy[i].style.top) <= 0) {
					enemy_y_pos = parseInt(select_enemy[i].style.top);
					enemy_y_pos += 2;
					select_enemy[i].style.top = enemy_y_pos + 'px';
				}
			}*/	
		}
	}	
}
move_enemy();
			
//---COLLISION DETECTION
function detect_collision() {
	var enemy_x, enemy_y, enemy_w, enemy_h, jet_x, jet_y, jet_w, jet_y, explosion;
	select_enemy = document.querySelectorAll('.enemy');
	for(i = 0; i < select_enemy.length; i++) {
		enemy_x = parseInt(select_enemy[i].style.left);
		enemy_y = parseInt(select_enemy[i].style.top);
		enemy_w = select_enemy[i].offsetWidth;
		enemy_h = select_enemy[i].offsetHeight;

		jet_x = parseInt(jet_id.style.left);
		jet_y = parseInt(jet_id.style.top);
		jet_w = jet_id.offsetWidth;
		jet_h = jet_id.offsetHeight;

		counter = 0;

		if(enemy_x < (jet_x + jet_w) &&
		(enemy_x + enemy_w) > jet_x &&
		enemy_y < (jet_y + jet_h) &&
		(enemy_h + enemy_y) > jet_y) {
			select_enemy[i].id = 'enemy-hidden';
			explosion = document.createElement('div');
			explosion.id = 'explosion-enemy';
			select_enemy[i].appendChild(explosion);
			selected = null;
			game_over();
		}	
	}	
}
var collision_interval = setInterval(detect_collision, 10);

function jet_explosion() {
	var explosion;
	explosion = document.createElement('div');
	explosion.id = 'explosion';
	jet_id.appendChild(explosion);
}

function game_over() {
	setTimeout (function() {
		jet_explosion();
	}, 200);

	setTimeout (function() {
		clearInterval(collision_interval);
	}, 1000);

	cancelAnimationFrame(background_animframe);
	cancelAnimationFrame(enemy_animframe);
	clearInterval(push_interval);
	clearInterval(key_interval);

	jet_id.onmousedown = function() {
		return false;
	}
	document.ontouchmove = function() {
		return false;
	}
}

//---KEYBOARD CONTROLS
function random_thruster_img() {
	var thrusters = ['fire1.png', 'fire2.png'];
	return thrusters[Math.floor(Math.random() * thrusters.length)];
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
	var key_x, key_y;
	key_x = parseInt(jet_id.style.left);
	key_y = parseInt(jet_id.style.top);

	thruster.style.cssText += 'background: url(' + random_thruster_img() + '), url("fire3-tiny.png");';

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

    //--MOVEMENT PARAMETERS.
	if(key_x >= ctx.canvas.width - jet_id.offsetWidth) {
		jet_id.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
	}
	else if(key_x <= 0) {
		jet_id.style.left = 0;
	}
	else{
		jet_id.style.left = key_x + 'px';
	}

	if(key_y >= ctx.canvas.height - jet_id.offsetHeight) {
		jet_id.style.top = ctx.canvas.height - jet_id.offsetHeight + 'px';
	}
	else if(key_y <= 0) {
		jet_id.style.top = 0;
	}
	else {
		jet_id.style.top = key_y + 'px';
	}
}

var key_interval = setInterval(update_keys, 1);

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
	
	//--MOVEMENT PARAMETERS
	if (selected !== null) {
		jet_positionX = x_mouse_pos - x_jet;
		if(jet_positionX >= ctx.canvas.width - jet_id.offsetWidth) {
			jet_id.style.left = ctx.canvas.width - jet_id.offsetWidth + 'px';
		}
		else if(jet_positionX <= 0) {
			jet_id.style.left = 0;
		}
		else{
			jet_id.style.left = jet_positionX + 'px';
		}

		jet_positionY = y_mouse_pos - y_jet;
		if(jet_positionY >= ctx.canvas.height - jet_id.offsetHeight) {
			jet_id.style.top = ctx.canvas.height - jet_id.offsetHeight + 'px';
		}
		else if(jet_positionY <= 0) {
			jet_id.style.top = 0;
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

//---TOUCH SCREEN CONTROLS
function touch_move(jetContainer) {
	if(jetContainer.touches.length === 1) {
		var touch;
		touch = jetContainer.touches[0];
		jet_id.style.left = touch.pageX + 'px';
		jet_id.style.top = touch.pageY + 'px';	
	}
}

document.ontouchmove = touch_move;
/*jet_id.ontouchmove = function(jetContainer) {
	if(jetContainer.touches.length === 1) {
		var touch;
		touch = jetContainer.touches[0];
		jet_id.style.left = touch.pageX + 'px';
		jet_id.style.top = touch.pageY + 'px';	
	}
}*/




