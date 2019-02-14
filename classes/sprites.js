function Sprite(options) {
	var that = {};
	that.numberOfFrames = 1;
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.loop = options.loop || true;
	that.stretch = options.stretch || 1;
	that.sheetX = options.sheetX || 0;
	that.sheetY = options.sheetY || 0;
	that.anchorX = options.anchorX || 0;
	that.anchorY = options.anchorY || 0;

	that.update = function() {
	}
	that.init = function() {
		that.image.onload = function() {
			that.render();
		}	
	}
	that.renderPart = function(x, y, sx, sy, ww, hh, stretch) {
		var stretch = stretch || 1;
		that.context.drawImage(
			that.image,
			sx,
			sy,
			ww,
			hh,
			x,
			y,
			ww * that.stretch * stretch,
			hh * that.stretch * stretch,
		);
	}
	that.render = function(x, y, frameIndex, stretch) {
		var x = x || 0;
		var y = y || 0;
		var frameIndex = frameIndex || 0;
		var stretch = stretch || 1;
		that.context.drawImage(
			that.image,
			that.sheetX + frameIndex * that.width,
			that.sheetY,
			that.width,
			that.height,
			x - that.anchorX * that.stretch * stretch,
			y - that.anchorY * that.stretch * stretch,
			that.width * that.stretch * stretch,
			that.height * that.stretch * stretch,
		);
		that.update();
	}
	return that;
}
function createSprite(source, ww, hh) {
	var image = new Image();
	image.src = source;
	var spr = Sprite({context: ctx, width: ww, height: hh, image: image});
	return spr;
}
function createTileSprite(name, ww, hh) {
	var ww = ww || 16;
	var hh = hh || 16;
	var src = 'images/tiles/'+name+'.png';
	var spr = createSprite(src, ww, hh);
	return spr;
}
function createWallSheet(name, ww, hh) {
	var ww = ww || 32;
	var hh = hh || 48;
	var src = 'images/tiles/walls/'+name+'.png';
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
function createInstSprite(name) {
	var ww = instData[name].ww; 
	var hh = instData[name].hh; 
	var ax = instData[name].anchorX;
	var ay = instData[name].anchorY;
	var frames = instData[name].frames;
	var image = new Image();
	image.src = 'images/insts/'+name+'.png';
	var spr = Sprite({context: ctx, width: ww, height: hh, anchorX: ax, anchorY: ay, image: image, numberOfFrames: frames});
	return spr;
}
function createTileLine(src) {
	var image = new Image();
	image.src = src;
	var spr = Sprite({context: ctx, width: 32, height: 8, image: image, sheetY: y, numberOfFrames: 4});
}
function createBattleBack(name) {
	var src = 'images/battle_backs/battle_back_'+name+'.png';
	var spr = createSprite(src, 240, 160);
	return spr;
}
function createSkillSprite(name) {
	let src = 'images/animations/skills/'+name+'.png';
	let spr = createSprite(src, 64, 64);
	spr.anchorX = 16;
	spr.anchorY = 40;
	return spr;
}
function createItemSprites(name) {
	let returnData = {};
	let type = 'item';
	let image = new Image();
	let src = 'images/items/'+name+'.png';
	image.src = src;
	let spr = Sprite({context: ctx, width: 16, height: 16, image: image});
	return spr;
}
function createCharSprites(name, type) {
	var returnData = {};
	var type = type || 'all';
	var family = charData[name].family;
	for (var i in charSheetData) {
		var imgType = '';
		if (i.indexOf('battle') !== -1) {
			imgType = 'battle';
		} else {
			imgType = 'overworld';
		}
		if (type === imgType || type === 'all') {
			var image = new Image();
			if (charData[name].type === 'evobeast') {
				image.src = 'images/evobeasts/'+family+'/'+name+'/'+name+'_'+i+'.png';
			}
			if (charData[name].type === 'tamer') {
				if (imgType === 'battle') {
					image.src = 'images/tamers/'+family+'/'+name+'/'+name+'_'+i+'.png';
				} else {
					image.src = 'images/tamers/'+family+'/'+family+'_'+i+'.png';
				}
			}
			returnData[i] = {};
			var sheetData = charSheetData[i];
			for (var d in charSheetData[i]) {
				returnData[i][d]= Sprite({image: image, context: ctx, width: charSheetData[i].ww, height: charSheetData[i].hh, numberOfFrames: charSheetData[i].frames, anchorX: charSheetData[i][d].anchorX, anchorY: charSheetData[i][d].anchorY, sheetX: charSheetData[i][d].xx, sheetY: charSheetData[i][d].yy});
			}
		}
	}
	return returnData;
}

