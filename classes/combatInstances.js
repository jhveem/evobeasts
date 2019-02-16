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
function BattleMessage(options) {
	var that = {};
	that.message = options.message;
	that.type = options.type;
	that.x = options.x;
	that.y = options.y;
	that.size = options.size || 32;
	that.color = options.color || '#FFF';
	that.tickCount = options.tickCount || 10;
	that.tick = that.tickCount;

	that.destroy = function() {
		for (let i in battleMessages) {
			let m = battleMessages[i];
			if (m === that) {
				battleMessages.splice(i, 1);
				break;
			}
		}
	};

	that.cycle = function() {
		if (that.type === 'counter') {
			if (that.message === 0) {
				that.destroy();
			} else {
				that.tickCount = 1;
				that.message -= 1;
			}
		}
	};
	
	that.render = function() {
		ctx.font = ""+that.size*STRETCH+"px VT323";
		ctx.fillStyle = that.color;
		ctx.textAlign = "center";
		ctx.fillText(that.message, that.x * STRETCH, that.y * STRETCH);
		if (that.tickCount > 0) {
			that.tick -= 1;
			if (that.tick === 0) {
				that.cycle();
				that.tick = that.tickCount;
			}
		}
			
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
function createBattleMessage(type, message, xx, yy) {
	let m = BattleMessage({type: type, message: message, x: xx, y: yy});
	m.color = 'red';
	return m;
}
