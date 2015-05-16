//Array of choices
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

var opsMin = 0;
var opsMax = gameOps1.length;

var arrayMin = 0;
var arrayMax = 4;

var choices = [];

function getChoices(){

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

    //get choices at determined keys from value in equals array of gameOps1
    var matchA = gameOps1[matchKey].equals[matchAIndex];
    var matchB = gameOps1[matchKey].equals[matchBIndex];
    var answer = gameOps1[answerKey].equals[answerIndex];

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




