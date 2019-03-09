const express = require('express');
const bodyParser = require("body-parser");
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
var battleCommands = []; 

var battleCharData = {};
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

app.get('/combat/charData', (req, res) => {
	res.send(battleCharData);
});
app.post('/combat/commands', (req, res) => {
	commandsToSend.sort(function(a, b) {
		let agilA = battleCharData[a.c].stats.agility;		
		let agilB = battleCharData[b.c].stats.agility;		
		return agilB - agilA;
	});
});
app.listen(3000, () => console.log('Server listening on port 3000!'));
