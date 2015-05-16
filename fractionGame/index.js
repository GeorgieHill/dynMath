var canvas; 
var topButton;
var middleButton;
var bottomButton; 

$(document).ready(function() {
/*	680, 30, 100, 100);

	(680, 150, 100, 100);

680, 270, 100, 100);
*/
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 400;
	var canvasElement = $("<canvas id = 'myCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' style='border:1px solid #FF6F59;  padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;'></canvas>");
	canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('#canDiv');

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

// Hearts

	var firstHeart = {

		color: "#DD2525",

		draw: function() {
			canvas.fillStyle = this.color;
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
	firstHeart.draw();

	var secondHeart = {

		color: "#DD2525",

		draw: function() {
			canvas.fillStyle = this.color;
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
	secondHeart.draw();

	var thirdHeart = {

		color: "#DD2525",

		draw: function() {
			canvas.fillStyle = this.color;
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
	thirdHeart.draw();




	//var canvas = document.getElementById("myCanvas");

	topButton = {
		color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 30,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	topButton.draw();

	middleButton = {
		color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 150,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	middleButton.draw();

	bottomButton = {
		color: "#87E5BB",
		width: 100,
		height: 100,
		x: 680,
		y: 270,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
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
