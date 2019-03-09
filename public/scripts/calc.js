function calcSkillDamage(skillName, stats, targStats) {
	let skill = skillData[skillName];
	let damgx = skill.damgx;
	let damg = 0;
	for (let s in damgx) {
		let mult = damgx[s];
		let stat = stats[s];
		defStat = '';
		if (s === 'mysticism') {
			defStat = 'defense';
		}
		if (s === 'strength') {
			defStat = 'resistance';
		}
		let targStat = targStats[defStat];
		let base=((Math.pow(stat,1.2)*mult)*2-(targStat))/4;
		damg += base;
	}
	damg = Math.ceil(damg);
	return damg;
}

function calcSkillHeal(skillName, stats, targStats) {
	let skill = skillData[skillName];
	let healx = skill.healx;
	return 0;
}
