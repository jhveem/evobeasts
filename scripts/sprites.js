function sprite(options) {
	var that = {},
	frameIndex = 0,
	tickCount = 0,
	ticksPerFrame = (1 / options.speed)|| 0,
	numberOfFrames = options.numberOfFrames || 1;

	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.loop = options.loop || true;
	that.stretch = options.stretch || 1;
	that.sheetX = options.sheetX || 0;
	that.sheetY = options.sheetY || 0;

	that.update = function() {
		tickCount += 1;
		if (tickCount > ticksPerFrame) {
			tickCount = 0;
			if (frameIndex < numberOfFrames - 1) {
				frameIndex += 1;
			} else if (that.loop){
				frameIndex = 0;
			}
		}
	}
	that.init = function() {
		that.image.onload = function() {
			that.render();
		}	
	}
	that.renderPart = function(x, y, sx, sy, ww, hh) {
		that.context.drawImage(
			that.image,
			sx,
			sy,
			ww,
			hh,
			x,
			y,
			ww * that.stretch,
			hh * that.stretch,
		);
	}
	that.render = function(x, y) {
		var x = x || 0;
		var y = y || 0;
		that.context.drawImage(
			that.image,
			that.sheetX + frameIndex * that.width / numberOfFrames,
			that.sheetY,
			that.width / numberOfFrames,
			that.height,
			x,
			y,
			that.width / numberOfFrames * that.stretch,
			that.height * that.stretch,
		);
		that.update();
	}
	return that;
}
function createSprite(source, ww, hh) {
	var image = new Image();
	image.src = source;
	var spr = sprite({context: ctx, width: ww, height: hh, image: image, stretch: STRETCH});
	return spr;
}
function createTileSprite(name, ww, hh) {
	var ww = ww || 16;
	var hh = hh || 16;
	var src = 'images/tiles/'+name+'.png';
	var spr = createSprite(src, ww, hh);
	return spr;
}
function createTileSheet(name, ww, hh) {
	var ww = ww || 32;
	var hh = hh || 48;
	var src = 'images/tiles/'+name+'_set.png';
	var spr = createSprite(src, ww, hh);
	return spr;
}
function createTileLine(src) {
	var image = new Image();
	image.src = src;
	var spr = sprite({context: ctx, width: 32, height: 8, image: image, stretch: STRETCH, sheetY: y, numberOfFrames: 4});
}
function createBattleBack(name) {
	var src = 'images/battle_backs/battle_back_'+name+'.png';
	var spr = createSprite(src, 240, 160);
	return spr;
}
function createCharSprites(name) {
	var returnData = {};
	var dirs = ['up', 'down'];
	var image = new Image();
	image.src = 'images/evobeasts/'+name+'.png';
	for (var i in charSheetData) {
		returnData[i] = {};
		for (var dir in dirs) {
			var d = dirs[dir];
		returnData[i][d]= sprite({image: image, context: ctx, width: charSheetData[i].ww * charSheetData[i].frames, height: charSheetData[i].hh, stretch: STRETCH, speed: charSheetData[i].speed, numberOfFrames: charSheetData[i].frames, sheetX: charSheetData[i][d].xx, sheetY: charSheetData[i][d].yy});
		}
	}
	return returnData;
}

