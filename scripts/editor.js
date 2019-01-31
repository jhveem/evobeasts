
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
	for (var i in group) {
		var list = document.getElementById('placementOptions');
		var option = document.createElement('option');
		option.innerHTML = i;
		list.appendChild(option);
	}
}
function renderTileSet(tileset, xx, yy) {
	var tilesprite = tilesets[tileset]; 
	var u = false;
	if (yy > 0) {
		var u = grids.tileset[xx][yy - 1] == tileset;
	}
	var d = false;
	if (yy < mapHeight - 1) {
		var d = grids.tileset[xx][yy + 1] == tileset;
	}
	var l = false;
	if (xx > 0) {
		var l = grids.tileset[xx - 1][yy] == tileset;
	}
	var r = false;
	if (xx < mapWidth - 1) {
		var r = grids.tileset[xx + 1][yy] == tileset;
	}
	var ul = false;
	if (yy > 0 && xx > 0) {
		var ul = grids.tileset[xx -1][yy - 1] == tileset;
	}
	var ur = false;
	if (yy > 0 && xx < mapWidth - 1) {
		var ur = grids.tileset[xx + 1][yy - 1] == tileset;
	}
	var dl = false;
	if (yy < mapHeight - 1 && xx > 0) {
		var dl = grids.tileset[xx -1][yy + 1] == tileset;
	}
	var dr = false;
	if (yy < mapHeight - 1 && xx < mapWidth - 1) {
		var dr = grids.tileset[xx + 1][yy + 1] == tileset;
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
	console.log(sx);
	console.log(sy);
	tilesprite.renderPart(xx * STRETCH_GRID, yy * STRETCH_GRID, sx.ul, sy.ul, 8, 8);
	tilesprite.renderPart(xx * STRETCH_GRID + 8 * STRETCH, yy * STRETCH_GRID, sx.ur + 8, sy.ur, 8, 8);
	tilesprite.renderPart(xx * STRETCH_GRID, yy * STRETCH_GRID + 8 * STRETCH, sx.dl, sy.dl + 8, 8, 8);
	tilesprite.renderPart(xx * STRETCH_GRID + 8 * STRETCH, yy * STRETCH_GRID + 8 * STRETCH, sx.dr + 8, sy.dr + 8, 8, 8);

}
