
var evobeastSheetData = {};
evobeastSheetData.idle = {
	up:{
		frames:2,
		xx:0,
		yy:0,
		ww:32,
		hh:32,
	},
	down:{
		frames:2,
		xx:0,
		yy:32,
		ww:32,
		hh:32,
	},
	left: {
		frames:2,
		xx:0,
		yy:64,
		ww:32,
		hh:32,
	},
	right: {
		frames:2,
		xx:0,
		yy:96,
		ww:32,
		hh:32,
	},
};
function createBattleBack(myImg, name) {
	var image = new Image();
	image.src = 'images/battle_backs/battle_back_'+name+'.png';
	myImg.img = image;
}
function drawBattleBack(ctx, back) {
	ctx.drawImage(back.img, 0, 0, WIDTH, HEIGHT);
}
function drawEvobeast(ctx, image, state, dir) {	
	image.cycleFrame(image.sheetData[state][dir]);
	ctx.drawImage(image.img, image.sheetData[state][dir].xx + image.sheetData[state][dir].ww * Math.floor(image.frameCurrent), image.sheetData[state][dir].yy, image.sheetData[state][dir].ww, image.sheetData[state][dir].hh, image.x, image.y, image.sheetData[state][dir].ww * STRETCH, image.sheetData[state][dir].hh * STRETCH);
}
function createImage(myImg, url, xx, yy, sheetData, sheet) {
	var image = new Image();
	image.src = 'images/'+url+'.png';
	myImg.frames = [];
	myImg.numFrames = 0;
	myImg.sheetData = sheetData;
	var imgUrl = 'images/'+url+'.png';
	myImg.imageSpeed = .25;
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
