//Array of choices for game
var gameOps1 = [
    {"key":0, "equals":["1/20", ".05", "5%", "2/40", "3/60"]},
    {"key":1, "equals":["1/10", ".1", ".10", "10%", "2/20"]},
    {"key":2, "equals":["3/20", ".15", "15%", "6/40", "15/100"]},
    {"key":3, "equals":["1/5", ".2", "20%", "20/100", "5/20"]},
    {"key":4, "equals":["1/4", ".25", "25%", "2/8", "3/12"]},
    {"key":5, "equals":["3/10", ".3", "30%", "30/100", "6/20"]},
    {"key":6, "equals":["7/20", ".35", "35%", "14/40", "35/100"]},
    {"key":7, "equals":["2/5", ".4", "40%", "40/100", "6/15"]},
    {"key":8, "equals":["9/20", ".45", "45%", "18/40", "45/100"]},
    {"key":9, "equals":["1/2", ".5", ".50", "50%", "2/4"]},
    {"key":10, "equals":["11/20", ".55", "55%", "22/40", "55/100"]},
    {"key":11, "equals":["3/5", ".6", "60%", "60/100", "9/15"]},
    {"key":12, "equals":["13/20", ".65", "65%", "65/100", "26/40"]},
    {"key":13, "equals":["7/10", ".70", "70%", "70/100", "14/20"]},
    {"key":14, "equals":["3/4", ".75", "75%", "6/8", "9/12"]},
    {"key":15, "equals":["4/5", ".8", "80%", "80/100", "12/15"]},
    {"key":16, "equals":["17/20", ".85", "85%", "85/100", "34/40"]},
	{"key":17, "equals":["9/10", ".9", "90%", "90/100", "18/20"]},
	{"key":18, "equals":["9/10", ".95", "95%", "38/40", "95/100"]},
	{"key":19, "equals":["1/1", "1.0", "2/2", "3/3", "4/4"]},
    {"key":20, "equals":["1/3", "2/6", "3/9", "4/12", "5/15"]},
    {"key":21, "equals":["2/3", "4/6", "6/9", "8/12", "10/15"]},
    {"key":22, "equals":["1/6", "2/12", "3/18", "4/24", "5/30"]},
    {"key":23, "equals":["1/7", "2/14", "3/21", "4/28", "5/35"]},
    {"key":24, "equals":["1/8", ".125", "12.5%", "2/16", "3/24"]},
    {"key":25, "equals":["1/9", "2/18", "3/27", "4/36", "5/45"]}
]

//choices array that will be displayed on screen
var choices = [];

//variable to hold the matches and the correct answer
var matchA;
var matchB;
var answer;

//variable to hold number of lives
var lives = 3;

//variable to hold number of correct answers
var score=0;

//fill choices array for display on screen
function getChoices(){

	//range of keys in gameOps1
	var opsMin = 0;
	var opsMax = gameOps1.length;

	//range of indexes in equals array of gameOps1
	var arrayMin = 0;
	var arrayMax = 4;

	//choose random keys to get data 
	//choose two values from matchKey for wrong answers and one from answerKey for right answer
	var matchKey = Math.floor(Math.random() * (opsMax)-opsMin) + opsMin;
	var answerKey = Math.floor(Math.random() * (opsMax)-opsMin) + opsMin;

	//if keys are the same, choose answerKey again
	while (matchKey==answerKey){
		answerKey = Math.floor(Math.random() * (arrayMax+1)-arrayMin) + arrayMin;
	}
    
    //choose random indexes to get data for matching game choices
    matchAIndex = Math.floor(Math.random() * (arrayMax+1)-arrayMin) + arrayMin;
    matchBIndex = Math.floor(Math.random() * (arrayMax+1)-arrayMin) + arrayMin;
    answerIndex = Math.floor(Math.random() * (arrayMax+1)-arrayMin) + arrayMin;
    
    //if indexes are the same, choose second one again
    while (matchAIndex==matchBIndex){
		matchBIndex = Math.floor(Math.random() * (arrayMax+1)-arrayMin) + arrayMin;
	}

    //get matched choices at determined keys from value in equals array of gameOps1
    matchA = gameOps1[matchKey].equals[matchAIndex];
    matchB = gameOps1[matchKey].equals[matchBIndex];
    //get answer from another key in gameOps1
    answer = gameOps1[answerKey].equals[answerIndex];

 	//add choices to the choices array
 	choices = [matchA, matchB, answer];

 	//shuffle the array for random display
 	choices = shuffleArray(choices);

	console.log(matchKey);
    console.log(answerKey);
	console.log(matchAIndex);
    console.log(matchBIndex);
 	console.log(matchA);
    console.log(matchB);
 	console.log(answer);
 	console.log(choices);

 	//put choices text onto canvas
 	canvas.fillStyle = "#254441"
	canvas.font = "25px Georgia";
	canvas.fillText(choices[0], 695, 90);
	canvas.fillText(choices[1], 695, 210);
	canvas.fillText(choices[2], 695, 325);

 	return choices; 	
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function checkAnswer(index){

	var successPhrase = ["Yes!", "Amazing!!", "You're Brilliant!!", "Wow!!", "Incredible!", 
					"Great Job!!", "What a Brain!", "Keep It Up!", "Excellent!", "Mind Blown!"];
	var successIndex = Math.floor(Math.random() * (successPhrase.length)-0) + 0;

	if (choices[index]==answer){

		score+=1;

		swal({  
			title: successPhrase[successIndex], 
			text: "Your score is now " + score.toString() + "!!!",  
			timer: 700,   
			showConfirmButton: false });
		//remove text from canvas
		topButton.draw();
		middleButton.draw();
		bottomButton.draw();
		//get next set of choices
		getChoices();
	}else{
		//alert to show correct answer
		swal({   
			title: "Oops... That's not quite right...",   
			text: matchA + " = " + matchB,   
			html: true
			}, function(){
				//continue game
				playMore();
			});//end alert

	}//end else for wrong answer
}//end checkanswer function

function playMore(){
	//redraw heart to indicate loss of life
	//number of lives left determines which heart is blacked out
	switch(lives) {
	    case 3:
	        thirdHeart.draw("#254441");
	        break;
	    case 2:
	        secondHeart.draw("#254441");
	        break;
	    case 1:
	        firstHeart.draw("#254441");
	        break;
	    default:
    		break;
	}//end switch

	//remove a life for player
	lives-=1;

	//remove quiz text from canvas
	topButton.draw();
	middleButton.draw();
	bottomButton.draw();
		
	//get new quiz choices if there are lives left
	if (lives>0){
		//get next set of choices
		getChoices();
	}else{
		//alert to end game
		swal({   
			title: "No More Lives!",   
			text: "Great Game... Please Play Again!",   
			html: true
			}, function(){
				//continue game
				playMore();
			});//end alert
		//go to scoreboard
		window.location.href = "./highScores.html";
	}
}//end playmore




