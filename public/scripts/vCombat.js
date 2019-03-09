var test = 10;
Vue.component('stats-name', {
	props: ['name'],
	template: `<h1>{{ name }}</h1>`,
});

Vue.component('stats-hp', {
	props: {
		hpCur: Number,
		hpMax: Number,
	},
	template: `<p>{{hpCur}}/{{hpMax}}</p>`,
});

var statDisplay = {};
var statDiv = document.getElementById('stat-display-div');
vStats = new Vue({
	el: '#stat-display-div',
	data: function () {
		//have to init all properties of an object that will be watched here
		let skillCurrentBase = {};
		for (let i in battleCharData) {
			skillCurrentBase[i] = {};
		}
		return {
			chars: {}, 
			targs: {}, 
			selected: '',
			selectedSkill: {},	
			skillCurrent: skillCurrentBase, 
			skillData: skillData,
		}
	},
	computed: {
		allies() {
			let returnData = {};
			for (let name in this.chars) {
				let c = this.chars[name];
				if (c.team === getCookie('username')) {
					returnData[name] = c;
				}
			}
			return returnData;
		},
		enemies() {
			let returnData = {};
			for (let name in this.chars) {
				let c = this.chars[name];
				if (c.team !== getCookie('username')) {
					returnData[name] = c;
				}
			}
			return returnData;
		},
		all() {
			let returnData = {};
			for (let name in this.chars) {
				let c = this.chars[name];
				returnData[name] = c;
			}
			return returnData;
		},
	},
	methods: {
		setTargs(skill, id) {
			this.skillCurrent[id] = '';
			this.targs[id] = {};
			let data = skillData[skill];
			let targ = data.target;
			if (targ === 'enemy-single') {
				this.targs[id] = this.enemies;
			}else if (targ === 'ally-single') {
				this.targs[id] = this.allies;
			}
			
		},
		setSkillCurrent(evt, id) {
			this.skillCurrent[id] = evt.target.value;
			this.setTargs(this.skillCurrent[id], id);
		},
	},
});
