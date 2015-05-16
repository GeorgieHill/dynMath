$(document).ready(function() {



});

$(document).ready(function() {
	//Creating and appending the canvas to the HTML
	var CANVAS_WIDTH = 600;
	var CANVAS_HEIGHT = 600;
	var canvasElement = $("<canvas id = 'myCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('#canDiv');

    var bg = new Image()
    bg.src = './img/colored_castle600.jpg';

	//How many frames per second we are trying to run
	var FPS = 30;

    //this is how the game will run; running update and draw every "frame"
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);

    //enum for game states
	var gameState = {
        startBattle: 1,
        inBattle: 2,
        endBattle: 3,
        victory: 4,
        defeat: 5
	};
    var curGameState = gameState.startBattle;

    //enum for battle stats
	var battleState = {
        NewSpell: 1,
        CreatingSpell: 2,
        CastingSpell: 3,
        Damages: 4
	};
	var curBattleState = battleState.NewSpell;

    //all the elements
  	var allElements = [];
    //current elements on screen
  	var curElements = [];

    //player information
	var player = {
	  color: "#00A",
	  heath: 10,
	  width: 64,
	  height: 128,
	  x: 175,
	  y: 225,
	  draw: function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	  }
	};

    //enemy information
	function Enemy(I){
	  I = I || {};

	  I.curHealth = 1;
	  I.maxHealth = 1;

	  I.color = "#0A0";

	  I.x = 425;
	  I.y = 225;

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

    //this is the temp book object
	var tempBook = {
		color: "#A00",
		width: 450,
		height: 250,
		x: 75,
		y: 325,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

    //button to turn page left
	var leftButton = {
		color: "#000",
		width: 25,
		height: 50,
		x: 25,
		y: 425,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

    //button to turn page right
	var rightButton = {
		color: "#000",
		width: 25,
		height: 50,
		x: 550,
		y: 425,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

    //constructor for all the elements
	function Spell(I, element, number, x, y, leftSide) {
	  I = I || {};

	  I.element = element;
	  I.number = number;

	  I.color = "#A2B";

	  I.x = x;
	  I.y = y;

	  I.width = 60;
	  I.height = 60;

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

    //creating the spells
	function CreateSpell (element, number, x, y) {
		var tempSpell = Spell(tempSpell, element, number, x, y);
		return tempSpell;
	}

	allElements.push(CreateSpell("Fire", 1, 90, 365));
	allElements.push(CreateSpell("Fire", 5, 160, 365));
	allElements.push(CreateSpell("Fire", 10, 230, 365));

	allElements.push(CreateSpell("Wind", 1, 90, 465));
	allElements.push(CreateSpell("Wind", 5, 160, 465));
	allElements.push(CreateSpell("Wind", 10, 230, 465));

	allElements.push(CreateSpell("Water", 1, 315, 365));
	allElements.push(CreateSpell("Water", 5, 385, 365));
	allElements.push(CreateSpell("Water", 10, 455, 365));

	allElements.push(CreateSpell("Earth", 1, 315, 465));
	allElements.push(CreateSpell("Earth", 5, 385, 465));
	allElements.push(CreateSpell("Earth", 10, 455, 465));

    //This is where the game will generate a new spell recipes
	function GenerateNewSpell(){

	}

	function update() {
		switch(curGameState){
			case (gameState.startBattle):
				//some logic in here to create the monster
			break;
			case (gameState.inBattle):
                //we are in battle
				switch(curBattleState){
					case(battleState.NewSpell):
						GenerateNewSpell();
					break;
					case(battleState.CreatingSpell):

					break;
					case(battleState.CastingSpell):

					break;
					case(battleState.Damages):
					break;
				}

			break;
			case (gameState.endBattle):

			break;
			
		}
	}

	function draw() { 
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.drawImage(bg,0,0);
        
		player.draw();
		curEnemy.draw();
		tempBook.draw();

		rightButton.draw();
		leftButton.draw();

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

        if(curBattleState = battleState.CreatingSpell){
    	    allElements.forEach(function(selectedSpell) {
    			if (clickedX < (selectedSpell.x+selectedSpell.width) && clickedX > selectedSpell.x && clickedY > selectedSpell.y && clickedY < (selectedSpell.y+selectedSpell.height)) {
    		        console.log(selectedSpell.element + " : " + selectedSpell.number);
    		    }
    		});
        }
	});

});