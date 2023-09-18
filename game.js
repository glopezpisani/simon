//array with game button colours
var buttonColours = ["red", "blue", "green", "yellow"];

//array for the pattern generated randomly
var gamePattern = [];

//array for the pattern the user clicked
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    //if level is 0, then start the game
    if (!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
        
    }
})


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    //calling checkAnswer passing the index of the last answer in user's sequence
    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");

        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);

        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }), 400;

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function nextSequence(){
    //when nextSequence is triggered, reset the userClickePattern to an empty array (ready for next level)
    userClickedPattern=[];

    //increase the level by 1
    level++;
    //update the h1
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    
    //new random generated button colour
    var randomChosenColour = buttonColours[randomNumber];

    //adding new button colour to the gamePatern array
    gamePattern.push(randomChosenColour);

    //animate button
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    
    //play button sound
    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
   
}

function startOver() {
    //reset values
    level=0;
    gamePattern=[];
    started=false;
}
