STRETCH = 4;
var charSprites = {};
var skillSprites = {};
var battleList = []; 
battleList.push(createBattleInst('vespra', 24, 48, 'enemy'));
battleList.push(createBattleInst('', 72, 48, 'enemy'));
battleList.push(createBattleInst('vespra', 120, 48, 'enemy'));
battleList.push(createBattleInst('renla', 24, 124, 'ally'));
battleList.push(createBattleInst('will_sword', 72, 124, 'ally'));
battleList.push(createBattleInst('renla', 120, 124, 'ally'));
var battleCommands = []; 
var battleAnimations = [];
var battleTexts = [];
battleCommands.push({type: 'skill_init', c: 4, targ: [0], skill: 'attack_sword', state: 'attack', init: false});
battleCommands.push({type: 'skill_init', c: 0, targ: [4], skill: 'attack_sword', state: 'attack', init: false});

window.onload = function() {
	setInterval(update, 30);
};
//runs the whole game
function update() {
	if (battleCommands.length > 0) {
		let command = battleCommands[0];
		let c = battleList[command.c];
		if (command.init === false) {
			command.init = true;
			if (command.type === 'skill_init') {
				let targs = command.targ;
				let numTargs = targs.length;
				c.state = command.state;
				c.frameIndex = 0;
				if (numTargs === 1) {
					let targ = battleList[targs[0]];
					c.x = targ.x;
					c.y = targ.y;
					battleCommands.splice(1,0,{type: 'skill_animation', targ: command.targ, skill: command.skill, damage: 10, init: false});
				}
			}
			if (command.type === 'skill_animation') {
				for (let i  in command.targ) {
					let targ = battleList[command.targ[i]];
					battleAnimations.push(createBattleAnimation(command.skill, targ.x, targ.y, 'skill'));
					if (command.damage > 0) {
						battleCommands.splice(1, 0, {type: 'damage', damage: command.damage, x: targ.x + 8, y: targ.y - 8, init: false});
						console.log('send d');
					}
				}
			}
			if (command.type === 'damage') {
				console.log(command);
				battleTexts.push({message: ''+command.damage, x: command.x, y: command.y});
			}
			if (command.type === 'char_flash') {
				//figure out shaders and make char flash white
			}
		} else {
			if (command.type === 'skill_init') {
				if (c.state === 'idle') {
					battleCommands.splice(0, 1);
				}
			}
			if (command.type === 'skill_animation') {
				if (battleAnimations.length === 0) {
					battleCommands.splice(0, 1);
				}
			}
			if (command.type === 'damage') {
			}
		}
	}
	renderCombat();
}
var bg = createBattleBack('grass');

function renderCombat() {
	ctx.clearRect(0, 0, WIDTH, HEIGHT);
	bg.render(-40, 0, 0, STRETCH);
	for (i in battleList) {
		let c = battleList[i];
		if (c.name != '') {
			c.render();
		}
	}
	for (i in battleAnimations) {
		let anim = battleAnimations[i];
		anim.render();
	}
	for (i in battleTexts) {
		let message = battleTexts[i];
		ctx.font = ""+32*STRETCH+"px VT323";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText(message.message, message.x * STRETCH, message.y * STRETCH);
	}
}
