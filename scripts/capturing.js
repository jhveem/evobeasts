
function addEvobeast(data) {
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = "http://h2zgames.com/evobeast-api/addEvobeast.php";
	let body = 'user='+data.user;
	for (let i in data) {
		if (i !== 'user') {
			body += ('&'+i+'='+data[i]);
		}
	}
	fetch(url, {
		method: 'post',
		body: body,
		headers: header,
	});

}
function calcEvobeastStats(evobeast, level, boostData) {
	var boostData = boostData || {};
	returnData = {};
	for (var stat in statData) {
		let boost = 0;
		if (stat in boostData) {
			boost = boostData[stat];
		}
		let baseStat = parseInt(charData[evobeast][stat]);
		if (stat === 'vitality') {
			baseStat = 6 + baseStat * 2;	
		}
		let powerStat = Math.pow(level,1+(baseStat*.05)+(boost*.05));
		returnData[stat] = Math.floor((baseStat+ powerStat)); 
	}
	return returnData;
}

