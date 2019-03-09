vCollection = new Vue({
	el: '#collection',
	data: {
		evobeasts: [],
		drag: {},
	},
	computed: {
		oldimageSource() {
			return 'images/evobeasts/renla/renla.png';
		},
	},
	methods: {
		addEvobeast(evobeast) {
			if (evobeast.name === '') {
				evobeast.name = evobeast.evobeast;
			}
			this.evobeasts.push(evobeast);
		},
		imageSource(name) {
			return 'images/evobeasts/'+charData[name].family+'/'+name+'.png';
		},
		elementBackground(name) {
			var element1 = charData[name].element1;
			var element2 = charData[name].element2;
			if (element2 == undefined){
				element2 = element1;
			}
			var bgColor1 = elementData[element1].hex;
			var bgColor2 = elementData[element2].hex;
			var bgHtml = 'linear-gradient(to bottom right, '+bgColor1+' 0%,'+bgColor1+' 50%,'+bgColor2+' 50%,'+bgColor2+' 100%)';
			return bgHtml;
		},
		dragItem(item) {
			this.drag = item;
		},
		dropItem(item) {
			const indexItem = this.evobeasts.indexOf(this.drag);
			const indexTarget = this.evobeasts.indexOf(item);
			this.evobeasts.splice(indexItem, 1);
			this.evobeasts.splice(indexTarget, 0, this.drag);
		},
	},
});
