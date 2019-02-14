function addItem(item, ammount) {
	var ammount = ammount || 1;
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = "http://h2zgames.com/evobeast-api/addItem.php";
	let body = 'user='+getCookie('username')+'&item='+item+"&ammount="+ammount;
	fetch(url, {
		method: 'post',
		body: body,
		headers: header,
	});

}
