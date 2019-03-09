function placeLocation(name, x, y) {
	let btn = document.createElement('a');
	btn.x = x;
	btn.y = y;
	btn.classList.add('map-location');
	btn.href='javascript:goToMap("'+name+'")';
	setLocationPosition(btn);
	let img = document.createElement('img');
	img.classList.add('location-icon');
	img.src = '/images/maps/locationIcon.png';
	btn.appendChild(img);
	document.getElementById('map-div').appendChild(btn);	

}
function setLocationPosition(loc) {
	let mapImg= document.getElementById('map-image').getBoundingClientRect();
	let my = mapImg.top;
	let mx = mapImg.left;
	let map = document.getElementById('map-image');
	let ww = map.clientWidth;
	let hh = map.clientHeight;
	let iw = map.naturalWidth;
	let ih = map.naturalHeight;
	let rw = ww/iw;
	let rh = hh / ih;
	loc.style.top = my + loc.y * rh - 32 + 'px';
	loc.style.left = mx + loc.x * rw - 16 + 'px';
}

function shiftLocations() {
	let locs = document.getElementsByClassName('map-location');

	for (let i in locs) {
		let loc = locs[i];
		console.log(typeof(loc));
		if (typeof(loc) === 'object') {
			setLocationPosition(loc);
		}
	}
}
function goToMap(name) {
	document.getElementById('map-div').style.display = 'none';
	document.getElementById('game-screen').style.display = 'block';
	loadMap(name);
}

