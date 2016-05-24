var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(416, 416, {backgroundColor: 0x352912});
gameport.appendChild(renderer.view);

PIXI.loader
    .add("Blip_Select.mp3")
    .add("titlemusic.wav")
    .load(ready);

		var blip;
		function ready() {
		    blip =PIXI.audioManager.getAudio("Blip_Select.mp3");
        titlemusic =PIXI.audioManager.getAudio("titlemusic.wav");
			}

// set up stage and main pixi containers for sprites in the game
var stage = new PIXI.Container();
var character1 = new PIXI.Container();
var yas = new PIXI.Container();
var villains = new PIXI.Container();
var blocks = new PIXI.Container();
stage.addChild(character1);
stage.addChild(yas);
stage.addChild(blocks);
stage.addChild(villains);

var titlescreen = new PIXI.Container();
titlescreen.visible=1;
var title = new PIXI.Text("PLAY");
title.position.x=200;
title.position.y=200;
title.anchor.x=.5;
title.anchor.y=.5;
title.interactive=true;
title.on('mousedown',mouseHandler);
titlescreen.addChild(title);
stage.addChild(titlescreen);

function mouseHandler(){
    title.visible=0;
		title1.visible=0;
		title2.visible=0;
    titlemusic.play();
    game.visible=1;

}
var title1 = new PIXI.Text("Credits");
title1.position.x=200;
title1.position.y=250;
title1.anchor.x=.5;
title1.anchor.y=.5;
title1.interactive=true;
title1.on('mousedown',mouseHandler1);
titlescreen.addChild(title1);
stage.addChild(titlescreen);

function mouseHandler1(){
	title.visible=0;
	title1.visible=0;
	title2.visible=0;
	credits.visible=1;
  blip.play();
	game.visible=1;
}
var title2 = new PIXI.Text("Tutorial");
title2.position.x=200;
title2.position.y=300;
title2.anchor.x=.5;
title2.anchor.y=.5;
title2.interactive=true;
title2.on('mousedown',mouseHandler2);
titlescreen.addChild(title2);
stage.addChild(titlescreen);

function mouseHandler2(){
	title.visible=0;
	title1.visible=0;
	title2.visible=0;
  blip.play();
	tutorial.visible=1;
	//blip.play();
}

var credits = new PIXI.Text("Hayden Aupperle\n and \n I dunno");
credits.visible=0;
credits.position.x=200;
credits.position.y=200;
credits.anchor.x=.5;
credits.anchor.y=.5;
credits.interactive=true;
credits.on('mousedown',mouseHandler3);
titlescreen.addChild(credits);
stage.addChild(titlescreen);

function mouseHandler3(){
	title.visible=1;
	title1.visible=1;
	title2.visible=1;
  blip.play();
	credits.visible=0;
	//blip.play();

}

var tutorial = new PIXI.Text("Use WASD to get to the end\n Avoid the Villains\n And Get the Coin");
tutorial.visible=0;
tutorial.position.x=200;
tutorial.position.y=200;
tutorial.anchor.x=.5;
tutorial.anchor.y=.5;
tutorial.interactive=true;
tutorial.on('mousedown',mouseHandler4);
titlescreen.addChild(tutorial);
stage.addChild(titlescreen);

function mouseHandler4(){
	title.visible=1;
	title1.visible=1;
	title2.visible=1;
  blip.play();
	tutorial.visible=0;
	//blip.play();
}
// global variables to keep track of number of villains and blocks
var totalvillains = 0;
var totalblocks = 0;
var winstate = 0; // 0 = no win; 1 = win; 2 = lose

// fill the map with sprites
placeSprite(0, 0, 0); placeSprite(3, 7, 7); placeSprite(2, 0, 3); placeSprite(1, 6, 4); placeSprite(1, 2, 6);
placeSprite(1, 0, 1); placeSprite(2, 2, 3); placeSprite(1, 0, 2); placeSprite(1, 0, 4); placeSprite(1, 0, 5);
placeSprite(1, 0, 6); placeSprite(2, 3, 2); placeSprite(1, 2, 2); placeSprite(1, 3, 3); placeSprite(1, 3, 4);
placeSprite(1, 1, 4); placeSprite(1, 2, 4); placeSprite(1, 5, 1); placeSprite(1, 6, 1); placeSprite(1, 6, 2);
placeSprite(1, 6, 3); placeSprite(1, 5, 4); placeSprite(1, 5, 5); placeSprite(1, 5, 6); placeSprite(1, 4, 6);
placeSprite(1, 5, 3); placeSprite(1, 5, 2); placeSprite(1, 2, 0); placeSprite(1, 7, 6); placeSprite(1, 3, 6);
placeSprite(1, 0, 7); placeSprite(2, 6, 5); placeSprite(1, 3, 6); placeSprite(1, 3, 6); placeSprite(1, 2, 2);
placeSprite(1, 3, 0); placeSprite(1, 2, 0);

// places sprites on map given the sprite type, x position, and y position
// think of the map as an 8x8 grid
function placeSprite(type, x_pos, y_pos) {

	var sprite;

	if (type == 0) { // character
		sprite = new PIXI.Sprite(PIXI.Texture.fromImage("character1.png"));
		character1.addChild(sprite);
	}
	else if (type == 1) { // block
		sprite = new PIXI.Sprite(PIXI.Texture.fromImage("block.png"));
		blocks.addChild(sprite);
		totalblocks++;
	}
	else if (type == 2) { // villains
		sprite = new PIXI.Sprite(PIXI.Texture.fromImage("villain.png"));
		villains.addChild(sprite);
		totalvillains++;
	}
	else if (type == 3) { // yas
		sprite = new PIXI.Sprite(PIXI.Texture.fromImage("yas.png"));
		yas.addChild(sprite);
	}

	sprite.anchor.x = 0.5;
	sprite.anchor.y = 0.5;
	sprite.position.x = 26 + x_pos * 52;
	sprite.position.y = 26 + y_pos * 52;
}

function keydownEventHandler(e) {

	if (winstate == 0) { // only allow moves if there has not been a win/loss yet
	var character1sprite = character1.getChildAt(0);
	var new_position = new PIXI.Point(character1sprite.position.x, character1sprite.position.y);

  if ((e.keyCode == 87) && (character1sprite.position.y > 20)) { // W key
		new_position.y = character1sprite.position.y - 8;
		new_position.x = character1sprite.position.x;
  }
  else if ((e.keyCode == 83) && (character1sprite.position.y < 400)) { // S key
    new_position.y = character1sprite.position.y + 8;
		new_position.x = character1sprite.position.x;
  }
  else if ((e.keyCode == 65) && (character1sprite.position.x > 20)) { // A key
    new_position.x = character1sprite.position.x - 8;
		new_position.y = character1sprite.position.y;
  }
	else if ((e.keyCode == 68) && (character1sprite.position.x < 400)) { // D key
    new_position.x = character1sprite.position.x + 8;
		new_position.y = character1sprite.position.y;
  }

	var result = checkCollisions(new_position);
	if (result == 0) { // no collisions found
		character1sprite.position.y = new_position.y;
		character1sprite.position.x = new_position.x;
	}
	else if (result == 1) { // hit block
		//blip.play();
	}
	else if (result == 2) { // hit villain
		character1sprite.position.y = new_position.y;
		character1sprite.position.x = new_position.x;
		//blip.play()
		winstate = 2;
		title1.visible=1;
	}
	else if (result == 3) { // hit coin
		character1sprite.position.y = new_position.y;
		character1sprite.position.x = new_position.x;
		winstate = 1;
    blip.play();
    alert('YOU Won\nGood Job!!');
	}
	}
}

// helper function to check for collisions
// 0 = no collision; 1 = block collision; 2 = villain collision; 3 = coin collision
function checkCollisions(new_position) {

	var distance;

	// check for collision with blocks
	for (i = 0; i < totalblocks; i++) {
		var block = blocks.getChildAt(i);
		distance = block.toLocal(new_position);
		distance.y = Math.abs(distance.y);
		distance.x = Math.abs(distance.x);
		if ((distance.y <= (block.height/2 + character1.height/2)) // check vertical collision
				&&
				(distance.x <= (block.width/2 + character1.width/2))) {
				//	blip.play();// check horizontal collision
			return 1; // found a collision, return immediately
		}
	}

	// check for collision with villains
	for (i = 0; i < totalvillains; i++) {
		var villain = villains.getChildAt(i);
		distance = villain.toLocal(new_position);
		distance.y = Math.abs(distance.y);
		distance.x = Math.abs(distance.x);
		if ((distance.y <= (villain.height/2 + character1.height/2)) // check vertical collision
				&&
				(distance.x <= (villain.width/2 + character1.width/2))) { // check horizontal collision
					//blip.play();
			return 2; // found a collision, return immediately
		}
	}

	// check for collision with coin
	var yassprite = yas.getChildAt(0);
	distance = yassprite.toLocal(new_position);
	distance.y = Math.abs(distance.y);
	distance.x = Math.abs(distance.x);
	if ((distance.y <= (yas.height/2 + character1.height/2)) // check vertical collision
			&&
			(distance.x <= (yas.width/2 + character1.width/2))) { // check horizontal collision
		return 3; // collided with coin
	}

	return 0; // no collisions found
}

document.addEventListener('keydown', keydownEventHandler);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
animate();
