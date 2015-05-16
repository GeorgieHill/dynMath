//Global variable – to set player level
var difficulty =  11; 
var levelup = 0; 
var numCorrect = 0;

//Generates a random number for the spells. 
function randNumber() {
    //if they have gotten 10 correct up the number range for mulipication problems 
    if (numCorrect == 10) {
        //increases the range of numbers by 10.
        levelup = 10;
        numCorrect = 0;
    }   
    difficulty= difficulty + levelup;
    // starts at 0-10 then range gets larger by 10 each level up.
    var num = Math.round( Math.random()*difficulty);

    return num;
}