var	img, img_explosion, img_fire1, img_fire2, img_fire3, img_jet,
	W, H, BGposX, jet_id, thruster, canvas, ctx,
	background_animframe, enemy_animframe,
	get_enemy, push_interval,
	enemy_wrapper, counter, start_button, menu, retry_button, select_enemy,
	keyPressed, key_speed, selected, y_mouse_pos, x_mouse_pos, x_jet, y_jet;

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

//---START-MENU
start_button = document.getElementById('start-menu-button');
menu = document.getElementById('menu');


start_button.onclick = function start() {
	menu.className = 'menu-hide';
	menu.removeChild(start_button);
	setTimeout (function() {
		push_interval = setInterval(push_enemy, 200);
	}, 2000);
	start_button = null;
}

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

select_enemy = document.querySelectorAll('.enemy');

function move_enemy() {
	var enemy_x_pos, enemy_y_pos;
	select_enemy = document.querySelectorAll('.enemy');
	enemy_animframe = requestAnimationFrame(move_enemy);
	if(select_enemy.length > 0) {
		for(i = 0; i < select_enemy.length; i++) {
			enemy_x_pos = parseInt(select_enemy[i].style.left);
			enemy_x_pos -= 15;
			select_enemy[i].style.left = enemy_x_pos + 'px';
			if(parseInt(select_enemy[i].style.left) <= 0 - parseInt(select_enemy[i].style.width)) {
				enemy_wrapper.removeChild(select_enemy[i]);
			}
		}
	}	
}
move_enemy();
			
//---COLLISION DETECTION

function detect_collision() {
	var enemy_x, enemy_y, enemy_w, enemy_h, jet_x, jet_y, jet_w, jet_y, explosion;
	for(i = 0; i < select_enemy.length; i++) {
		enemy_x = parseInt(select_enemy[i].style.left);
		enemy_y = parseInt(select_enemy[i].style.top);
		enemy_w = select_enemy[i].offsetWidth;
		enemy_h = select_enemy[i].offsetHeight;

		jet_x = parseInt(jet_id.style.left);
		jet_y = parseInt(jet_id.style.top);
		jet_w = jet_id.offsetWidth;
		jet_h = jet_id.offsetHeight;

		rudder_x = parseInt(jet_id.style.left);
		rudder_y = parseInt(jet_id.style.top) - 38;
		rudder_w = 43;
		rudder_h = 38;

		counter = 0;

		if(enemy_x < (jet_x + jet_w) &&
		(enemy_x + enemy_w) > jet_x &&
		enemy_y < (jet_y + jet_h) &&
		(enemy_h + enemy_y) > jet_y || 
		
		//--RUDDER COLLISION
		enemy_x < (rudder_x + rudder_w) &&
		(enemy_x + enemy_w) > rudder_x &&
		enemy_y < (rudder_y + rudder_h) &&
		(enemy_h + enemy_y) > rudder_y) {
			select_enemy[i].id = 'enemy-hidden';
			selected = null;
			game_over();
		}	
	}	
}
var collision_interval = setInterval(detect_collision, 1);

//---GAME-OVER FUNCTIONS
function enemy_explosion() {
	for(i = 0; i < select_enemy.length; i++) {
		if(select_enemy[i].id === 'enemy-hidden') {
			explosion = document.createElement('div');
			explosion.className = 'explosion-enemy';
			select_enemy[i].appendChild(explosion);
		}
	}
}

function create_enemyExplosion() {
	var enemyExplosion_interval;
	enemyExplosion_interval = setInterval(enemy_explosion, 50);

	setTimeout (function() {
		clearInterval(enemyExplosion_interval);
	}, 2000)
}

function jet_explosion() {
	var explosion;
	explosion = document.createElement('div');
	explosion.className = 'explosion';
	jet_id.appendChild(explosion);
}

function create_jetExplosion() {
	var jetExplosion_interval;
	jetExplosion_interval = setInterval(jet_explosion, 50);

	setTimeout (function() {
		clearInterval(jetExplosion_interval);
	}, 2200);
}

function stop_loops() {
	cancelAnimationFrame(background_animframe);
	cancelAnimationFrame(enemy_animframe);
	clearInterval(collision_interval);
	clearInterval(push_interval);
	clearInterval(key_interval);
}	


function game_over() {
	setTimeout(create_jetExplosion, 100);
	create_enemyExplosion();
	stop_loops();
	retry_menu();
	jet_id.onmousedown = function() {
		return false;
	}
	document.ontouchmove = function() {
		return false;
	}
}

//---RESTART FUNCTIONS
function restart() {
	setTimeout (function() {
		push_interval = setInterval(push_enemy, 200);
	}, 4000);

	jet_id.onmousedown = function() {
		grab(this);
		return false;
	}
	document.ontouchmove = touch_move;
	jet_id.style.left = 200 + 'px';
	jet_id.style.top = 200 + 'px'; 	
}

function hide_menu() {
	if(menu.className === 'menu-show') {
		menu.className = 'menu-hide';
		menu.removeChild(retry_button);
	}
}

function reset_loops() {
	background_animframe = requestAnimationFrame(draw_background);
	enemy_animframe = requestAnimationFrame(move_enemy);
	key_interval = setInterval(update_keys, 1);
	collision_interval = setInterval(detect_collision, 1);
}

function cleanUp_explosion() {
	var select_explosion;
	select_explosion = document.querySelectorAll('.explosion');
	for(i = 0; i < select_explosion.length; i++) {
		jet_id.removeChild(select_explosion[i]);
	}
}

function cleanUp_enemies() {
	for(i = 0; i < select_enemy.length; i++) {
		enemy_wrapper.removeChild(select_enemy[i]);
	}
}

function retry_menu() {
	setTimeout (function() {
		menu.className = 'menu-show';
		retry_button = document.createElement('button');
		retry_button.id = 'retry-menu-button';
		retry_button.innerHTML = 'Retry';
		menu.appendChild(retry_button);
	}, 3000);

	setTimeout (function() {
		retry_button.onclick = function retry() {
		 	restart();
			hide_menu();
			reset_loops();
			cleanUp_explosion();
			cleanUp_enemies();
			retry_button = null;
		}		
	}, 3100);
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
	if(input.keyCode === 13) {
		if(start_button != null) {
			start_button.click();
		}
		if(retry_button != null) {
			retry_button.click();
		}
	}
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
	else if(key_y <= 0 + 38) {
		jet_id.style.top = 38 + 'px';
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
		else if(jet_positionY <= 0 + 38) {
			jet_id.style.top = 0 + 38;
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