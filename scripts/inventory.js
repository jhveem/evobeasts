function createListItem(data, moveable) {
	var list = document.getElementById('inventory');
	var li = document.createElement('inventory-item');
	var img = new Image();
	var canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	canvas.style.padding = 0;
	canvas.style.margin= 0;
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	var description = itemData[data.item].description;
	var name = data.item.replace("_", " ");

	var html = `<div class="item-container"> 
		<div class="item-img"></div>
		<div class="item-item">`+name+`</div>
		<div class="item-description item-item">`+description+`</div>
		<div class="item-item">`+data.quantity+`</div>
	</div>`;

	li.innerHTML = html;
	var cell = li.getElementsByClassName('item-img');
	cell[0].appendChild(canvas);
	img.src = '/images/items/'+data.item+'.png';
	spr = sprite({
		width: 32,
		height: 32,
		stretch: 2,
		image: img,
		context: ctx,
	});
	spr.init();
	if (moveable) {
		li.onmouseup = function(){insertList(li.id);};
		canvas.onmousedown = function(){grabListItem(li.id);};
	}
	li.data = data;
	return li;
}
function addListItem(data) {
	var list = document.getElementById('inventory');
	var li = createListItem(data, true);
	list.appendChild(li);
	setListIds();
}
function setListIds() {
	var list = document.getElementById('inventory');
	var lis = list.getElementsByTagName('inventory-item');
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
	if (document.getElementById('move').getElementsByTagName('inventory-item').length == 0) {
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
