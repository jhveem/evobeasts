var charSheetData = {};
charSheetData.battle_idle = {
	xx:0,
	yy:0,
	ww:32,
	hh:32,
	anchorX: 8,
	anchorY: 16,
	frames:2,
	speed:.125,
};
charSheetData.battle_attack= {
	xx:0,
	yy:64,
	ww:32,
	hh:64,
	anchorX: 8,
	frames:5,
	speed:.25,
};
charSheetData.battle_dead = {
	xx:64,
	yy:0,
	ww:32,
	hh:32,
	anchorX: 8,
	anchorY: 16,
	frames:2,
};
charSheetData.idle = {
	xx:0,
	yy:192,
	ww:32,
	hh:32,
	anchorX: 8,
	anchorY: 16,
	frames:4,
	speed:.125,

};
charSheetData.walk = {
	xx:0,
	yy:320,
	ww:32,
	hh:32,
	anchorX: 8,
	anchorY: 16,
	frames:4,
	speed:.125,

};
for (var s in charSheetData) {
	var state = charSheetData[s];
	state.xx = 0;
	state.yy = 0;
	state.up = {};
	state.down = {};
	state.up.yy = state.yy;
	state.down.yy = state.yy + state.hh;
	if (s == 'walk' || s == 'idle') {
		state.left = {};
		state.right = {};
		state.left.yy = state.yy + state.hh * 2;
		state.right.yy = state.yy + state.hh * 3;
	}
	for (var d in state) {
		var dir = state[d];
		if (dir.hasOwnProperty('yy')) {
			dir.xx = state.xx;
			dir.ww = state.ww;
			dir.hh = state.hh;
			dir.frames = state.frames;
			dir.anchorY = state.anchorY;
			dir.anchorX = state.anchorX;
		}
	}
}
charSheetData.battle_attack.down.anchorY = 48;
