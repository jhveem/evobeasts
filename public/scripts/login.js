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
		console.log(response.text);
		return response.json();
	}).then(function(json) {
		if (json.check === 'success') {
			setCookie('username',name,5);
			setCookie('usertype',json.type,5);
			window.location.replace("index.html");
		}
		else if (json.check === 'created') {
			alert('account created');
			setCookie('username',name,5);
			setCookie('usertype',json.type,5);
			window.location.replace("index.html");
		}
		else {
			//add in some stuff for other errors
		}
	});
}
function logout() {
	setCookie('username', '', 0);
	location.reload();
}
