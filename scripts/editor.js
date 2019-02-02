
function setBackgroundValue() {
	background = document.getElementById('background').value;
	console.log(background);
};
function setPlacementOptions() {
	var category = document.getElementById('placementCategories').value;
	var group = {};
	if (category == 'tile') {
		group = tiles;
	}
	if (category == 'tileset') {
		group = tilesets;
	}
	if (category == 'wall') {
		group = walls;
	}
	var list = document.getElementById('placementOptions');
	while (list.childNodes[0]) {
		list.removeChild(list.childNodes[0]);
	}
	var option = document.createElement('option');
	option.innerHTML = '';
	list.appendChild(option);
	for (var i in group) {
		var option = document.createElement('option');
		option.innerHTML = i;
		list.appendChild(option);
	}
}
function getAdjacentData(name, gridName, xx, yy) {
	var data = {};
	var grid = grids[gridName];
	var u = false;
	if (yy > 0) {
		var u = grid[xx][yy - 1] == name;
	}
	var d = false;
	if (yy < mapHeight - 1) {
		var d = grid[xx][yy + 1] == name;
	}
	var l = false;
	if (xx > 0) {
		var l = grid[xx - 1][yy] == name;
	}
	var r = false;
	if (xx < mapWidth - 1) {
		var r = grid[xx + 1][yy] == name;
	}
	var ul = false;
	if (yy > 0 && xx > 0) {
		var ul = grid[xx -1][yy - 1] == name;
	}
	var ur = false;
	if (yy > 0 && xx < mapWidth - 1) {
		var ur = grid[xx + 1][yy - 1] == name;
	}
	var dl = false;
	if (yy < mapHeight - 1 && xx > 0) {
		var dl = grid[xx -1][yy + 1] == name;
	}
	var dr = false;
	if (yy < mapHeight - 1 && xx < mapWidth - 1) {
		var dr = grid[xx + 1][yy + 1] == name;
	}
	var sx = {ul: 0, dl: 0, ur: 0, dr: 0};
	var sy = {ul: 0, dl: 0, ur: 0, dr: 0};

	if (!u && !l) {
		sx.ul = 16;
		sy.ul = 0;
	}
	if (!u && l) {
		sx.ul = 32;
		sy.ul = 16;
	}
	if (u && !l) {
		sx.ul = 32;
		sy.ul = 0;
	}
	if (u && !ul && l) {
		sx.ul = 16;
		sy.ul = 16;
	}

	if (!d && !l) {
		sx.dl = 16;
		sy.dl = 0;
	}
	if (!d && l) {
		sx.dl = 32;
		sy.dl = 16;
	}
	if (d && !l) {
		sx.dl = 32;
		sy.dl = 0;
	}
	if (d && !dl && l) {
		sx.dl = 16;
		sy.dl = 16;
	}
	
	
	if (!u && !r) {
		sx.ur = 16;
		sy.ur = 0;
	}
	if (!u && r) {
		sx.ur = 32;
		sy.ur = 16;
	}
	if (u && !r) {
		sx.ur = 32;
		sy.ur = 0;
	}
	if (u && !ur && r) {
		sx.ur = 16;
		sy.ur = 16;
	}

	if (!d && !r) {
		sx.dr = 16;
		sy.dr = 0;
	}
	if (!d && r) {
		sx.dr = 32;
		sy.dr = 16;
	}
	if (d && !r) {
		sx.dr = 32;
		sy.dr = 0;
	}
	if (d && !dr && r) {
		sx.dr = 16;
		sy.dr = 16;
	}
	data.sx = sx;
	data.sy = sy;
	return data;
}
function renderWallSet(name, cx, cy, xx, yy) {
	var sprite = walls[name]; 
	var data = getAdjacentData(name, 'wall', xx, yy);
	var sx = data.sx;
	var sy = data.sy;
	renderSet(sprite, cx, cy, sx, sy);
}
function renderWallFace(name, cx, cy) {
	var sprite = walls[name];
	var sx = {};
	var sy = {};
	sx.dr = 0;
	sx.dl = 0;
	sx.ur = 0;
	sx.ul = 0;
	sy.dr = 16;
	sy.dl = 16;
	sy.ur = 16;
	sy.ul = 16;
	renderSet(sprite, cx, cy, sx, sy);
}
function renderTileSet(tileset, cx, cy, xx, yy) {
	var tilesprite = tilesets[tileset]; 
	var data = getAdjacentData(tileset, 'tileset', xx, yy);
	var sx = data.sx;
	var sy = data.sy;
	renderSet(tilesprite, cx, cy, sx, sy);
}
function renderSet(sprite, cx, cy, sx, sy) {
	sprite.renderPart(cx * STRETCH_GRID, cy * STRETCH_GRID, sx.ul, sy.ul, 8, 8);
	sprite.renderPart(cx * STRETCH_GRID + 8 * STRETCH, cy * STRETCH_GRID, sx.ur + 8, sy.ur, 8, 8);
	sprite.renderPart(cx * STRETCH_GRID, cy * STRETCH_GRID + 8 * STRETCH, sx.dl, sy.dl + 8, 8, 8);
	sprite.renderPart(cx * STRETCH_GRID + 8 * STRETCH, cy * STRETCH_GRID + 8 * STRETCH, sx.dr + 8, sy.dr + 8, 8, 8);
}
