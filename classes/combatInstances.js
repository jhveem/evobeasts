function BattleInst(options) {
	var that = Inst({name: options.name, x: options.x, y: options.y});
	that.state = 'idle';
	that.team = options.team || 'ally';
	that.dir = 'down';
	that.startX = that.x;
	that.startY = that.y;
	if (that.team === 'ally') {
		that.dir = 'up';
	}
	
	if (!(that.name in charSprites)) {
		charSprites[that.name] = createCharSprites(that.name, 'battle');
	}

	that.renderBase = that.render;
	that.render= function() {
		that.renderBase(charSprites[that.name]['battle_'+that.state][that.dir]);
	};

	that.animationEnd = function() {
		that.x = that.startX;
		that.y = that.startY;
		that.state = 'idle';
	};
	return that;
}
function BattleAnimation(options) {
	var that = Inst({name: options.name, x: options.x, y: options.y});
	that.type = 'animation';
	that.subtype = options.subtype;	
	if (!(that.name in charSprites)) {
		skillSprites[that.name] = createSkillSprite(that.name);
	}
	that.animationEnd = function() {
		that.destroy();
	};

	that.destroy = function() {
		for (let i in battleAnimations) {
			if (battleAnimations[i] === that) {
				battleAnimations.splice(i, 1);
				break;
			}
		}
	};
	
	that.renderBase = that.render;
	that.render = function() {
		let spr = {};
		if (that.subtype === 'skill') {
			spr = skillSprites[that.name];
		}
		that.renderBase(spr);
	};
	return that;
}
function createBattleInst(name, xx, yy, team) {
	let inst = {};
	inst.name = '';
	if (name !== '') {
		inst = BattleInst({name: name, x: xx, y: yy, team: team, type: charData[name]});
	}
	return inst;
}
function createBattleAnimation(name, xx, yy, subtype = '') {
	let inst = BattleAnimation({name: name, x: xx, y: yy, subtype: subtype});
	return inst;
}
