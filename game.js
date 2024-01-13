// Step 2: Create a New Pattern
var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;

// Step 7 - Start the Game
var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Step 4 - Check Which Button is Pressed
$(".btn").click(function (buttonClicked) {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)
    animatePress(userChosenColour);

    // step 8
    //8.2 Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length - 1);
})



// Step 8 - Check the User's Answer Against the Game Sequence
// 8.1 Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel)
{
    // 8.3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //8.4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length) {
            
            //8.5. Call nextSequence() after a 1000 millisecond delay
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    } else {
        console.log("wrong");
        // Step 9 - Game Over
        // 9.1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");
        
        // 9.2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        
        // 9.3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("h1").text("Game Over, Press Any Key to Restart");
        
        // 10.2. Call startOver() if the user gets the sequence wrong.
        startOver();
    }
}

function nextSequence()
{
    //8.6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    // step 7
    level++;
    $("h1").html("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    // Step 3:- Show the Sequence to the User with Animations and Sounds
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

// Step 3:- Show the Sequence to the User with Animations and Sounds
// Step 5 - Add Sounds to Button Clicks
function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}


// Step 6 - Add Animations to User Clicks
function animatePress(currentColour)
{
    // adding pressed class to display animation of a click
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}


// Step 10 - Restart the Game
// 10.1. Create a new function called startOver().
function startOver() {
    // 10.3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}