var canvas;
var topButton;
var middleButton;
var bottomButton;
var firstHeart;
var secondHeart;
var thirdHeart;

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

		//this is how the game will run; running update and draw every "frame"
	/*setInterval(function() {
		update();
		draw();
	}, 1000/FPS);
*/
	var bolt = new Image();
	bolt.src = './images/bolt.png';

	var scroll = new Image();
	scroll.src = './images/scroll.png';

	var gem = new Image();
	gem.src = './images/gem.png';

	boltPath = {

		startX: 350,
		startY: 200,
		draw: function() {
			if(this.x < this.startX)
					this.startX -= 20;

			if(this.y < this.startY)
					this.startY -= 20;

		canvas.fillStyle = this.color;
			canvas.drawImage(this.img, this.startX,this.startY);
		}
	}
	//var canvas = c.getContext("2d");
	canvas.fillStyle = "#FF6F59";
	canvas.fillRect(0,0,800,400);

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
			canvas.drawImage(gem, 300, 20);
		}
	}

	updateScore.draw(0);

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
	firstHeart.draw("#DD2525");

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
	secondHeart.draw("#DD2525");

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
	thirdHeart.draw("#DD2525");




	//var canvas = document.getElementById("myCanvas");

	topButton = {
		//color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 30,
		draw: function() {
			console.log("in top draw");
			//	canvas.fillStyle = this.color;
			//	canvas.fillRect(this.x, this.y, this.width, this.height);
			canvas.drawImage(scroll, this.x, this.y);
		}
	};

	topButton.draw();

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
	middleButton.draw();

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
	bottomButton.draw();



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
