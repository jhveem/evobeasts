STRETCH = 4;
var charSprites = {};
var skillSprites = {};
var battleList = {};
var battleCharData = {};
var battleCommands = []; 

battleCharData['vulhar-1'] = {
	character: 'renla',
	name: 'renla',
	team: 'vulhar',
	level: 5,
	baseStats: {
		vitality: 2.8,
		spirit: 3.4,
		strength: 1,
		mysticism: 4.2,
		defense: 2,
		resistance: 3.6,
		agility: 3,
	},
	equip: {},
};
battleCharData['vulhar'] = {
	character: 'will_sword',
	name: 'vulhar',
	team: 'vulhar',
	level: 5,
	baseStats: {
		vitality: 5,
		spirit: 5,
		strength: 5,
		mysticism: 5,
		defense: 5,
		resistance: 5,
		agility: 5,
	},
	equip: {},
};
battleCharData['vulhar-2'] = {
	character: 'renla',
	name: 'renla',
	team: 'vulhar',
	level: 5,
	baseStats: {
		vitality: 2.8,
		spirit: 3.4,
		strength: 1,
		mysticism: 4.2,
		defense: 2,
		resistance: 3.6,
		agility: 3,
	},
	equip: {},
};
battleCharData['bob-1'] = {
	character: 'vespra',
	name: 'vespra',
	team: 'bob',
	level: 5,
	baseStats: {
		vitality: 2.8,
		spirit: 3.4,
		strength: 1,
		mysticism: 4.2,
		defense: 2,
		resistance: 3.6,
		agility: 3,
	},
	equip: {},
};
battleCharData['bob-2'] = {
	character: 'vespra',
	name: 'vespra',
	team: 'bob',
	level: 10,
	baseStats: {
		vitality: 2.8,
		spirit: 3.4,
		strength: 1,
		mysticism: 4.2,
		defense: 2,
		resistance: 3.6,
		agility: 3,
	},
	equip: {},
};
console.log(skillData);
/*
async function getCharData() {
	try {
		let response = await axios.get("http://localhost:3000/combat/chardata");
		battleCharData = response.data;
		return true;
	} catch (error) {
		console.log(error);
	}
}

getCharData();
*/

//set up characters
window.onload = function() {
	for (let name in battleCharData) {
		let c = battleCharData[name];
		c.id = name;
		//calc stats
		c['stats'] = {};
		c.stats = calcCharStats(c.name, c.level, c.baseStats, c.equip); 
		c['statsmax'] = {};
		c.statsmax = calcCharStats(c.name, c.level, c.baseStats, c.equip); 
		c.skills = [];
		//need to switch this so it's different for tamer's and evobeasts... except that overworld tamer's might have a similar set up to evobeasts in that they have skills based on level. That or you manually set their skills in the map editor. need to decide later.
		for (skill in charData[c.character].skills) {
			c.skills.push(skill);
		}
		//set up party command interface
		battleList[name] = createBattleInst(name);
	}

	vStats.chars = battleCharData;
	for (let i in battleCharData) {
		vStats.skillCurrent[i] = '';
		vStats.setTargs(battleCharData[i].skills[0], battleCharData[i].id);
	};
	setInterval(update, 30);
};

function addPlayerCommands() {
	let divs = document.getElementsByClassName('command-data');
	for (let i in divs) {
		let div = divs[i];
		if (typeof(div) === 'object') {
			let character = div.id;
			let skill = div.getElementsByClassName('skill-select')[0].value;
			let target = div.getElementsByClassName('target-select')[0].value;
			let targets = [target];
            commandsToSend.push({type: 'skill_init', c: character, targ: targets, skill: skill, state: 'attack', init: false});
		}
	}
}


function addEnemyCommands() {
	for (let name in battleCharData) {
		let c = battleCharData[name];
		let allyList = [];
		let enemyList = [];
		let allList = [];
		for (let name2 in battleCharData) {
			let c2 = battleCharData[name2];
			if (c2.team === getCookie('username')) {
				enemyList.push(name2);
			} else {
				allyList.push(name2);
			}
			allList.push(name2);
		}
			
		if (c.team !== getCookie('username')) {
            let targ = getRandomTarget(getCookie('username'), 'alive');
			commandsToSend.push({type: 'skill_init', c: name, targ: [targ], skill: 'attack_sword', state: 'attack', init: false, damage: 10});
		}
	}
}

function getRandomTarget(team, check='') {
    let targList = [];
    for (let name in battleCharData) {
        let t = battleCharData[name];
        let passCheck = false;
        if (check === '') {
            passCheck = true;
        }
        if (check === 'dead' && t.stats.vitality <= 0) {
            passCheck = true;
        }
        if (check === 'alive' && t.stats.vitality > 0) {
            passCheck = true;
        }
        if (t.team === team && passCheck === true) {
            targList.push(name);
        }
    }
    let targIndex = Math.floor((targList.length) * Math.random())
    return targList[targIndex];
}
        

function submitCommands() {
	let check = true;
	let divs = document.getElementsByClassName('command-data');
	for (let i in divs) {
		let div = divs[i];
		if (typeof(div) === 'object') {
			let character = div.id;
			let skill = div.getElementsByClassName('skill-select')[0].value;
			let target = div.getElementsByClassName('target-select')[0].value;
			if (target === '') {
				check = false;
			}
		}
	}
	if (check === true) {
		addPlayerCommands();
		addEnemyCommands();
		/*
		try {
			let response = await axios.post("http://localhost:3000/combat/chardata", commandsToSend);
			return true;
		} catch (error) {
			console.log(error);
		}
		*/

		commandsToSend.sort(function(a, b) {
			let agilA = battleCharData[a.c].stats.agility;		
			let agilB = battleCharData[b.c].stats.agility;		
			return agilB - agilA;
		});
		for (let i in commandsToSend) {
			//send commands to server
			battleCommands.push(commandsToSend[i]);
		}
	}
}
		

var commandsToSend = []; 
var battleCommands = []; 
var battleAnimations = [];
var battleMessages= [];

//runs the whole game
function update() {
	if (battleCommands.length > 0) {
		let command = battleCommands[0];
        let charId = command.c;
		let charInst = battleList[charId];
        let charData = battleCharData[charId];
		if (command.init === false) {
            command.init = true;
			if (command.type === 'skill_init') {
                if (charData.vitality <= 0) {
                        battleCommands.splice(0, 1);
                } else { 
                    let targs = command.targ;
                    let numTargs = targs.length;
                    charInst.state = command.state;
                    charInst.frameIndex = 0;
                    if (numTargs === 1) {
                        let targId = targs[0];
                        let targData = battleCharData[targId];
                        let targInst = battleList[targId];
                        if (targData.stats.vitality <= 0) {
                            let targIndex = getRandomTarget(targData.team, 'alive');
                            targId = battleCharData[targIndex].id;
                            targInst = battleList[targId]
                        }
                        charInst.x = targInst.x;
                        charInst.y = targInst.y;
                        battleCommands.splice(1,0,{c: charId, type: 'skill_animation', targ: [targId], skill: command.skill, damage: command.damage, heal: command.heal, init: false});
                    }
		}
			} else if (command.type === 'skill_animation') {
				for (let i  in command.targ) {
					let targId = command.targ[i];
					let targInst = battleList[targId];
					let targData = battleCharData[targId];
					let skill = command.skill;
					let skillTarget = skillData[skill].target;
					let c = battleCharData[command.c];
					let damage = calcSkillDamage(skill, c.stats, targData.stats);
					let heal = calcSkillHeal(skill, c.stats, targData.stats);
					battleAnimations.push(createBattleAnimation(command.skill, targInst.x, targInst.y, 'skill', targInst));
                    if (damage > 0) {
						battleCommands.splice(1, 0, {type: 'damage', damage: damage, x: targInst.x + 8, y: targInst.y - 8, init: false, targ: targId});
					}
                    if (heal > 0) {
						battleCommands.splice(1, 0, {type: 'heal', heal: heal, x: targInst.x + 8, y: targInst.y - 8, init: false, targ: targId});
					}
				}
			} else if (command.type === 'damage') {
				battleMessages.push(createBattleMessage('counter',command.damage,command.x, command.y, command.targ));
			} else if (command.type === 'char_flash') {
				//figure out shaders and make char flash white
			}
		} else {
			let finished = false;
			if (command.type === 'skill_init') {
				if (charInst.state === 'idle') {
					finished = true;
				}
			}
			if (command.type === 'skill_animation') {
				if (battleAnimations.length === 0) {
					finished = true;
				}
			}
			if (command.type === 'heal') {
				if (battlemessages.length === 0) {
					finished = true;
					battleCharData[command.targ].stats.vitality += command.damage;
				}
			}
			if (command.type === 'damage') {
				if (battleMessages.length === 0) {
					finished = true;
					battleCharData[command.targ].stats.vitality -= command.damage;
				}
			}
			if (finished === true) {
				battleCommands.splice(0, 1);
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
	for (i in battleMessages) {
		let message = battleMessages[i];
		message.render();
	}
}
