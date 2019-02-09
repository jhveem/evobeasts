var canvas = document.getElementById('mapEditor');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

var mapWidth = 40;
var mapHeight = 40;
var GRID_SIZE = 16;
var STRETCH = 2;
var STRETCH_GRID = GRID_SIZE * STRETCH;
var grids = {};
var instTypes = ['inst','evobeast', 'tamer', 'treasure','special'];
var instList =[]; 
var WIDTH = 640;
var HEIGHT = 640;
var x_shift = 0;
var y_shift = 0;
var viewX = 0;
var viewY = 0;
var tiles = {};
var tilesets = {};	
var walls = {};
var instSprites = {};
var charSprites = {};
var tamerSprites = {};
var FOCUS = {};
var background = '';
var DIRS = ['up', 'down', 'left', 'right'];
var keyCheck = [];

initMapVars();

setInterval(update, 30);
function update() {
	renderMap();
};
