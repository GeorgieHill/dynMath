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
    wind.src = './img/wind50.png';

    var water = new Image();
    water.src = './img/water50.png';

    var earth = new Image();
    earth.src = './img/rock50.png';

    var bookImg = new Image();
    bookImg.src = './img/book250.png';

    var leftArrow = new Image();
    leftArrow.src = './img/leftarrow.png';

    var rightArrow = new Image();
    rightArrow.src = './img/rightarrow.png';

    var wizardImg = new Image();
    wizardImg.src = './img/wizard.png';

    var ogreImg = new Image();
    ogreImg.src = './img/ogre.png';

    var gemImg = new Image();
    gemImg.src = './img/gem.png';

    var ogreSound = new Audio('./sound/ogre.wav');
    var yaySound = new Audio('./sound/yay.mp3');

	//How many frames per second we are trying to run
	var FPS = 30;
    var frameCount = 0;

    var timer = 30;
    var startTimer = false;

    //this is how the game will run; running update and draw every "frame"
	setInterval(function() {
		update();
		draw();
	}, 1000/FPS);

    //enum for game states
	var gameState = {
        StartBattle: 1,
        InBattle: 2,
        EndBattle: 3,
        Victory: 4,
        Defeat: 5
	};
    var curGameState = gameState.StartBattle;

    //enum for battle stats
	var battleState = {
        NewSpell: 1,
        CreatingSpell: 2,
        CastingSpell: 3,
        DamageEnemy: 4,
        DamagePlayer: 5
	};
	var curBattleState = battleState.NewSpell;

    //all the elements
  	var allElements = [];
    //current elements on screen
  	var curElements = [];

    var curGems = [];

    //player information
	var player = {
	  color: "#00A",
	  curHealth: 10,
      maxHealth: 10,
	  width: 64,
	  height: 128,
	  x: 150,
	  y: 175,
	  draw: function() {
	    canvas.fillStyle = this.color;
        canvas.drawImage(wizardImg, this.x, this.y);
        canvas.fillStyle = "#000";
        canvas.font = "20px sans-serif";
        canvas.fillText(this.curHealth.toString() + "/" + this.maxHealth.toString(), this.x, this.y+this.height+15);
        
	    //canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	  },
      takeDamage: function(dmg){
        console.log("player took " + dmg + " damage");
        this.curHealth -= dmg;

        if(this.curHealth <= 0){
            //ClearCurrentSpell(currentRecipe);
            //ClearCurrentSpell(currentSpell);
            curGameState = gameState.EndBattle;
            curEnemy = undefined;
        }
        else{
            ClearCurrentSpell(currentSpell);
            curBattleState = battleState.CreatingSpell;
        }
      }
	};

    var staticGem = {
        gemCount: 0,
        x: 0,
        y: 0,
        draw: function() {
          canvas.fillStyle = this.color;
          canvas.drawImage(gemImg, this.x, this.y);
          canvas.fillStyle = "#000";
          canvas.font = "40px sans-serif";
          canvas.fillText(this.gemCount.toString(), this.x+40, this.y+35);
        }
    }
    //enemy information
	function Enemy(I){
	  I = I || {};
      var tempNumb = randNumber();
	  I.curHealth = tempNumb;
	  I.maxHealth = tempNumb;

	  I.color = "#0A0";

	  I.x = 350;
	  I.y = 175;

      I.startX = 625;
      I.startY = 0;

	  I.width = 64;
	  I.height = 128;

      I.dead = false;

	  I.draw = function() {
        if(I.isDead){
            I.startX -= 10;

            if(I.startX < -100){
                curGameState = gameState.EndBattle;
                curEnemy = undefined;
            }
        }
        else{
            if(I.startX != I.x)
                I.startX -= 20;

            if(I.startX < I.x)
                I.startX = I.x;

            if(I.startY != I.y)
                I.startY += 20;

            if(I.startY > I.y)
                I.startY = I.y;
        }

	    canvas.fillStyle = this.color;
        canvas.drawImage(ogreImg, this.startX, this.startY);
		//canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
        if(I.inPlace() && I.curHealth > 0){
	      canvas.fillStyle = "#000";
          canvas.font = "20px sans-serif";
	  	  canvas.fillText(this.curHealth.toString() + "/" + this.maxHealth.toString(), this.x, this.y+this.height+15);
        }
	  };

	  I.update = function() {
	  };

	  I.takeDamage = function(dmg){
        console.log("enemy took " + dmg + " damage");
        I.curHealth -= dmg;

        if(I.curHealth <= 0){
            ClearCurrentSpell(currentRecipe);
            ClearCurrentSpell(currentSpell);
            CreateGems(I.maxHealth);
            //yaySound.play();
            startTimer = false;
        }
        else{
            ClearCurrentSpell(currentSpell);
            curBattleState = battleState.CreatingSpell;
        }
	  }

      I.inPlace = function(){
        if(I.x == I.startX && I.y == I.startY)
            return true;
        else
            return false;
      }

	  return I;
	}

    function Gem(I) {
      I = I || {};

      I.x = 0;
      I.y = 0;
      I.startX = 350 + Math.random() * 50;
      I.startY = 175 + Math.random() * 128;
      I.speed = (Math.random() * 7) + 8;
      I.inPlace = false;
      I.addedScore = false;

      I.draw = function() {
        if(I.startX < I.x)
            I.startX += I.speed;
        else if(I.startX > I.x)
            I.startX -= I.speed;
        
        if(Math.abs(I.startY - I.y) < 11 && Math.abs(I.startX - I.x) < 11){
            if(!I.addedScore){
                staticGem.gemCount += 10;
                I.addedScore = true;
            }
        }

        if(Math.abs(I.startY - I.y) < 8 && Math.abs(I.startX - I.x) < 8){
            I.startX = I.x;
            I.startY = I.y;
            I.inPlace = true;
        }

        if(I.startY < I.y)
            I.startY += I.speed-5;
        else if(I.startY > I.y)
            I.startY -= I.speed-(Math.random()*3+2);

        canvas.drawImage(gemImg, I.startX, I.startY);
      };

      I.update = function() {
      };

      return I;
    };

    function CreateGems(amount){
        for(var i = 0; i < amount; i++){
            curGems.push(Gem());
        }
    }

    function CheckGems(){
        var rightCount = 0;

        curGems.forEach(function(g) {
            if(g.inPlace)
                rightCount++;
        });

        if(rightCount == curGems.length)
            return true;
        else
            return false;
    }

	var curEnemy;// = Enemy();

    //this is the temp bookImg object
	var book = {
		color: "#A00",
		width: 450,
		height: 250,
		x: 75,
		y: 325,
		draw: function() {
		    canvas.fillStyle = this.color;
            canvas.drawImage(bookImg, this.x, this.y);
		    //canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

    //cast the spell!
    var castButton = {
        color: "#AAA",
        width: 150,
        height: 50,
        x: 225,
        y: 140,
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
                    curBattleState = battleState.DamageEnemy;
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
            canvas.drawImage(leftArrow, this.x, this.y);
		    //canvas.fillRect(this.x, this.y, this.width, this.height);
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
            canvas.drawImage(rightArrow, this.x, this.y);
		    //canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

    var currentRecipe = {

    }

    var currentSpell = {

    }

    var spellScale = 1;

    function PlusMinus(I, element, number, x, y) {
      I = I || {};

      I.element = element;
      I.number = number;

      I.color = "#000";

      I.x = x;
      I.y = y;

      I.width = 23;
      I.height = 23;

      I.draw = function() {
        canvas.fillStyle = I.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.fillStyle = "#FFF";

        var sign = "+";
        if(number < 0)
            sign = "-";

        canvas.font = "20px sans-serif";
        canvas.fillText(sign, this.x+8, this.y+18);
        //canvas.fillText(I.number.toString()+"x", I.startX, I.startY+I.height);
      };

      return I;
    };

    //constructor for all the elements
	function Element(I, element, number, x, y, startX, startY, img, inBook) {
	  I = I || {};

	  I.element = element;
	  I.number = number;
      I.img = img;
	  I.color = "#A2B";

	  I.x = x;
	  I.y = y;
      I.startX = startX;
      I.startY = startY;

      if(inBook){
          I.plus = PlusMinus(I.plus, I.element, I.number, I.x, I.y+65);
          I.minus = PlusMinus(I.minus, I.element, -I.number, I.x+27, I.y+65);
      }

	  I.width = 60;
	  I.height = 60;

	  I.draw = function() {
        if(Math.abs(I.startX - I.x) < 11)
            I.startX = I.x;
        else{
            if(I.startX < I.x)
                I.startX += 20;
            else if(I.startX > I.x)
                I.startX -= 20;
        }

        if(Math.abs(I.startY - I.y) < 11)
            I.startY = I.y;
        else{
            if(I.startY < I.y)
                I.startY += 20;
            else if(I.startY > I.y)
                I.startY -= 20;
        }

        if(inBook){
            I.plus.draw();
            I.minus.draw();
        }

        canvas.drawImage(I.img, I.startX, I.startY);
	    canvas.fillStyle = "#000";
        canvas.font = "20px sans-serif";
	  	canvas.fillText(I.number.toString()+"x", I.startX, I.startY+I.height);
	  };

	  I.update = function() {
	  };

	  I.setActive = function(){
	  	//this.active = !this.active;
	  }

      I.inPlace = function(){
        if(I.x == I.startX && I.y == I.startY)
            return true;
        else
            return false;
      }

	  return I;
	};

    //creating the spells
	function CreateElement (element, number, x, y, startX, startY,  img, inBook) {
		var tempElem = Element(tempElem, element, number, x, y, startX, startY, img, inBook);
		return tempElem;
	}

	allElements.push(CreateElement("Fire", 1, 90, 355, 90, 355, fire, true));
	allElements.push(CreateElement("Fire", 5, 160, 355, 160, 355, fire, true));
	allElements.push(CreateElement("Fire", 10, 230, 355, 230, 355, fire, true));

	allElements.push(CreateElement("Wind", 1, 90, 455, 90, 455, wind, true));
	allElements.push(CreateElement("Wind", 5, 160, 455,  160, 455, wind, true));
	allElements.push(CreateElement("Wind", 10, 230, 455, 230, 455, wind, true));

	allElements.push(CreateElement("Water", 1, 315, 355, 315, 355, water, true));
	allElements.push(CreateElement("Water", 5, 385, 355, 385, 355, water, true));
	allElements.push(CreateElement("Water", 10, 455, 355, 455, 355, water, true));

	allElements.push(CreateElement("Earth", 1, 315, 455, 315, 455, earth, true));
	allElements.push(CreateElement("Earth", 5, 385, 455, 385, 455, earth, true));
	allElements.push(CreateElement("Earth", 10, 455, 455, 455, 455, earth, true));

    //This is where the game will generate a new spell recipes
	function GenerateNewRecipe(){
        currentRecipe['Damage'] = 1;

        var temp = Math.floor(Math.random()*4);

        currentRecipe['Fire'] = CreateElement("Fire", randNumber(), 430, 0, -50, 0, fire, false);
        currentRecipe['Earth'] = CreateElement("Earth", randNumber(), 380, 0, -150, 0, earth, false);
        currentRecipe['Wind'] = CreateElement("Wind", randNumber(), 330, 0, -250, 0, wind, false);
        currentRecipe['Water'] = CreateElement("Water", randNumber(), 330, 0, -250, 0, water, false);
	}



    function RecipeInPlace(){
        var inP = false;

        for(var k in currentRecipe){
            if(k!="Damage"){
                inP = currentRecipe[k].inPlace()

                if(!inP)
                    return inP;
            }
        }

        return inP;
    }

    function ClearCurrentSpell(obj){
        for (var k in obj){ // Loop through the object
            delete obj[k];  // Delete obj[key];
        }
    }

    function CheckCurrentSpell(obj){
        for (var k in obj){ // Loop through the object
            if(obj[k].number <= 0)
                delete obj[k];  // Delete obj[key];
        }
    }

	function update() {
        if(startTimer){
            if(frameCount % 30 == 0){
                timer--;
                frameCount = 0;
            }

            if(timer == 0){
                curBattleState = battleState.DamagePlayer;
            }

            frameCount++;
        }

        if(curGems.length>0){
            var noMoreGems = CheckGems();
            //console.log("checking gems = " + noMoreGems);
            if(noMoreGems){
                curEnemy.isDead = true;
                console.log("resetting gems");
                curGems = [];
            }
        }
        
		switch(curGameState){
			case (gameState.StartBattle):
                if(curEnemy == null){
                    //ogreSound.play();
                    curEnemy = Enemy();
                }

                if(curEnemy.inPlace()){
                    curGameState = gameState.InBattle;
                    curBattleState = battleState.NewSpell;
                    timer = 30;
                    frameCount = 0;
                } 

                console.log("start battle");
			break;
			case (gameState.InBattle):
                //we are in battle
				switch(curBattleState){
					case(battleState.NewSpell):
                        if(Object.keys(currentRecipe).length == 0)
						  GenerateNewRecipe();
                        //ClearCurrentSpell(currentRecipe);
                        //console.log("setting to creating spell");
                        if(RecipeInPlace()){
                            startTimer = true;
                            curBattleState = battleState.CreatingSpell;
                        }
                        //console.log("new spell");
					break;
					case(battleState.CreatingSpell):
                        CheckCurrentSpell(currentSpell);
                        //logic for players to do what they want with the elements
                        //console.log("creating spell");
					break;
					case(battleState.CastingSpell):
                        //animation of casting spell
                        console.log('casting');
                        curBattleState = battleState.DamageEnemy;
                        //console.log("casating spell");
					break;
					case(battleState.DamageEnemy):
                        curEnemy.takeDamage(currentRecipe['Damage']*spellScale);
					break;
                    case(battleState.DamagePlayer):
                        player.takeDamage(1);
                        timer = 30;
                        frameCount = 0;
                        curBattleState = battleState.CreatingSpell;
                    break;
				}
			break;
			case (gameState.EndBattle):
                curGameState = gameState.StartBattle;
			break;
		}
	}

	function draw() { 
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        canvas.drawImage(bg,0,0);
        
		player.draw();
        staticGem.draw();

        if(curEnemy != null)
		  curEnemy.draw();

        book.draw();

		rightButton.draw();
		leftButton.draw();

        if(Object.keys(currentSpell).length > 0)
            castButton.draw();

        if(Object.keys(currentRecipe).length > 0){
            for(var k in currentRecipe){
                if(k!="Damage")
                    currentRecipe[k].draw();
                else{ 
                    if(RecipeInPlace()){    
                        canvas.fillStyle = "#000";
                        canvas.font = "20px sans-serif";  
                        canvas.fillText("= "+currentRecipe[k] + " Damage", 485, 30);
                    }
                }
            }
        }

        if(startTimer){
            var centerX = 50;
            var centerY = 95;
            var radius = 30;

            canvas.beginPath();
            canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI * (timer/30), false);
            //canvas.fillStyle = 'green';
            //canvas.fill();
            canvas.lineWidth = 23;
            if(timer > 10)
                canvas.strokeStyle = 'green';
            else
                canvas.strokeStyle = 'red';

            canvas.stroke();

            canvas.fillStyle = "#000";
            canvas.font = "30px sans-serif";  
            canvas.fillText(timer.toString(), 35, 105);
        }

        for(var s in currentSpell){
            currentSpell[s].draw();
        }

		allElements.forEach(function(ele) {
			ele.draw();
		});

        if(curGems.length > 0){
            curGems.forEach(function(g) {
                g.draw();
            });
        }
	}

	$('#myCanvas').click(function (e) {
	    var clickedX = e.pageX - this.offsetLeft;
	    var clickedY = e.pageY - this.offsetTop;
	    
	    if (clickedX < (leftButton.x+leftButton.width) && clickedX > leftButton.x && clickedY > leftButton.y && clickedY < (leftButton.y+leftButton.height)) {
	        //curBattleState = battleState.CreatingSpell;
            //alert ('turn page left');
	    }

	    if (clickedX < (rightButton.x+rightButton.width) && clickedX > rightButton.x && clickedY > rightButton.y && clickedY < (rightButton.y+rightButton.height)) {
	        //curBattleState = battleState.DamageEnemy;
            //alert ('turn page right');
	    }

        if (clickedX < (castButton.x+castButton.width) && clickedX > castButton.x && clickedY > castButton.y && clickedY < (castButton.y+castButton.height)) {
            castButton.checkCast();
        }

        if(curBattleState == battleState.CreatingSpell){
    	    allElements.forEach(function(selEle) {
    			if (clickedX < (selEle.plus.x+selEle.plus.width) && clickedX > selEle.plus.x && clickedY > selEle.plus.y && clickedY < (selEle.plus.y+selEle.plus.height)) {
	                var found = false;
                    for (var k in currentSpell){
                        if(k == selEle.plus.element)
                        {
                            found = true;
                            currentSpell[k].number += selEle.plus.number;
                        }
                    }

                    if(!found){
                        currentSpell[selEle.plus.element] = CreateElement(selEle.plus.element, selEle.plus.number, 430-Object.keys(currentSpell).length*50, 60, selEle.x, selEle.y, selEle.img, false);
                    }
    		    }
                
                if (clickedX < (selEle.minus.x+selEle.minus.width) && clickedX > selEle.minus.x && clickedY > selEle.minus.y && clickedY < (selEle.minus.y+selEle.minus.height)) {
                    for (var k in currentSpell){
                        if(k == selEle.minus.element)
                        {
                            found = true;
                            currentSpell[k].number += selEle.minus.number;
                        }
                    }
                }
    		});
        }
	});
});