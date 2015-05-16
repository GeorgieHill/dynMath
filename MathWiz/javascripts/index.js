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

    var fire = new Image()
    fire.src = './img/fire50.png';

    var wind = new Image();
    wind.src = './img/wind50.jpg';

    var water = new Image();
    water.src = './img/water50.png';

    var earth = new Image();
    earth.src = './img/rock50.png';

	//How many frames per second we are trying to run
	var FPS = 30;

    //this is how the game will run; running update and draw every "frame"
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);

    //enum for game states
	var gameState = {
        StartBattle: 1,
        inBattle: 2,
        endBattle: 3,
        victory: 4,
        defeat: 5
	};
    var curGameState = gameState.StartBattle;

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
      var tempNumb = randNumber();
	  I.curHealth = tempNumb;
	  I.maxHealth = tempNumb;

	  I.color = "#0A0";

	  I.x = 425;
	  I.y = 225;

	  I.width = 64;
	  I.height = 128;

	  I.draw = function() {
	    canvas.fillStyle = this.color;
		canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	    canvas.fillStyle = "#000";
        canvas.font = "20px sans-serif";
	  	canvas.fillText(this.curHealth.toString() + "/" + this.maxHealth.toString(), this.x-(this.width/2), this.y-(this.height/2)+this.height);
	  };

	  I.update = function() {
	  };

	  I.takeDamage = function(dmg){
        console.log("enemy took " + dmg + " damage");
        I.curHealth -= dmg;
	  	//this.active = !this.active;

        if(I.curHealth <= 0){
            ClearCurrentSpell(currentRecipe);
            ClearCurrentSpell(currentSpell);
            //alert("here");
            curGameState = gameState.endBattle;
            curEnemy = undefined;
        }
        else{
            ClearCurrentSpell(currentSpell);
            curBattleState = battleState.CreatingSpell;
        }
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
    var castButton = {
        color: "#AAA",
        width: 150,
        height: 50,
        x: 225,
        y: 275,
        draw: function() {
            canvas.fillStyle = this.color;
            canvas.fillRect(this.x, this.y, this.width, this.height);
            canvas.fillStyle = "#000";
            canvas.font = "30px sans-serif";
            canvas.fillText("Cast!", this.x+35, this.y+(this.height/2)+10);
        },
        checkCast: function(){
            var success = false;

            for(var r in currentRecipe){
                var eleSuccess = false;

                if(r == "Damage")
                    eleSuccess = true;

                if(r in currentSpell){
                    console.log("spell:" + currentSpell[r].number + " % recipe:" + currentRecipe[r].number + " = "+currentSpell[r].number % currentRecipe[r].number);
                    if(currentSpell[r].number % currentRecipe[r].number == 0)
                        eleSuccess = true;
                }

                success = eleSuccess;

                if(success == false)
                    return;
            }

            if(success == true){
                var passedScale = CheckScale();
                console.log("tesssst " + passedScale);
                if(passedScale == true)
                    curBattleState = battleState.Damages;
            }

            console.log("we cast the spell: " + success);
        }
    };

    //are we scaled uniformly
    function CheckScale(){
        var scaled = false;
        var tempScale = 0;
        console.log("we in scale checker");
        for(var r in currentRecipe){
            if(r != "Damage"){ 
                if(tempScale == 0)
                    tempScale = currentSpell[r].number/currentRecipe[r].number;
                else{
                    var curS = false;

                        if(tempScale == currentSpell[r].number/currentRecipe[r].number)
                            curS = true;

                    scaled = curS;
                }
            }
        }

        if(scaled)
            spellScale = tempScale;

        console.log("we checked scale: " + scaled + " : " + spellScale);
        return scaled;
    }

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

    var currentRecipe = {

    }

    var currentSpell = {

    }

    var spellScale = 1;

    //constructor for all the elements
	function Element(I, element, number, x, y, startX, startY, img) {
	  I = I || {};

	  I.element = element;
	  I.number = number;
      I.img = img;
	  I.color = "#A2B";

	  I.x = x;
	  I.y = y;
      I.startX = startX;
      I.startY = startY;

	  I.width = 60;
	  I.height = 60;

	  I.draw = function() {
        if(I.x < I.startX)
            I.startX -= 20;

        if(y < startY)
            I.startY -= 20;

	    canvas.fillStyle = this.color;
        canvas.drawImage(this.img, this.startX,this.startY);
	    //canvas.fillRect(this.x, this.y, this.width, this.height);
	    canvas.fillStyle = "#000";
        canvas.font = "20px sans-serif";
	    //canvas.fillText(element, this.x, this.y+(this.height/2)+8);
	  	canvas.fillText(this.number.toString()+"x", this.startX, this.startY+this.height);
	  };

	  I.update = function() {
	  };

	  I.setActive = function(){
	  	//this.active = !this.active;
	  }

	  return I;
	};

    //creating the spells
	function CreateElement (element, number, x, y, startX, startY,  img) {
		var tempElem = Element(tempElem, element, number, x, y, startX, startY, img);
		return tempElem;
	}

	allElements.push(CreateElement("Fire", 1, 90, 365, 90, 365, fire));
	allElements.push(CreateElement("Fire", 5, 160, 365, 160, 365, fire));
	allElements.push(CreateElement("Fire", 10, 230, 365, 230, 365, fire));

	allElements.push(CreateElement("Wind", 1, 90, 465, 90, 465, wind));
	allElements.push(CreateElement("Wind", 5, 160, 465,  160, 465, wind));
	allElements.push(CreateElement("Wind", 10, 230, 465, 230, 465, wind));

	allElements.push(CreateElement("Water", 1, 315, 365, 315, 365, water));
	allElements.push(CreateElement("Water", 5, 385, 365, 385, 365, water));
	allElements.push(CreateElement("Water", 10, 455, 365, 455, 365, water));

	allElements.push(CreateElement("Earth", 1, 315, 465, 315, 465, earth));
	allElements.push(CreateElement("Earth", 5, 385, 465, 385, 465, earth));
	allElements.push(CreateElement("Earth", 10, 455, 465, 455, 465, earth));

    //This is where the game will generate a new spell recipes
	function GenerateNewSpell(){
        currentRecipe['Damage'] = 1;
        currentRecipe['Fire'] = CreateElement("Fire", randNumber(), 0, 0, 0, 0, fire);
        currentRecipe['Earth'] = CreateElement("Earth", randNumber(), 50,0, 50, 0, earth);
        currentRecipe['Wind'] = CreateElement("Water", randNumber(), 100,0, 100, 0, wind);
        console.log(Object.keys(currentRecipe));
	}

    function ClearCurrentSpell(obj){
        for (var k in obj){ // Loop through the object
            delete obj[k];  // Delete obj[key];
        }
    }

	function update() {
		switch(curGameState){
			case (gameState.StartBattle):
				//some logic in here to create the monster
                curGameState = gameState.inBattle;
                curBattleState = battleState.NewSpell;
                console.log("start battle");
			break;
			case (gameState.inBattle):
                //we are in battle
				switch(curBattleState){
					case(battleState.NewSpell):
						GenerateNewSpell();
                        //ClearCurrentSpell(currentRecipe);
                        console.log("setting to creating spell");
                        curBattleState = battleState.CreatingSpell;
                        //console.log("new spell");
					break;
					case(battleState.CreatingSpell):
                        //logic for players to do what they want with the elements
                        //console.log("creating spell");
					break;
					case(battleState.CastingSpell):
                        //animation of casting spell
                        console.log('casting');
                        curBattleState = battleState.Damages;
                        //console.log("casating spell");
					break;
					case(battleState.Damages):
                        curEnemy.takeDamage(currentRecipe['Damage']*spellScale);
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
        if(curEnemy != null)
		  curEnemy.draw();
		tempBook.draw();

		rightButton.draw();
		leftButton.draw();

        if(Object.keys(currentSpell).length > 0)
            castButton.draw();

        for(var k in currentRecipe){
            if(k!="Damage")
                currentRecipe[k].draw();
            else{        
                canvas.fillStyle = "#000";
                canvas.font = "20px sans-serif";  
                canvas.fillText("= "+currentRecipe[k] + " damage", 160, 30);
            }
        }

        for(var s in currentSpell){
            currentSpell[s].draw();
        }

		allElements.forEach(function(ele) {
			ele.draw();
		});
	}


	$('#myCanvas').click(function (e) {
	    var clickedX = e.pageX - this.offsetLeft;
	    var clickedY = e.pageY - this.offsetTop;
	    
	    if (clickedX < (leftButton.x+leftButton.width) && clickedX > leftButton.x && clickedY > leftButton.y && clickedY < (leftButton.y+leftButton.height)) {
	        //curBattleState = battleState.CreatingSpell;
            //alert ('turn page left');
	    }

	    if (clickedX < (rightButton.x+rightButton.width) && clickedX > rightButton.x && clickedY > rightButton.y && clickedY < (rightButton.y+rightButton.height)) {
	        //curBattleState = battleState.Damages;
            //alert ('turn page right');
	    }

        if (clickedX < (castButton.x+castButton.width) && clickedX > castButton.x && clickedY > castButton.y && clickedY < (castButton.y+castButton.height)) {
            castButton.checkCast();
        }

        if(curBattleState == battleState.CreatingSpell){
    	    allElements.forEach(function(selEle) {
    			if (clickedX < (selEle.x+selEle.width) && clickedX > selEle.x && clickedY > selEle.y && clickedY < (selEle.y+selEle.height)) {
	                var found = false;
                    for (var k in currentSpell){
                        if(k == selEle.element)
                        {
                            found = true;
                            currentSpell[k].number += selEle.number;
                        }
                    }

                    if(!found){
                        currentSpell[selEle.element] = CreateElement(selEle.element, selEle.number, Object.keys(currentSpell).length*50, 60, Object.keys(currentSpell).length*50, 60, selEle.img);
                    }

                    console.log(Object.keys(currentSpell));
    		    }
    		});
        }
	});
});