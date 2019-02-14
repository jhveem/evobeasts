function login() {
	var name = document.getElementById('username').value;
	var pass = document.getElementById('password').value;
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = "http://h2zgames.com/evobeast-api/login.php";
	fetch(url, {
		method: 'post',
		body: 'username='+name+'&password='+pass,
		headers: header,
	})
	.then(function(response) {
		return response.text();
	}).then(function(txt) {
		if (txt === 'successfully logged in') {
			setCookie('username',name,5);
			window.location.replace("index.html");
		}
		if (txt === 'account created') {
			alert('account created');
			setCookie('username',name,5);
			window.location.replace("index.html");
		}
	});
}
function logout() {
	setCookie('username', '', 0);
	location.reload();
}
