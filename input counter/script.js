var text = document.getElementById("text");
	var character = document.getElementById("character-count");
	var word = document.getElementById("word-count");

	document.onkeyup = function() {
		character.innerHTML = "Characters:<p>" + text.value.length + "</p>";
		if(text.value !== '') {
			word.innerHTML = "Words:<p>" + text.value.match(/\S+\s*/g).length; + "</p>";
		}
		else {
			word.innerHTML = "Words:<p>0</p>";
		}
	}