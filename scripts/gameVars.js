var canvas = document.getElementById('game-screen');
var ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.font = "16px VT323";
ctx.fillText('',0,0);

var mapWidth = 40;
var mapHeight = 40;
var GRID_SIZE = 16;
var STRETCH = 2;
var STRETCH_GRID = GRID_SIZE * STRETCH;
var PAUSE = false;
var grids = {};
var instTypes = ['inst','evobeast', 'tamer', 'item','special'];
var specialTypes = {'door':{}};
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
var itemSprites = {};
var tamerSprites = {};
var FOCUS = {};
var background = '';
var DIRS = ['up', 'down', 'left', 'right'];
var keyCheck = [];
var playerX = -1;
var playerY = -1;
var playerDir = '';
var playerMap = '';


