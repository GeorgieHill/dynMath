$(document).ready(function() {



});

$(document).ready(function() {
// Happens when the mouse is clicked in the canvas


	var CANVAS_WIDTH = 600;
	var CANVAS_HEIGHT = 600;

	var canvasElement = $("<canvas id = 'myCanvas' width='" + CANVAS_WIDTH + 
	                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');

	var FPS = 30;

	var gameState = {
         startBattle: 1,
         inBattle: 2,
         endBattle: 3,
         victory: 4,
         defeat: 5
	};

	var battleState = {
         NewSpell: 1,
         CreatingSpell: 2,
         CastingSpell: 3,
         Damages: 4
	};

	var curGameState = gameState.startBattle;
	var curBattleState = battleState.NewSpell;

  	var enemies = [];
  	var allElements = [];

  	var curElements = [];

	setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);

	var player = {
	  color: "#00A",
	  heath: 10,
	  width: 64,
	  height: 128,
	  x: 175,
	  y: 200,
	  draw: function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	  }
	};

	function Enemy(I){
	  I = I || {};

	  I.curHealth = 1;
	  I.maxHealth = 1;

	  I.color = "#0A0";

	  I.x = 425;
	  I.y = 200;

	  I.width = 64;
	  I.height = 128;

	  I.draw = function() {
	    canvas.fillStyle = this.color;
		canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	    canvas.fillStyle = "#000";
	  	canvas.fillText(this.curHealth.toString() + "/" + this.maxHealth.toString(), this.x-(this.width/2), this.y-(this.height/2)+this.height+8);
	  };

	  I.update = function() {
	  	if(health <= 0){
	  		I = undefined;
	  	}
	  };

	  I.takeDamage = function(){
	  	//this.active = !this.active;
	  }

	  return I;
	}

	var curEnemy = Enemy();

	/*var tempEnemy = {
		color: "#0A0",
		width: 64,
		height: 128,
		x: 425,
		y: 200,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
		}
	};*/

	var tempBook = {
		color: "#A00",
		width: 450,
		height: 250,
		x: 75,
		y: 300,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	var leftButton = {
		color: "#000",
		width: 25,
		height: 50,
		x: 25,
		y: 400,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	var rightButton = {
		color: "#000",
		width: 25,
		height: 50,
		x: 550,
		y: 400,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	function Spell(I, element, number, x, y, leftSide) {
	  I = I || {};

	  I.element = element;
	  I.number = number;

	  I.color = "#A2B";

	  I.x = x;
	  I.y = y;

	  I.width = 40;
	  I.height = 40;

	  I.draw = function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x, this.y, this.width, this.height);
	    canvas.fillStyle = "#000";
	    canvas.fillText(element, this.x, this.y+(this.height/2)+8);
	  	canvas.fillText(number.toString(), this.x, this.y+this.height+8);
	  };

	  I.update = function() {
	  };

	  I.setActive = function(){
	  	//this.active = !this.active;
	  }

	  return I;
	};

	function CreateSpell (element, number, x, y) {
		var tempSpell = Spell(tempSpell, element, number, x, y);
		return tempSpell;
	}

	allElements.push(CreateSpell("Fire", 1, 100, 340));
	allElements.push(CreateSpell("Fire", 5, 170, 340));
	allElements.push(CreateSpell("Fire", 10, 240, 340));

	allElements.push(CreateSpell("Wind", 1, 100, 440));
	allElements.push(CreateSpell("Wind", 5, 170, 440));
	allElements.push(CreateSpell("Wind", 10, 240, 440));

	allElements.push(CreateSpell("Water", 1, 315, 340));
	allElements.push(CreateSpell("Water", 5, 385, 340));
	allElements.push(CreateSpell("Water", 10, 455, 340));

	allElements.push(CreateSpell("Earth", 1, 315, 440));
	allElements.push(CreateSpell("Earth", 5, 385, 440));
	allElements.push(CreateSpell("Earth", 10, 455, 440));

	function GenerateNewSpell(){

	}

	function update() {
		switch(curGameState){
			case (gameState.startBattle):
				//some logic in here
			break;
			case (gameState.inBattle):

				switch(curBattleState){
					case(battleState.NewSpell):
						
					break;
					case(battleState.CreatingSpell):
					break;
					case(battleState.CastingSpell):
					break;
					case(battleState.Damages):
					break;
				}

			break;
		}
	}

	function draw() { 
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		player.draw();
		curEnemy.draw();
		tempBook.draw();

		rightButton.draw();
		leftButton.draw();
		//canvas.font = "10px serif";

		allElements.forEach(function(selectedSpell) {
			selectedSpell.draw();
		});
	}


	$('#myCanvas').click(function (e) {
	    var clickedX = e.pageX - this.offsetLeft;
	    var clickedY = e.pageY - this.offsetTop;
	    //alert(clickedX + " : " + clickedY);
	    if (clickedX < (leftButton.x+leftButton.width) && clickedX > leftButton.x && clickedY > leftButton.y && clickedY < (leftButton.y+leftButton.height)) {
	        alert ('clicked left');
	    }

	    if (clickedX < (rightButton.x+rightButton.width) && clickedX > rightButton.x && clickedY > rightButton.y && clickedY < (rightButton.y+rightButton.height)) {
	        alert ('clicked right');
	    }

	    allElements.forEach(function(selectedSpell) {
			if (clickedX < (selectedSpell.x+selectedSpell.width) && clickedX > selectedSpell.x && clickedY > selectedSpell.y && clickedY < (selectedSpell.y+selectedSpell.height)) {
		        console.log(selectedSpell.element + " : " + selectedSpell.number);
		    }
		});
	});

});