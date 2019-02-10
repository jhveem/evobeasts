function Player(options) {
	var that = createChar(options.name, options.x, options.y);
	that.type = 'player';
	that.startX = that.x / GRID_SIZE;
	that.startY = that.y / GRID_SIZE;
	that.moveTimerMax = 30;
	that.moveTimer = that.moveTimerMax;
	that.moveRange = 5;
	that.focus = 'yes';

	that.checkKeys = function() {
		if (that.focus === 'yes') {
			//w
			if (keyCheck[87] == true) {
				that.move('up');
				that.state = 'walk';
			}
			//s
			if (keyCheck[83] == true) {
				that.move('down');
				that.state = 'walk';
			}
			//a
			if (keyCheck[65] == true) {
				that.move('left');
				that.state = 'walk';
			}
			//d
			if (keyCheck[68] == true) {
				that.move('right');
				that.state = 'walk';
			}
		}
	}
	that.updateBase = that.update;
	that.update = function() {
		for (let i in instList) {
			let inst = instList[i];
			if (inst.type === 'evobeast') {
				if (inst.x === that.x && inst.y === that.y) {
					inst.capture();
				}
			}
		}
		that.updateBase();
		x_shift = that.x + GRID_SIZE / 2 - (WIDTH / STRETCH) / 2;
		y_shift = that.y + GRID_SIZE / 2 - (HEIGHT / STRETCH) / 2;
	}
	if (that.focus === 'yes') {
		FOCUS = that;
	}
	return that;
}

function Tamer(options) {
	var that = createChar(options.name, options.x, options.y);
	that.type = 'evobeast';
	that.startX = that.x / GRID_SIZE;
	that.startY = that.y / GRID_SIZE;
	that.moveTimerMax = 30;
	that.moveTimer = that.moveTimerMax;
	that.moveRange = 5;

	that.getDirDist = function(dir, xx, yy) {
		var dy = Math.abs(yy + that.getDirVal(dir).y - that.startY);
		var dx = Math.abs(xx + that.getDirVal(dir).x - that.startX);
		if (dy > that.moveRange || dx > that.moveRange) {
			return false;
		}
		return true;
	}

	that.getAvailableDirs = function() {
		var xx = that.x / GRID_SIZE;
		var yy = that.y / GRID_SIZE;
		var dirs = [];
		for (var dir in DIRS) {
			var checkDir = DIRS[dir];
			var check = that.getDirDist(checkDir, xx, yy);
			if (check === true) {
				dirs.push(checkDir);
			}
		}
		return dirs;
	}

	that.updateBase = that.update;
	that.update = function() {
		that.moveTimer -= 1;
		if (that.moveTimer <= 0) {
			that.moveTimer = that.moveTimerMax;
			var dirs = that.getAvailableDirs();
			var index = Math.floor(Math.random() * dirs.length);
			that.move(dirs[index]);
		}
		that.updateBase();
	}

	return that;
}
function Evobeast(options) {
	var that = createChar(options.name, options.x, options.y);
	that.type = 'evobeast';
	that.startX = that.x / GRID_SIZE;
	that.startY = that.y / GRID_SIZE;
	that.moveTimerMax = 60;
	that.moveTimer = that.moveTimerMax;
	that.moveRange = 5;
	that.level = 1;

	that.getDirDist = function(dir, xx, yy) {
		var distX = Math.abs(xx + that.getDirVal(dir).x - that.startX);
		var distY = Math.abs(yy + that.getDirVal(dir).y - that.startY);
		var dx = that.getDirVal(dir).x;
		var dy = that.getDirVal(dir).y;
		var checkWall = grids.solid[xx + dx][yy + dy] === false;
		if ((distY > that.moveRange || distX> that.moveRange) && checkWall) {
			return false;
		}
		return true;
	}

	that.capture = function() {
		let statData = calcEvobeastStats(that.name, that.level);
		statData.level = that.level;
		statData.user = 'vulhar';
		statData.evobeast = that.name;
		addEvobeast(statData);
		that.destroy();
	}

	that.getAvailableDirs = function() {
		var xx = that.x / GRID_SIZE;
		var yy = that.y / GRID_SIZE;
		var dirs = [];
		for (var dir in DIRS) {
			var checkDir = DIRS[dir];
			var check = that.getDirDist(checkDir, xx, yy);
			if (check === true) {
				dirs.push(checkDir);
			}
		}
		return dirs;
	}

	that.updateBase = that.update;
	that.update = function() {
		that.moveTimer -= 1;
		if (that.moveTimer <= 0) {
			that.moveTimer = that.moveTimerMax;
			var dirs = that.getAvailableDirs();
			var index = Math.floor(Math.random() * dirs.length);
			that.move(dirs[index]);
		}
		that.updateBase();
	}

	return that;
}

function Char(options) {
	var that = Inst({name: options.name, x: options.x, y: options.y, sprite: options.sprite});
	that.destX = options.x;
	that.destY = options.y;
	if (!(that.name in charSprites)) {
		charSprites[that.name] = createCharSprites(that.name, 'overworld');
	}
	that.sprite = charSprites[that.name];
	that.dir = options.dir || 'up';
	that.state = options.state || 'idle';
	that.speed = options.speed || 2;
	that.type = 'char';
	that.focus = options.focus || 'no';
	that.solid = false;

	that.move = function(d) {
		if (that.x == that.destX && that.y == that.destY) {
			var xx = that.x / GRID_SIZE;
			var yy = that.y / GRID_SIZE;
			var dx = that.getDirVal(d).x;
			var dy = that.getDirVal(d).y;
			var checkSolid = grids.solid[xx + dx][yy + dy] === false;
			if (checkSolid) {
				that.destX += GRID_SIZE * dx;
				that.destY += GRID_SIZE * dy;
			}
			that.dir = d;
		}
	};

	that.getDirVal = function(dir) {
		if (dir === 'up') {
			return {y: -1, x: 0};
		}
		if (dir === 'down') {
			return {y: 1, x: 0};
		}
		if (dir === 'left') {
			return {x: -1, y: 0};
		}
		if (dir === 'right') {
			return {x: 1, y: 0};
		}
		return {x: 0, y:0};
	}
	that.checkKeys = function() {
		//
	};

	that.update = function() {
		that.state = 'idle';
		that.checkKeys();
		var dx = Math.sign(that.destX - that.x);
		var dy = Math.sign(that.destY - that.y);
		if (dx != 0 || dy != 0) {
			that.state = 'walk';
		}
		that.x += dx * that.speed;
		that.y += dy * that.speed;
	}
	that.renderBase = that.render;
	that.render = function() {
		that.renderBase(that.sprite[that.state][that.dir]);
	}
	if (that.focus === 'yes') {
		FOCUS = that;
	}
	return that;
}


function Inst(options) {
	var that = {};
	that.x = options.x;
	that.y = options.y;
	that.name = options.name;
	that.sprite = options.sprite || {};
	that.type = 'inst';
	that.focus = 'no';
	that.tickCount = 0,
	that.frameIndex = 0;
	that.loop = true;

	that.cycleFrames = function(spr) {
		that.tickCount += 1;
		var imageSpeed = .125;
		var ticksPerFrame = 1 / imageSpeed;
		if (that.tickCount > ticksPerFrame) {
			var numberOfFrames = spr.image.width / spr.width;
			that.tickCount = 0;
			if (that.frameIndex < numberOfFrames - 1) {
				that.frameIndex += 1;
			} else if (that.loop){
				that.frameIndex = 0;
			}
		}
	}

	that.update = function() {
		//empty
	}
	that.render = function(spr) {
		var spr = spr || that.sprite;
		var numberOfFrames = spr.image.width / spr.width;
		that.frameIndex %= numberOfFrames;
		var draw_x = (that.x - x_shift) * STRETCH;
		var draw_y = (that.y - y_shift) * STRETCH;
		if (draw_x >= -STRETCH_GRID && draw_y >= -STRETCH_GRID && draw_x < WIDTH + spr.width * STRETCH && draw_y < HEIGHT + spr.height * STRETCH) {
			spr.render(draw_x, draw_y, that.frameIndex, STRETCH);
		}
		that.cycleFrames(spr);
	}
	that.destroy = function() {
		for (let i in instList) {
			if (instList[i] === that) {
				instList.splice(i, 1);
				break;
			}
		}
	}
	return that;
}
function createInst(name, xx, yy) {
	var spr = instSprites[name];
	var solid = instData[name].solid;
	var inst = Inst({name: name, sprite: spr, x: xx, y: yy});
	inst.solid = solid;
	return inst;
}
function createEvobeast(name, xx, yy, focus) {
	var focus = focus || 'no';
	return Evobeast({x: xx, y: yy, name: name, focus: focus});
}
function createChar(name, xx, yy, focus) {
	var focus = focus || 'no';
	return Char({x: xx, y: yy, name: name, focus: focus});
}
function createPlayer(name, xx, yy, focus) {
	var focus = focus || 'no';
	return Player({x: xx, y: yy, name: name, focus: focus});
}
