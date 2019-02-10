function loadCollection(name) {
	var name = name || '';
	let header = new Headers();
	header.append('Content-Type', 'application/x-www-form-urlencoded');
	let url = "http://h2zgames.com/evobeast-api/loadCollection.php";
	fetch(url, {
		method: 'post',
		body: 'name='+name,
		headers: header,
	})
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);
		for (let i in json.collection) {
			let item = json.collection[i];
			addListItem(item);
		}
	});

}

function createListItem(data, moveable) {
	console.log(data);
	var list = document.getElementById('evobeastList');
	var li = document.createElement('li');
	var img = new Image();
	var canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;
	canvas.style.padding = 0;
	canvas.style.margin= 0;
	if (data.name === '') {
		data.name = data.evobeast;
	}
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	var element1 = charData[data.evobeast].element1;
	var element2 = charData[data.evobeast].element2;
	if (element2 == undefined){
		element2 = element1;
	}
	var bgColor1 = elementData[element1].hex;
	var bgColor2 = elementData[element2].hex;
	var bgHtml = 'background: linear-gradient(to bottom right, '+bgColor1+' 0%,'+bgColor1+' 50%,'+bgColor2+' 50%,'+bgColor2+' 100%);'
	var html = `<div class="evobeast-container" style="`+bgHtml+`">
		<div class="evobeast-img"></div>
		<div class="evobeast-item evobeast-name">`+data.name+`</div>
		<div class="evobeast-item">L. `+data.level+`</div>
		<div class="evobeast-item">HP: `+data.vitality+`</div>
		<div class="evobeast-item">MP: `+data.spirit+`</div>
	</div>`;

	li.innerHTML = html;
	var cell = li.getElementsByClassName('evobeast-img');
	cell[0].appendChild(canvas);
	var family = charData[data.evobeast].family;
	img.src = '/images/evobeasts/'+family+'/'+data.evobeast+'.png';
	spr = sprite({
		width: 64,
		height: 64,
		stretch: 1,
		image: img,
		context: ctx,
	});
	spr.init();
	if (moveable) {
		li.onmouseup = function(){insertList(li.id);};
		canvas.onmousedown = function(){grabListItem(li.id);};
	}
	tds = li.getElementsByTagName('td');
	for (td in tds) {
		tds[td].onmousedown = function() {window.location.href = 'evobeastStats.html';};
	}
	li.data = data;
	return li;
}
function addListItem(data) {
	var list = document.getElementById('evobeastList');
	var li = createListItem(data, true);
	list.appendChild(li);
	setListIds();
}
function setListIds() {
	var list = document.getElementById('evobeastList');
	var lis = list.getElementsByTagName('li');
	for (var  i = 0; i < lis.length; ++i) {
		var li = lis[i];
		li.id = ''+i;
	}
}
function insertList(myId) {
	var item = document.getElementById(myId);
	var list = item.parentElement;
	var moveList = document.getElementById('move');
	if (moveList.children.length > 0) {
		var moveItem = document.getElementById('move').children[0];
		var data = moveItem.data;
		document.getElementById('move').removeChild(moveItem);
		var li = createListItem(data, true);	
		list.insertBefore(li, item);
		setListIds();
	}
}
function returnListItem() {
	var move = document.getElementById('move').children[0];
	var returnItem = moveDiv.cloneNode('true');
	var myId = move.id;
}
function grabListItem(myId) {
	if (document.getElementById('move').getElementsByTagName('li').length == 0) {
		var moveDiv = document.getElementById('move');
		var item = document.getElementById(myId);
		var moveItem = createListItem(item.data, false); 
		var rect = item.getBoundingClientRect();
		xShift = rect.left - event.clientX;
		yShift = rect.top - event.clientY;
		moveDiv.appendChild(moveItem);
		item.parentElement.removeChild(item);
	}
}
