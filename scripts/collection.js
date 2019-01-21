function createListItem(data, moveable) {
	var list = document.getElementById('evobeastList');
	var li = document.createElement('li');
	var img = new Image();
	var canvas = document.createElement('canvas');
	canvas.width = 64;
	canvas.height = 64;
	canvas.style.padding = 0;
	canvas.style.margin= 0;
	var ctx = canvas.getContext('2d');
	var element = evobeastData[data.evobeast].element1;
	console.log(element);
	var bgColor = elementData[element].hex;
	var html = `<table class="evobeastData" style="border-spacing:0; border:10px solid `+bgColor+`;">
			<tr>
				<th bgcolor="#000" rowspan="3"></th>
				<td class="tableBreak" width="2" rowspan="3" style="background-color:`+bgColor+`;"></td>
				<td colspan="2">`+data.name+`</td>
				<td class="tableBreak" width="2" rowspan="3" style="background-color:`+bgColor+`;"></td>
				<td>L</td>
				<td>99</td>
			</tr>
			<tr>
				<td class="tableBreak" height="2" colspan="5" style="background-color:`+bgColor+`;"></td>
			</tr>
			<tr>
				<td>HP</td>
				<td>9999</td>
				<td>MP</td>
				<td>99</td>
			</tr>
			<tr>
			</tr>
		</table>`;
	li.innerHTML = html;
	var cell = li.getElementsByTagName('th');
	cell[0].appendChild(canvas);
	img.src = 'images/evobeasts/spr_'+data.evobeast+'_large.png';
	spr = sprite({
		width: 64,
		height: 64,
		stretch: 1,
		image: img,
		context: ctx,
	});
	spr.render();
	if (moveable) {
		li.onmouseup = function(){insertList(li.id);};
		li.onmousedown = function(){grabListItem(li.id);};
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
	var moveItem = document.getElementById('move').children[0];
	var data = moveItem.data;
	document.getElementById('move').removeChild(moveItem);
	var li = createListItem(data, true);	
	list.insertBefore(li, item);
	setListIds();
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
