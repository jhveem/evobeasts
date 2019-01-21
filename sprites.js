var evobeastSheetData = {};
evobeastSheetData.idle = {
	xx:0,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
	speed:.25,
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
	xx:128,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
	speed:.25,
};
for (var s in evobeastSheetData) {
	var state = evobeastSheetData[s];
	state.up = {};
	state.down = {};
	state.up.yy = state.yy;
	state.down.yy = state.yy + state.hh;
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
skillSheetData = {
	xx:0,
	yy:0,
	ww:64,
	hh:64,
	frames:4,
	speed:.25,
};
function createBattleBack(myImg, name) {
	var image = new Image();
	image.src = 'images/battle_backs/battle_back_'+name+'.png';
	myImg.img = image;
}
function createBattleAnimation(name, p1, p2) {
	var xx = 0;
	var yy = 0;
	if (typeof(p1) === 'string') {
		xx = battleInst[p1].base_x;
		yy = battleInst[p1].base_y;
	} else if (typeof(p1) === 'number') {
		xx = p1;
		yy = p2;
	}
	var image = new Image();
	var myImg = {};
	image.src = 'images/animations/'+name+'.png';
	myImg.img = image;
	myImg.img.sheetData = skillSheetData;
	myImg.xx = xx;
	myImg.yy = yy;
	myImg.frameCurrent = 0;
	animations.push(myImg);
	console.log(myImg);
}
function drawBattleBack(ctx, back) {
	ctx.drawImage(back.img, 0, 0, WIDTH, HEIGHT);
}
function drawEvobeast(ctx, inst) { 
	cycleFrameChar(inst);
	var image = inst.img;
	//console.log(inst.img);
	var xx = inst.xx;
	var yy = inst.yy;
	var state = inst.state;
	var dir = inst.dir;
	var sheetX = image.sheetData[state][dir].xx + image.sheetData[state][dir].ww * Math.floor(inst.frameCurrent);
	var sheetY = image.sheetData[state][dir].yy;
	var sheetW = image.sheetData[state][dir].ww;
	var sheetH = image.sheetData[state][dir].hh;
	var ww = image.sheetData[state][dir].ww * STRETCH;
	var hh = image.sheetData[state][dir].hh * STRETCH;
	ctx.drawImage(image.img, sheetX, sheetY, sheetW, sheetH, xx * STRETCH, yy * STRETCH, ww, hh);
}
function drawAnimation(ctx, inst) { 
	var image = inst.img;
	cycleFrameAnimation(inst);
	console.log(image);
	var xx = inst.xx;
	var yy = inst.yy;
	var sheetX = image.sheetData.xx + image.sheetData.ww * Math.floor(inst.frameCurrent);
	var sheetY = image.sheetData.yy;
	var sheetW = image.sheetData.ww;
	var sheetH = image.sheetData.hh;
	var ww = image.sheetData.ww * STRETCH;
	var hh = image.sheetData.hh * STRETCH;
	ctx.drawImage(image, sheetX, sheetY, sheetW, sheetH, xx * STRETCH, yy * STRETCH, ww, hh);
}

function cycleFrame(inst, sheet, animationEnd) {
	inst.frameCurrent += sheet.speed;
	var maxFrames = sheet.frames;
	if (inst.frameCurrent >= maxFrames) {
		inst.frameCurrent = 0;
		if (typeof(animationEnd) !== 'undefined') {
			animationEnd();
		}
	}
}
function cycleFrameChar(inst) {
	cycleFrame(inst, inst.img.sheetData[inst.state], function(){
		if (inst.state != 'idle') {
			inst.state = 'idle';
			inst.xx = inst.base_x;
			inst.yy = inst.base_y;
			battlePause = false;
			createBattleAnimation('attack_sword', 'enemyEvobeast1');
		}
	});
}
function cycleFrameAnimation(inst, sheetData) {
	cycleFrame(inst, inst.img.sheetData, function(){
		inst.frameCurrent = -1;	
	});
}

function createImage(myImg, url, sheetData) {
	var image = new Image();
	image.src = 'images/'+url+'.png';
	myImg.sheetData = sheetData;
	image.onload = function() {
		myImg.img = image;
		myImg.anchorX = 0;
		myImg.anchorY = 0;
	}
}
