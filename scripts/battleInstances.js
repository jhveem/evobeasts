
var battleInst = {
	allyTamer:{img:{},base_x:104,base_y:104,dir:'up'},
	allyEvobeast1:{img:{},base_x:48,base_y:104,dir:'up'},
	allyEvobeast2:{img:{},base_x:160,base_y:104,dir:'up'},
	enemyTamer:{img:{},base_x:104,base_y:32,dir:'down'},
	enemyEvobeast1:{img:{},base_x:48,base_y:32,dir:'down'},
	enemyEvobeast2:{img:{},base_x:160,base_y:32,dir:'down'},
};

for (var i in battleInst) {
	var inst  = battleInst[i];
	inst.xx = inst.base_x;
	inst.yy = inst.base_y;
	inst.state = 'idle';
}
battleInst.allyTamer.img = evobeastSprites.will_sword;
battleInst.allyEvobeast1.img = evobeastSprites.renla;
battleInst.allyEvobeast2.img = evobeastSprites.renla;
battleInst.enemyEvobeast1.img = evobeastSprites.vespra;
battleInst.enemyEvobeast2.img = evobeastSprites.vespra;
