// Array of button colors
let buttonColours = ["red", "blue", "green", "yellow"];

// Empty arrays to store the game and user's pattern
let gamePattern = [];
let userClickedPattern = [];

// Flag variable to keep track if the game has started or not
let started = false;

// The level of the game
let level = 0;

// When any key is pressed, start the game
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// When any button with class "btn" is clicked, store its color and call functions to play sound and animate press
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Check if the current user input is correct
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      // Wait a second then show the next sequence
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the wrong sound and show the game over text
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    // Wait 200 milliseconds then remove the game over class and restart the game
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Generate the next sequence of colors
const nextSequence = () => {
  // Reset the user input pattern
  userClickedPattern = [];

  // Increase the level and display it on the page
  level++;
  $("#level-title").text("Level " + level);

  // Choose a random color and add it to the game pattern array
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the color that was chosen and play the sound
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

// Animate the press of a button color
const animatePress = (currentColor) => {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play a sound file
const playSound = (name) => {
  let audio = new Audio(`../../sounds/${name}.mp3`);
  audio.play();
}

// Restart the game by resetting variables to their initial state
const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}
