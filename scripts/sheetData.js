var charSheetData = {};
charSheetData.idle = {
	xx:0,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
	speed:.125,
};
charSheetData.attack= {
	xx:0,
	yy:64,
	ww:32,
	hh:64,
	frames:5,
	speed:.25,
};
charSheetData.dead = {
	xx:64,
	yy:0,
	ww:32,
	hh:32,
	frames:2,
};
for (var s in charSheetData) {
	var state = charSheetData[s];
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
