var key_codes = {
	zero:  [48, 96, "sounds/0.mp3", 0],
	one:   [49, 97, "sounds/1.mp3", 1],
	two:   [50, 98, "sounds/2.mp3", 2],
	three: [51, 99, "sounds/3.mp3", 3],
	four:  [52, 100, "sounds/4.mp3", 4],
	five:  [53, 101, "sounds/5.mp3", 5],
	six:   [54, 102, "sounds/6.mp3", 6],
	seven: [55, 103, "sounds/7.mp3", 7],
	eight: [56, 104, "sounds/8.mp3", 8],
	nine:  [57, 105, "sounds/9.mp3", 9],
	a: [65, "abcimg/a.jpg", "sounds/a.mp3"],
	b: [66, "abcimg/b.jpg", "sounds/b.mp3"],
	c: [67, "abcimg/c.jpg", "sounds/c.mp3"],
	d: [68, "abcimg/d.jpg", "sounds/d.mp3"],
	e: [69, "abcimg/e.jpg", "sounds/e.mp3"],
	f: [70, "abcimg/f.jpg", "sounds/f.mp3"],
	g: [71, "abcimg/g.jpg", "sounds/g.mp3"],
	h: [72, "abcimg/h.jpg", "sounds/h.mp3"],
	i: [73, "abcimg/i.jpg", "sounds/i.mp3"],
	j: [74, "abcimg/j.jpg", "sounds/j.mp3"],
	k: [75, "abcimg/k.jpg", "sounds/k.mp3"],
	l: [76, "abcimg/l.jpg", "sounds/l.mp3"],
	m: [77, "abcimg/m.jpg", "sounds/m.mp3"],
	n: [78, "abcimg/n.jpg", "sounds/n.mp3"],
	o: [79, "abcimg/o.jpg", "sounds/o.mp3"],
	p: [80, "abcimg/p.jpg", "sounds/p.mp3"],
	q: [81, "abcimg/q.jpg", "sounds/q.mp3"],
	r: [82, "abcimg/r.jpg", "sounds/r.mp3"],
	s: [83, "abcimg/s.jpg", "sounds/s.mp3"],
	t: [84, "abcimg/t.jpg", "sounds/t.mp3"],
	u: [85, "abcimg/u.jpg", "sounds/u.mp3"],
	v: [86, "abcimg/v.jpg", "sounds/v.mp3"],
	w: [87, "abcimg/w.jpg", "sounds/w.mp3"],
	x: [88, "abcimg/x.jpg", "sounds/x.mp3"],
	y: [89, "abcimg/y.jpg", "sounds/y.mp3"],
	z: [90, "abcimg/z.jpg", "sounds/z.mp3"],
};

function randomColor() {
	var colors = ["#00FF99", "#663300", "#E6E600", "#000000", "#FF0000", "#00FF00", "#33CCFF", "#990099", "#0000CC", "#669900"];
	return colors[Math.floor(Math.random() * colors.length)];
}


function sound(clips) {
	var sound_element = document.getElementById("sound");
	sound_element.src = clips;
	sound_element.play();
};

document.onkeyup = function(event) {
	var input, content_div; 
	input = event.keyCode;
	console.log(input);
	for (var key in key_codes) {
		if (key_codes[key][0] === input || key_codes[key][1] === input) {
			document.getElementById("wrapper").style.cssText = "background:" + randomColor() + ";";
			content_div = document.getElementById("content");
			if (isNaN(key_codes[key][1])) {	
				content_div.innerHTML = '<img src=' + key_codes[key][1] + '>';
			}
			else {
				content_div.style.cssText = 'color: ' + randomColor() + ';';
				content_div.innerHTML = '<p>' + key_codes[key][3] + '</p>';
			}
			sound(key_codes[key][2]);
		}
	}	
};