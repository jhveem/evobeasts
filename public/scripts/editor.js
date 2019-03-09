function setBackgroundValue() {
	background = document.getElementById('background').value;
};
function fillGridAlternating() {
	var category = document.getElementById('placementCategories').value;
	var option = document.getElementById('placementOptions').value;
	for (var i = 0; i < mapWidth; i += 1) {
		for (var j = 0; j < mapHeight; j += 1) {
			if ((i % 2 + j % 2) === 1) {
				if (instTypes.indexOf(category) !== -1) {
					if (category === 'inst') {
						instList.push(createInst(option, i * GRID_SIZE, j * GRID_SIZE));
					}
				} else {
					grids[category][i][j] = option;
				}
			}
		}
	}
}
function fillGrid() {
	var category = document.getElementById('placementCategories').value;
	var option = document.getElementById('placementOptions').value;
	for (var i = 0; i < mapWidth; i += 1) {
		for (var j = 0; j < mapHeight; j += 1) {
			grids[category][i][j] = option;
		}
	}
}
function setGridValue(e) {
	if (!e) e = window.event;
	if (canvasClick == true) {
		var rect = canvas.getBoundingClientRect();
		var originX = event.clientX - rect.left + x_shift * STRETCH;
		var originY = event.clientY - rect.top + y_shift * STRETCH;
		var gridX = Math.floor(originX / (STRETCH * GRID_SIZE));
		var gridY = Math.floor(originY / (STRETCH * GRID_SIZE));
		if (gridX < mapWidth && gridY < mapHeight) {
			var category = document.getElementById('placementCategories').value;
			var option = document.getElementById('placementOptions').value;
			if (category != '') {
				if (e.shiftKey) {
					grids[category][gridX][gridY] = '';
				} else {
					grids[category][gridX][gridY] = option;
				}
			}
		}
		if (category === 'wall') {
			setSolid();
		}
	}
}
function getInstData(i) {
	let inst = instList[i];
	let div = document.getElementById('inst-data');
	div.innerHTML = '';
	for (let name in inst) {
		let value = inst[name];
		let type = typeof(value);
		if (type !== 'function' && type !== 'object') {
			let span = document.createElement('span');
			span.innerHTML = name;
			div.appendChild(span);
			let input = document.createElement('input');
			input.setAttribute('type','text');
			input.setAttribute('id', 'inst-data-'+name);
			input.value = value;
			div.appendChild(input);
			let br = document.createElement('br');
			div.appendChild(br);
		}
	}
	let save = document.createElement('a');
	save.href = "javascript: saveInstData("+i+");";
	save.innerHTML = "save";
	div.appendChild(save);
}
function saveInstData(instIndex) {
	let div = document.getElementById('inst-data');
	let vals = div.getElementsByTagName('input');
	let inst = instList[instIndex];
	for (let i = 0; i < vals.length; i++) {
		let val = vals[i];
		let name = val.id.replace('inst-data-','');
		let value = val.value;
		if (typeof(inst[name]) === 'number') {
			value = parseInt(value);
		}
		if (typeof(inst[name]) === 'boolean') {
			value = value === 'true'; 
		}
		inst[name] = value;
		inst[name]
	}
	getInstData(instIndex);
}
function getMouseGrid(e) {
	var e = e || window.event;
	var rect = canvas.getBoundingClientRect();
	var originX = event.clientX - rect.left + x_shift * STRETCH;
	var originY = event.clientY - rect.top + y_shift * STRETCH;
	var gridX = Math.floor(originX / (STRETCH * GRID_SIZE));
	var gridY = Math.floor(originY / (STRETCH * GRID_SIZE));
	
	return {x: gridX, y: gridY};
}
function addInstToList(e) {
	var e = e || window.event;
	if (canvasClick == true) {
		var mGrid = getMouseGrid(e);
		var gridX = mGrid.x;
		var gridY = mGrid.y;
		var xx = gridX * GRID_SIZE;
		var yy = gridY * GRID_SIZE;
		if (gridX < mapWidth && gridY < mapHeight) {
			if (e.shiftKey) {
				for (let i in instList) {
					let inst = instList[i];
					if (inst.x == xx && inst.y == yy) {
						if (inst !== FOCUS) {
						instList.splice(i, 1);
						}
					}
				}
				setSolid();
			} else if (e.altKey) {
				for (let i in instList) {
					let inst = instList[i];
					if (inst.x == xx && inst.y == yy) {
						getInstData(i);
					}
				}
			} else {
				let category = document.getElementById('placementCategories').value;
				let option = document.getElementById('placementOptions').value;
				if (category === 'inst') {
					instList.push(createInst(option, xx, yy));
				} else if (category === 'evobeast') {
					instList.push(createEvobeast(option, xx, yy));
				} else if (category === 'tamer') {
					instList.push(createChar(option, xx, yy));
				} else if (category === 'item') {
					instList.push(createItem(option, xx, yy));
				} else if (category === 'special') {
					instList.push(createSpecial(option, xx, yy));
				}

				setSolid();
			}
		}
	}
}

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
	if (category == 'inst') {
		group = instSprites;
	}
	if (category === 'evobeast') {
		group = charSprites;
	}
	if (category === 'tamer') {
		group = charSprites;
	}
	if (category === 'item') {
		group = itemSprites;
	}
	if (category === 'special') {
		group = specialTypes;
	}
	var list = document.getElementById('placementOptions');
	while (list.childNodes[0]) {
		list.removeChild(list.childNodes[0]);
	}
	var option = document.createElement('option');
	option.innerHTML = '';
	list.appendChild(option);
	for (var i in group) {
		var skip = false;
		if (group === charSprites) {
			if (charData[i].type === category) {
				let family = charData[i].family;
				var par = document.getElementById('family_'+family);
				if (par === null) {
					par = document.createElement('optgroup');
					par.label = family;
					par.id = 'family_'+family;
					list.appendChild(par);
				}
			} else {
				skip = true;
			}
		} else {
			par = list;
		}
		if (skip === false) {
			let option = document.createElement('option');
			option.innerHTML = i;
			par.appendChild(option);
		}
	}
}
