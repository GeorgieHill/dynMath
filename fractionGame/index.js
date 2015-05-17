var canvas;
var topButton;
var middleButton;
var bottomButton;
var firstHeart;
var secondHeart;
var thirdHeart;
var updateScore;

$(document).ready(function() {
/*	680, 30, 100, 100);

	(680, 150, 100, 100);

680, 270, 100, 100);
*/
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 400;
	var canvasElement = $("<canvas id = 'myCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' style='border:30px double #000000;  padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;'></canvas>");
	canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('#canDiv');

	//How many frames per second we are trying to run
	var FPS = 30;
	var timer = 20;
	var frameCount = 0;
	var startTimer = true;

	//this is how the game will run; running update and draw every "frame"
	setInterval(function() {
		draw();
		update();
	}, 1000/FPS);

	var bolt = new Image();
	bolt.src = './images/bolt.png';

	var scroll = new Image();
	scroll.src = './images/scroll.png';

	var gem = new Image();
	gem.src = './images/gem.png';

	var wizard = new Image();
	wizard.src = './images/wizard.png';

	var brace = new Image();
	brace.src = './images/brace.png';

	var boltPath;

	function Bolt(I, x, y){
	  I = I || {};

	  I.x = x;
	  I.y = y;

      I.startX = 625;
      I.startY = 0;


	  I.draw = function() {
		if(this.x > this.startX)
			this.startX += 20;

		if(this.y > this.startY)
			this.startY += 20;

		canvas.drawImage(bolt, this.startX,this.startY);
	  };

	  return I;
	}

	function CreateBolt(i){

	}
	//var canvas = c.getContext("2d");

	/* Answer Squares
	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 30, 100, 100);

	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 150, 100, 100);

	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 270, 100, 100);
*/

// Hearts #254441 is lost life

	updateScore = {

		draw: function(num) {

			var c = document.getElementById("myCanvas");
			canvas.font = "30px Georgia";
			var gradient= canvas.createLinearGradient(0,0,c.width,0);
			gradient.addColorStop("0.5","#5F38FF");
			gradient.addColorStop("0.58","#FFFFFF");

			canvas.fillStyle = gradient;
			canvas.fillText("Score: " + num ,350,50);
			canvas.drawImage(gem, 300, 15);
			canvas.drawImage(wizard, 350, 140);
			canvas.drawImage(brace, 150, 70);
		}
	}

	firstHeart = {

		draw: function(color) {
			canvas.fillStyle = color;
			canvas.beginPath();
			canvas.moveTo(80,50);
			canvas.bezierCurveTo(75,37,70,25,50,25);
			canvas.bezierCurveTo(20,25,20,62.5,20,62.5);
			canvas.bezierCurveTo(20,80,40,102,75,120);
			canvas.bezierCurveTo(110,102,130,80,130,62.5);
			canvas.bezierCurveTo(130,62.5,130,25,100,25);
			canvas.bezierCurveTo(85,25,75,37,75,40);
			canvas.fill();
		}
	}

	secondHeart = {

		draw: function(color) {
			canvas.fillStyle = color;
			canvas.beginPath();
			canvas.moveTo(80,50+130);
			canvas.bezierCurveTo(75,37+130,70,25+130,50,25+130);
			canvas.bezierCurveTo(20,25+130,20,62.5+130,20,62.5+130);
			canvas.bezierCurveTo(20,80+130,40,102+130,75,120+130);
			canvas.bezierCurveTo(110,102+130,130,80+130,130,62.5+130);
			canvas.bezierCurveTo(130,62.5+130,130,25+130,100,25+130);
			canvas.bezierCurveTo(85,25+130,75,37+130,75,40+130);
			canvas.fill();

		}
	}

	thirdHeart = {

		draw: function(color) {
			canvas.fillStyle = color;
			canvas.beginPath();
			canvas.moveTo(80,50+260);
			canvas.bezierCurveTo(75,37+260,70,25+260,50,25+260);
			canvas.bezierCurveTo(20,25+260,20,62.5+260,20,62.5+260);
			canvas.bezierCurveTo(20,80+260,40,102+260,75,120+260);
			canvas.bezierCurveTo(110,102+260,130,80+260,130,62.5+260);
			canvas.bezierCurveTo(130,62.5+260,130,25+260,100,25+260);
			canvas.bezierCurveTo(85,25+260,75,37+260,75,40+260);
			canvas.fill();

		}
	}





	//var canvas = document.getElementById("myCanvas");

	topButton = {
		//color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 30,
		draw: function() {
			//	canvas.fillStyle = this.color;
			//	canvas.fillRect(this.x, this.y, this.width, this.height);
			canvas.drawImage(scroll, this.x, this.y);
		}
	};


	middleButton = {
		//color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 150,
		draw: function() {
				//canvas.fillStyle = this.color;
				//canvas.fillRect(this.x, this.y, this.width, this.height);
				canvas.drawImage(scroll, this.x, this.y);
		}
	};


	bottomButton = {
		//color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 270,
		draw: function() {
				//canvas.fillStyle = this.color;
				//canvas.fillRect(this.x, this.y, this.width, this.height);
				canvas.drawImage(scroll, this.x, this.y);
		}
	};

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

	}

	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		canvas.fillStyle = "#FF6F59";
		canvas.fillRect(0,0,800,400);

		if(boltPath != null)
			boltPath.draw();

		updateScore.draw(score);

		switch(getLives()) {
	    case 3:
	        firstHeart.draw("#DD2525");
			secondHeart.draw("#DD2525");
			thirdHeart.draw("#DD2525");
	        break;
	    case 2:
	    	firstHeart.draw("#DD2525");
			secondHeart.draw("#DD2525");
	        thirdHeart.draw("#254441");
	        break;
	    case 1:
	    	firstHeart.draw("#DD2525");
	        secondHeart.draw("#254441");
	       	thirdHeart.draw("#254441");
	        break;
	    case 0:
	    	firstHeart.draw("#254441");
	    	secondHeart.draw("#254441");
	       	thirdHeart.draw("#254441");
	        break;
	    default:
    		break;
		}//end switch

		if(startTimer){
				var centerX = 380;
				var centerY = 340;
				var radius = 30;

				canvas.beginPath();
				canvas.arc(centerX, centerY, radius, 0, 2 * Math.PI * (timer/20), false);
				//canvas.fillStyle = 'green';
				//canvas.fill();
				canvas.lineWidth = 23;

				if(timer > 5)
						canvas.strokeStyle = 'green';
				else
						canvas.strokeStyle = 'red';

				canvas.stroke();

				canvas.fillStyle = "#000";
				canvas.font = "30px sans-serif";
				canvas.fillText(timer.toString(), 363, 350);
		}

		topButton.draw();
		middleButton.draw();
		bottomButton.draw();

		drawAnswers();
	}

	// Answer Text
	canvas.fillStyle = "#254441"
	canvas.font = "25px Georgia";

	canvas.fillStyle = "#254441"
	canvas.font = "25px Georgia";

	canvas.fillStyle = "#254441"
	canvas.font = "25px Georgia";

	// Happens when the mouse is clicked in the canvas
	$('#myCanvas').click(function (e) {
		var clickedX = e.pageX - this.offsetLeft;
	  var clickedY = e.pageY - this.offsetTop;
	  if (clickedX < (topButton.x+topButton.width) && clickedX > topButton.x && clickedY > topButton.y && clickedY < ((topButton).y+topButton.height)) {
	        checkAnswer(0);
	  }
		if (clickedX < (middleButton.x+middleButton.width) && clickedX > middleButton.x && clickedY > middleButton.y && clickedY < (middleButton.y+middleButton.height)) {
	        checkAnswer(1);
	  }
		if (clickedX < (bottomButton.x+bottomButton.width) && clickedX > bottomButton.x && clickedY > bottomButton.y && clickedY < (bottomButton.y+bottomButton.height)) {
	        checkAnswer(2);
	  }


});
});
