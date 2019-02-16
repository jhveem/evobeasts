let vMenu = new Vue({
	el: "#mainMenu",
	data: {
		//key is url minus .html, value is how it appears in the menu
		menuItems: {
			collection: 'collection',
			inventory: 'inventory',
			storyMode: 'story mode',
			pvp: 'pvp',
			login: 'logout',
		},
		menuHtmlStart: `
			<nav class="navbar navbar-expand-lg navbar-light">
				<div class="navbar-header">
					<a class="navbar-brand" href="/index.html">EVOBEASTS</a>
				</div>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
		`,
		menuHtmlEnd: `
					</ul>
				</div>
			</nav>
		`,
	},
	methods: {
		checkActive(link) {
			let path = window.location.pathname;
			if (path === '/'+link+'.html') {
				return ' active';
			}
			return '';
		},
		createMenu() {
			let html = this.menuHtmlStart;
			if (getCookie('username') !== '') {
				for (let link in this.menuItems) {
					let name = this.menuItems[link];
					html += this.createMenuItem(link, name);
				}
				console.log(getCookie('usertype'));
				if (getCookie('usertype') === 'a') {
					html += this.createMenuItem('editor','editor');
				}
			} else {
				html += '<li class="nav-item"><a class="nav-link'+this.checkActive('login')+'" href="/login.html">login<a></li>'
			}
			html += this.menuHtmlEnd;
			return html;	
		},
		createMenuItem(link, name) {
			return '<li class="nav-item"><a class="nav-link'+this.checkActive(link)+'" href="/'+link+'.html">'+name+'<a></li>'
		},
	},
});
