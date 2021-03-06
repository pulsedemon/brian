var map_options = {
	wallchina: {
		title: "Great Wall of China",
		center: new google.maps.LatLng(40.430707, 116.564609),
		zoom: 16
	},
	liberty: {
		title: "Statue of Liberty",
		center: new google.maps.LatLng(40.689234, -74.044491),
		zoom: 19
	},
	tradecenter: {
		title: "Ground 0",
		center: new google.maps.LatLng(40.712647, -74.012199),
		zoom: 19
	},
	colosseum: {
		title: "Colosseum",
		center: new google.maps.LatLng(41.890229, 12.492238),
		zoom: 18
	},
	pyramidgiza: {
		title: "Great Pyramid at Giza",
		center: new google.maps.LatLng(29.979268, 31.134201),
		zoom: 18
	},
	stonehenge: {
		title: "Stonehenge",
		center: new google.maps.LatLng(51.178890, -1.826242),
		zoom: 18
	},
	grandcanyon: {
		title: "Grand Canyon",
		center: new google.maps.LatLng(36.107155, -112.112983),
		zoom: 19
	},
	tajmahal: {
		title: "Taj Mahal",
		center: new google.maps.LatLng(27.175012, 78.042158),
		zoom: 18

	},
	niagrafalls: {
		title: "Niagra Falls",
		center: new google.maps.LatLng(43.078819, -79.076125),
		zoom: 17
	},
	victoriafalls: {
		title: "Victoria Falls",
		center: new google.maps.LatLng(-17.924316, 25.855868),
		zoom: 16
	},
	greatskellig: {
		title: "Great Skellig",
		center: new google.maps.LatLng(51.770645, -10.540513),
		zoom: 17
	},
	angelfalls: {
		title: "Angel Falls",
		center: new google.maps.LatLng(5.967545, -62.535543),
		zoom: 18
	},
	lotustemple: {
		title: "Lotus Temple",
		center: new google.maps.LatLng(28.553492, 77.258822),
		zoom: 18
	},
	machupicchu: {
		title: "Machu Picchu",
		center: new google.maps.LatLng(-13.163149, -72.544978),
		zoom: 18
	},
	bigben: {
		title: "Big Ben",
		center: new google.maps.LatLng(51.500754, -0.124636),
		zoom: 20
	},
	sagrada: {
		title: "Sagrada Familia",
		center: new google.maps.LatLng(41.403629, 2.174200),
		zoom: 20
	},
	neuschwanstein: {
		title: "Neuschwanstein Castle",
		center: new google.maps.LatLng(47.557571, 10.749806),
		zoom: 18
	},
}; 


function class_remove() {
	var class_select;
	class_select = document.querySelector(".button-active");
	if(class_select !== null) {
		class_select.classList.remove("button-active");
	}
}

function get_map(element) {
	var map, id_select;
	class_remove();
	id_select = document.querySelector("#" + element.id + "");
	id_select.classList.add("button-active");
	map = new google.maps.Map(document.getElementById("map"), map_options[element.id]);
	new google.maps.Marker({
		position: map_options[element.id].center,
		title: map_options[element.id].title
	}).setMap(map);
	google.maps.event.addDomListener(window, 'load');
	map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
}

