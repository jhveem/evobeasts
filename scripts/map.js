function initMapVars() {
	for (var i = 0; i < 200; i += 1) {
		keyCheck[i] = false;
	}
	grids.tile = [];
	grids.tileset = [];
	grids.wall = [];
	grids.solid = [];
	for (var i = 0; i < mapWidth; i += 1) {
		for (var g in grids) {
			grids[g][i] = [];
		}
		for (var j = 0; j < mapHeight; j += 1) {
			for (var g in grids) {
				grids[g][i][j] = '';
			}
		}
	}
	tiles.grass = createTileSprite('grass'); 
	tiles.water = createTileSprite('water'); 
	tiles.dirt = createTileSprite('dirt'); 
	tiles.sand = createTileSprite('sand'); 

	tilesets.grass_water = createTileSheet('grass_water');
	tilesets.grass_dirt = createTileSheet('grass_dirt');

	walls.cave = createWallSheet('cave');

	for (var i in instData) {
		instSprites[i] = createInstSprite(i);
	}

	for (c in charData) {
		if (charData[c].type === 'evobeast' && charData[c].family !== '') {
			charSprites[c] = createCharSprites(c, 'overworld');
		}
		if (charData[c].type === 'tamer') {
			charSprites[c] = createCharSprites(c, 'overworld');
		}
	}

			

}
function renderMap() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	//depth for all of the instances, change to have a depth value but if it is -1 it equals y
	for (var i in instList) {
		instList[i].update();
	}
	instList.sort(function(a, b) {return a.y - b.y});
	for (var yy = 0; yy < mapHeight; yy += 1) {
		for (var xx = 0; xx < mapWidth; xx += 1) {
			dx = xx * GRID_SIZE - x_shift;
			dy = yy * GRID_SIZE - y_shift;
			if (background != '') {
				tiles[background].render(dx * STRETCH, dy * STRETCH);
			}
		}
	}
	//tilesets
	renderGrid(grids.tileset, function(square, dx, dy, xx, yy) {
		if (square != ''  && dx > -GRID_SIZE && dy >= -GRID_SIZE && dx < (WIDTH / STRETCH) && dy < (HEIGHT / STRETCH)) {
			renderTileSet(square, dx, dy, xx, yy);
		}
	});
	//tiles
	renderGrid(grids.tile, function(square, dx, dy, xx, yy) {
		if (square != ''  && dx > -GRID_SIZE && dy >= -GRID_SIZE && dx < (WIDTH / STRETCH) && dy < (HEIGHT / STRETCH)) {
			tiles[square].render(dx * STRETCH, dy * STRETCH);
		}
	});
	//walls
	renderGrid(grids.wall, function(square, dx, dy, xx, yy) {
		if (dx > -GRID_SIZE && dy >= -GRID_SIZE && dx < (WIDTH / STRETCH) && dy < (HEIGHT / STRETCH)) {
			if (square != '') {
				renderWallSet(square, dx, dy, xx, yy);
			} else if (yy > 0) {
				var above = grids.wall[xx][yy - 1];
				if (above != '') {
					renderWallFace(above, dx, dy);
				}
			}
		}
	});
	//insts
	for (var i in instList) {
		instList[i].render();
	}
}
function renderGrid(grid, drawFunction) {
	for (var yy = 0; yy < mapHeight; yy += 1) {
		for (var xx = 0; xx < mapWidth; xx += 1) {
			var dx = xx * GRID_SIZE - x_shift;
			var dy = yy * GRID_SIZE - y_shift;
			var square = grid[xx][yy];
			drawFunction(square, dx, dy, xx, yy);
		}
	}
}
function setSolid() {
	//reset solid grid
	for (var yy = 0; yy < mapHeight; yy += 1) {
		for (var xx = 0; xx < mapWidth; xx += 1) {
			grids.solid[xx][yy] = false;
		}
	}
	//set solid grid
	for (var yy = 0; yy < mapHeight; yy += 1) {
		for (var xx = 0; xx < mapWidth; xx += 1) {
			if (grids.wall[xx][yy] !== '') {
				grids.solid[xx][yy] = true;
				grids.solid[xx][yy + 1] = true;
			}
		}
	}
	for (var i in instList) {
		var inst = instList[i];
		if (inst.solid === true) {
			var xx = inst.x / GRID_SIZE;
			var yy = inst.y / GRID_SIZE;
			grids.solid[xx][yy] = true;
		}
	}
}

function saveMap(name) {
	var name = name || document.getElementById('mapName').value;
	var load = document.getElementById('loadName').value;
	if (name == '') {
		if (load !== '') {
			name = load;
		}
	}
	if (name != '') {
		let header = new Headers();
		header.append('Content-Type', 'application/x-www-form-urlencoded');
		let url = "http://h2zgames.com/evobeast-api/saveMap.php";
		var saveData = {};
		saveData.mapWidth = mapWidth;
		saveData.mapHeight = mapHeight;
		saveData.grids = grids;
		saveData.background = background;
		saveData.instList = instList;
		fetch(url, {
			method: 'post',
			body: 'name='+name+"&map="+JSON.stringify(saveData),
			headers: header,
		})
		.then(function(response) {
			return response.text();
		}).then(function(json) {
			getMapsList(name);
		});
	}
}
function getMapsList(selected) {
	var list = document.getElementById('loadName');
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	var selected = selected || '';
	let url = "http://h2zgames.com/evobeast-api/getMapsList.php";
	fetch(url, {
		method: 'get',
		headers: header,
	})
	.then(function(response) {
		return response.text();
	}).then(function(json) {
		list.innerHTML = json;
		list.value = selected;
	});
}
function loadMap(name) {
	var name = name || document.getElementById('loadName').value;
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = "http://h2zgames.com/evobeast-api/loadMap.php";
	fetch(url, {
		method: 'post',
		body: 'name='+name,
		headers: header,
	})
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		var r = json;
		grids = r.grids;
		background = r.background;
		mapWidth = r.mapWidth;
		mapHeight = r.mapHeight;
		if (document.getElementById('mapW') !== null) {
			document.getElementById('mapW').value = mapWidth;
			document.getElementById('mapH').value = mapHeight;
		}
		instList = [];
		for (let i in r.instList) {
			var getInst = r.instList[i];
			var type = getInst.type; 
			if (type === 'inst') {
				instList.push(createInst(getInst.name, getInst.x, getInst.y));
			}
			if (type === 'char') {
				instList.push(createChar(getInst.name, getInst.destX, getInst.destY, getInst.focus));
			}
			if (type === 'evobeast') {
				instList.push(createEvobeast(getInst.name, getInst.destX, getInst.destY));
			}
		}
		setSolid();
	});

}

function loadMapOld() {
	var list = document.getElementById('loadName');
	var name = document.getElementById('loadName').value;
	var request = new XMLHttpRequest();
	request.open("POST", "maps/loadMap.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send("name="+name);
	request.responseType = 'json';
	request.onload = function() {
		var r = request.response;
		grids = r.grids;
		background = r.background;
		mapWidth = r.mapWidth;
		mapHeight = r.mapHeight;
		document.getElementById('mapW').value = mapWidth;
		document.getElementById('mapH').value = mapHeight;
		instList = [];
		for (let i in r.instList) {
			var getInst = r.instList[i];
			var type = getInst.type; 
			if (type === 'inst') {
				instList.push(createInst(getInst.name, getInst.x, getInst.y));
			}
			if (type === 'char') {
				instList.push(createChar(getInst.name, getInst.destX, getInst.destY, getInst.focus));
			}
			if (type === 'evobeast') {
				instList.push(createEvobeast(getInst.name, getInst.destX, getInst.destY));
			}
		}
		setSolid();
	}

}
function renderWallSet(name, dx, dy, xx, yy) {
	var sprite = walls[name]; 
	var data = getAdjacentData(name, 'wall', xx, yy);
	var sx = data.sx;
	var sy = data.sy;
	renderSet(sprite, dx, dy, sx, sy);
}
function renderWallFace(name, dx, dy) {
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
	renderSet(sprite, dx, dy, sx, sy);
}
function renderTileSet(tileset, dx, dy, xx, yy) {
	var tilesprite = tilesets[tileset]; 
	var data = getAdjacentData(tileset, 'tileset', xx, yy);
	var sx = data.sx;
	var sy = data.sy;
	renderSet(tilesprite, dx, dy, sx, sy);
}
function renderSet(sprite, dx, dy, sx, sy) {
	sprite.renderPart(dx * STRETCH, dy * STRETCH, sx.ul, sy.ul, 8, 8);
	sprite.renderPart(dx * STRETCH + 8 * STRETCH, dy * STRETCH, sx.ur + 8, sy.ur, 8, 8);
	sprite.renderPart(dx * STRETCH, dy * STRETCH + 8 * STRETCH, sx.dl, sy.dl + 8, 8, 8);
	sprite.renderPart(dx * STRETCH + 8 * STRETCH, dy * STRETCH + 8 * STRETCH, sx.dr + 8, sy.dr + 8, 8, 8);
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
