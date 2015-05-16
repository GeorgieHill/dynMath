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

	// Answer Squares
	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 30, 100, 100);

	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 150, 100, 100);

	canvas.fillStyle = "#87E5BB"
	canvas.fillRect(680, 270, 100, 100);


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
	//var canvas = document.getElementById("myCanvas");
	var topButton = {
		color: "#DD2525",
		width: 100,
		height: 100,
		x: 680,
		y: 0,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};
	topButton.draw();

	var middleButton = {
		color: "#DD2525",
		width: 100,
		height: 100,
		x: 680,
		y: 150,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	var bottomButton = {
		color: "#DD2525",
		width: 100,
		height: 100,
		x: 680,
		y: 270,
		draw: function() {
				canvas.fillStyle = this.color;
				canvas.fillRect(this.x, this.y, this.width, this.height);
		}
	};

	// Happens when the mouse is clicked in the canvas
	$('#myCanvas').click(function (e) {
		var clickedX = e.pageX - this.offsetLeft;
	  var clickedY = e.pageY - this.offsetTop;
	  //alert(clickedX + " : " + clickedY);    if (clickedX < (leftButton.x+leftButton.width) && clickedX > leftButton.x && clickedY > leftButton.y && clickedY < (leftButton.y+leftButton.height)) {
	  //      alert ('clicked left');
	  //}

	  //if (clickedX < (rightButton.x+rightButton.width) && clickedX > rightButton.x && clickedY > rightButton.y && clickedY < (rightButton.y+rightButton.height)) {        alert ('clicked right');
	//}

});
});
