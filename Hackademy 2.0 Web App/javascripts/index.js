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

	var message = "Test Text";

	var FPS = 30;
	var frameCount = 0;

  	var enemies = [];

	setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);

	var player = {
	  color: "#00A",
	  width: 64,
	  height: 128,
	  x: 175,
	  y: 200,
	  draw: function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
	  }
	};

	var tempEnemy = {
		color: "#0A0",
		width: 64,
		height: 128,
		x: 425,
		y: 200,
		draw: function() {
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x-(this.width/2), this.y-(this.height/2), this.width, this.height);
		}
	};

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

	var realTempSpell = {
	  active: true,
	  element:"fire",
	  color: "#A2B",
	  x: 100,
	  y: 340,

	  width: 40,
	  height: 40,

	  draw : function() {
	  	if(this.active)
	  	{
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		    canvas.fillRect(this.x + (70), this.y, this.width, this.height);
		    canvas.fillRect(this.x + (140), this.y, this.width, this.height);
	 	}
	  },

	  setActive : function(){
	  	this.active = !this.active;
	  }
	};

	var realTempSpell3 = {
	  active: true,
	  element:"fire",
	  color: "#A2B",
	  x: 100,
	  y: 440,

	  width: 40,
	  height: 40,

	  draw : function() {
	  	if(this.active)
	  	{
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		    canvas.fillRect(this.x + (70), this.y, this.width, this.height);
		    canvas.fillRect(this.x + (140), this.y, this.width, this.height);
	 	}
	  },

	  setActive : function(){
	  	this.active = !this.active;
	  }
	};

	var realTempSpell2 = {
	  active: true,
	  element:"fire",
	  color: "#A2B",
	  x: 315,
	  y: 340,

	  width: 40,
	  height: 40,

	  draw : function() {
	  	if(this.active)
	  	{
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		    canvas.fillRect(this.x + (70), this.y, this.width, this.height);
		    canvas.fillRect(this.x + (140), this.y, this.width, this.height);
	 	}
	  },

	  setActive : function(){
	  	this.active = !this.active;
	  }
	};

	var realTempSpell4 = {
	  active: true,
	  element:"fire",
	  color: "#A2B",
	  x: 315,
	  y: 440,

	  width: 40,
	  height: 40,

	  draw : function() {
	  	if(this.active)
	  	{
		    canvas.fillStyle = this.color;
		    canvas.fillRect(this.x, this.y, this.width, this.height);
		    canvas.fillRect(this.x + (70), this.y, this.width, this.height);
		    canvas.fillRect(this.x + (140), this.y, this.width, this.height);
	 	}
	  },

	  setActive : function(){
	  	this.active = !this.active;
	  }
	};

	function Enemy(I) {
	  I = I || {};

	  I.active = true;
	  I.age = Math.floor(Math.random() * 128);

	  I.firstNumber = Math.round(Math.random()*100);
	  I.secondNumber = Math.round(Math.random()*100);
	  I.answer = this.firstNumber + this.secondNumber;

	  I.color = "#A2B";

	  I.x = CANVAS_WIDTH / 4 + Math.random() * CANVAS_WIDTH / 2;
	  I.y = 0;
	  I.xVelocity = 0
	  I.yVelocity = .5;

	  I.width = 32;
	  I.height = 32;

	  I.inBounds = function() {
	    return I.x >= 0 && I.x <= CANVAS_WIDTH &&
	      I.y >= 0 && I.y <= CANVAS_HEIGHT;
	  };

	  I.draw = function() {
	    canvas.fillStyle = this.color;
	    canvas.fillRect(this.x, this.y, this.width, this.height);
	    canvas.fillStyle = "#000";
	  	canvas.fillText("" + this.firstNumber + " + " + this.secondNumber, this.x, this.y+this.height+8);
	  };

	  I.update = function() {
	    I.x += I.xVelocity;
	    I.y += I.yVelocity;

	    I.xVelocity = 3 * Math.sin(I.age * Math.PI / 64);

	    I.age++;

	    I.active = I.active && I.inBounds();
	  };

	  return I;
	};

	function update() {
	    if(frameCount%60 == 0 ) {
		    //enemies.push(Enemy());
		}

		if(keydown.left)
			realTempSpell.setActive();

		enemies.forEach(function(enemy) {
		    enemy.update();
		});

		enemies = enemies.filter(function(enemy) {
		    return enemy.active;
		});

		frameCount = ++frameCount == 60 ? 0 : frameCount;
	}

	function draw() { 
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		player.draw();
		tempEnemy.draw();
		tempBook.draw();
		realTempSpell.draw();
		realTempSpell2.draw();
		realTempSpell3.draw();
		realTempSpell4.draw();
		rightButton.draw();
		leftButton.draw();
		//canvas.font = "10px serif";

		enemies.forEach(function(enemy) {
			//enemy.draw();
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
	});

});