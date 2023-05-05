var colorList = ["red", "yellow", "green", "blue"];
var patternList = [];
var userChosenColourList = [];
var level = 0;
var started = false;

function playAudio(color) {
    switch (color) {
        case "red":
            var audio = new Audio("sounds/red.mp3");
            break;

        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            break;
        case "green":
            var audio = new Audio("sounds/green.mp3");
            break;
        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            break;

        default:
            var audio = new Audio("sounds/wrong.mp3");
            break;

    }
    audio.play();
}

//backgroundAnimation of the selected button
function backgroundAnimation(color) {
    $("." + color).addClass("pressed");
    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }
        , 100);
}



function gameOver() {
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }
        , 200);
    playAudio();
    $("#level-title").html("Game Over, Click any key to Restart");
    restart();
}



function restart() {
    level = 0;
    patternList = [];
    started = false;
}




//next random color for the game
function nextColor() {
    userChosenColourList = [];

    level++;
    $("#level-title").html("Level " + level);
    var randIndex = Math.floor(Math.random() * colorList.length);
    var colorSelected = colorList[randIndex];
    patternList.push(colorSelected);
    $("." + colorSelected).fadeOut(100).fadeIn(100).delay(100);
    playAudio(colorSelected);

}




function checkAnswer() {
    var is_valid = false;
    for (var i = 0; i < userChosenColourList.length; i++) {
        if (patternList[i] !== userChosenColourList[i]) {
            gameOver();
            return;
        }
    }


    if (patternList.length === userChosenColourList.length) {
        setTimeout(function () {
            nextColor();
        }, 1000);
    }



}








function startGame() {

    $(document).on("keypress", function () {
        if (!started) {
            nextColor();
            started = true;
        }

    });

    $(".btn").click(function () {
        if (!started) {
            gameOver();
        }
    }
    );


    //user chosen color
    $(".btn").click(function () {
        var buttonClicked = $(this).attr("id");
        playAudio(buttonClicked);
        backgroundAnimation(buttonClicked);
        userChosenColourList.push(buttonClicked);
        checkAnswer();
    }
    );
}






startGame();

