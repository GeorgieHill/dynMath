$(document).ready(function() {
/*	680, 30, 100, 100);

	(680, 150, 100, 100);

680, 270, 100, 100);
*/
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 400;
	var canvasElement = $("<canvas id = 'myCanvas' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "' style='border:1px solid #FF6F59;  padding-left: 0; padding-right: 0; margin-left: auto; margin-right: auto; display: block;'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
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

//DD2525 is heart color

	//var canvas = document.getElementById("myCanvas");

	var topButton = {
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

	var middleButton = {
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

	var bottomButton = {
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
	canvas.font = "50px Georgia";
	canvas.fillText("1/2", 695, 90);

	canvas.fillStyle = "#254441"
	canvas.font = "40px Georgia";
	canvas.fillText("50%", 695, 210);

	canvas.fillStyle = "#254441"
	canvas.font = "50px Georgia";
	canvas.fillText("5", 695, 325);

	// Happens when the mouse is clicked in the canvas
	$('#myCanvas').click(function (e) {
		var clickedX = e.pageX - this.offsetLeft;
	  var clickedY = e.pageY - this.offsetTop;
	  if (clickedX < (topButton.x+topButton.width) && clickedX > topButton.x && clickedY > topButton.y && clickedY < ((topButton).y+topButton.height)) {
	        alert ('clicked top');
	  }
		if (clickedX < (middleButton.x+middleButton.width) && clickedX > middleButton.x && clickedY > middleButton.y && clickedY < (middleButton.y+middleButton.height)) {
	        alert ('clicked middle');
	  }
		if (clickedX < (bottomButton.x+bottomButton.width) && clickedX > bottomButton.x && clickedY > bottomButton.y && clickedY < (bottomButton.y+bottomButton.height)) {
	        alert ('clicked bottom');
	  }


});
});
