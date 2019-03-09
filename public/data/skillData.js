var skillData = {
	attack_sword: {
		name: 'attack',
		cost: 0,
		type: 'melee',
		target: 'enemy-single',
		element: ['none'],
		damgx: {
			strength: 1,	
		},
	},
	bite: {
		name: 'bite',
		cost: 5,
		type: 'melee',
		target: 'enemy-single',
		element: ['none'],
		damgx: {
			strength: 1.1,
		},
	},
	pounce: {
		name: 'pounce',
		cost: 5,
		type: 'melee',
		target: 'enemy-single',
		damgx: {
			strength: 1,
		},
	},
	pollen: {
		name: 'pollen',
		cost: 10,
		type: 'heal',
		target: 'ally-single',
		healx: {
			spirit: 1.5,
		},
	},
	//attack_instrument: {},
}
