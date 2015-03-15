var selected, W, H, BGposX, get_enemy, jet_id, thruster, canvas, ctx,
	speed_x, speed_y, enemy_wrapper, counter, select_enemy, canvas_wrapper,
	keyPressed, key_x, key_y, key_speed, y_mouse_pos, x_mouse_pos, x_jet, y_jet;

selected = null;
BGposX = 0;
jet_id = document.getElementById('jet-container');
thruster = document.getElementById('thruster');

function game_start() {
	draw_background();
}

canvas = document.getElementById('background-canvas');
	ctx = canvas.getContext('2d');
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
var img = new Image();
img.onload = function() {
}
img.src = 'skies.jpg';

W = window.innerWidth;
H = window.innerHeight;
var background_animframe;

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
	var timer = [1, 1, 2, 3, 4];
	return timer[Math.floor(Math.random() * timer.length)];
}

get_enemy = random_enemies();
spawn_timer = random_spawn();

enemy_wrapper = document.getElementById('enemy-wrapper');
counter = 0;

function push_enemy() {
	var create_enemy;
	counter ++;
	if(counter >= spawn_timer) {
		create_enemy = document.createElement('div');
		create_enemy.className = 'enemy';
		create_enemy.style.cssText = 'width: '+ get_enemy.w +'px; height:'+ get_enemy.h +'px; top:' + get_enemy.y_pos + 'px; left:' + get_enemy.x_pos + 'px;'; 
		enemy_wrapper.appendChild(create_enemy);
		get_enemy = random_enemies();
		spawn_timer = random_spawn();
		counter = 0;
	}
}
var push_interval = setInterval(push_enemy, 100);

function move_enemy() {
	select_enemy = document.querySelectorAll('.enemy');
	if(select_enemy.length > 0) {
		for(i = 0; i < select_enemy.length; i++) {

			//--ENEMY MOVEMENT
			enemy_posX = parseInt(select_enemy[i].style.left);
			enemy_posX -= 2;
			select_enemy[i].style.left = enemy_posX + 'px';
			if(parseInt(select_enemy[i].style.left) <= 0 - parseInt(select_enemy[i].style.width)) {
				enemy_wrapper.removeChild(select_enemy[i]);
			}
		}
	}	
}
var move_interval = setInterval(move_enemy, 1);
			
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
			game_over();
		}	
	}	
}
var collision_interval = setInterval(detect_collision, 100);

function jet_explosion() {
	var explosion;
	explosion = document.createElement('div');
	explosion.id = 'explosion';
	jet_id.appendChild(explosion);
}

function game_over() {
	clearInterval(move_interval);
	cancelAnimationFrame(background_animframe);
	clearInterval(push_interval);
	clearInterval(key_interval);
	jet_explosion();
	setTimeout (function() {
		clearInterval(collision_interval);
	}, 1000);
	// clearInterval(collision_interval);
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



