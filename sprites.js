
var evobeastSheetData = {};
evobeastSheetData.idle = {
	xx:0,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
	speed:.125,
};
evobeastSheetData.attack= {
	xx:0,
	yy:64,
	ww:32,
	hh:64,
	frames:5,
	speed:.25,
};
evobeastSheetData.dead = {
	xx:64,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
};
for (var s in evobeastSheetData) {
	var state = evobeastSheetData[s];
	state.up = {};
	state.down = {};
	state.up.yy = state.yy;
	state.down.yy = state.yy + state.ww;
	for (var d in state) {
		var dir = state[d];
		if (dir.hasOwnProperty('yy')) {
			dir.xx = state.xx;
			dir.ww = state.ww;
			dir.hh = state.hh;
			dir.frames = state.frames;
		}
	}
}
function createBattleBack(myImg, name) {
	var image = new Image();
	image.src = 'images/battle_backs/battle_back_'+name+'.png';
	myImg.img = image;
}
function drawBattleBack(ctx, back) {
	ctx.drawImage(back.img, 0, 0, WIDTH, HEIGHT);
}
function drawEvobeast(ctx, image, xx, yy, state, dir) {	
	image.cycleFrame(image.sheetData[state][dir]);
	var sheetX = image.sheetData[state][dir].xx + image.sheetData[state][dir].ww * Math.floor(image.frameCurrent);
	var sheetY = image.sheetData[state][dir].yy;
	var sheetW = image.sheetData[state][dir].ww;
	var sheetH = image.sheetData[state][dir].hh;
	var ww = image.sheetData[state][dir].ww * STRETCH;
	var hh = image.sheetData[state][dir].hh * STRETCH;
	ctx.drawImage(image.img, sheetX, sheetY, sheetW, sheetH, xx * STRETCH, yy * STRETCH, ww, hh);
}
function createImage(myImg, url, xx, yy, sheetData, sheet) {
	var image = new Image();
	image.src = 'images/'+url+'.png';
	myImg.frames = [];
	myImg.numFrames = 0;
	myImg.sheetData = sheetData;
	var imgUrl = 'images/'+url+'.png';
	myImg.imageSpeed = .125;
	myImg.frameCurrent = 0;
	myImg.cycleFrame = function(sheetData) {
		this.frameCurrent += this.imageSpeed;
		if (this.frameCurrent >= sheetData.frames) {
			this.frameCurrent = 0;
		}
	}
	image.onload = function() {
		ctx.drawImage(image, 0, 0, 32, 32, xx, yy, sheet.ww * 4, sheet.hh * 4);
		myImg.img = image;
		myImg.x = xx;
		myImg.y = yy;
		myImg.anchorX = 0;
		myImg.anchorY = 0;
	}
}
