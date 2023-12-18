// game.js

var gameStarted = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

// Use jQuery to detect a keypress and start/restart the game
$(document).keypress(function() {
  if (!gameStarted) {
    // If the game hasn't started, start it
    nextSequence();
    gameStarted = true;
  } else {
    // If the game has started, restart it
    startOver();
  }
});

// Use jQuery to detect button clicks and trigger a handler function
$(".btn").click(function() {
  if (!gameStarted) {
    // If the game hasn't started, start it
    nextSequence();
    gameStarted = true;
  }

  // Inside the handler, create a variable called userChosenColour
  var userChosenColour = $(this).attr("id");

  // Add userChosenColour to the end of userClickedPattern
  userClickedPattern.push(userChosenColour);

  // Play the sound for the clicked button
  playSound(userChosenColour);

  // Animate press for the clicked button
  animatePress(userChosenColour);

  // Log the userClickedPattern to the console for testing
  console.log("User Clicked Pattern: " + userClickedPattern);

  // Call checkAnswer after a user has clicked
  checkAnswer(userClickedPattern.length - 1);
});

// Function to generate a random number between 0 and 3
function nextSequence() {
  level++; // Increase the level by 1
  $("#level-title").text("Level " + level); // Update the h1 with the new level value

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Play the sound for the selected button color in nextSequence
  playSound(randomChosenColour);

  // Animate press for the selected button color in nextSequence
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");

    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence after a 1000 millisecond delay
      setTimeout(function() {
        nextSequence();
      }, 1000);

      // Once nextSequence is triggered, reset the userClickedPattern to an empty array
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong!");
    // Play the "wrong.mp3" sound when the user gets it wrong
    playSound("wrong");

    // Implement logic for when the user gets it wrong (e.g., end the game)

    // You might want to add a game over logic here.
    gameOver();
  }
}

// Function to play a sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate the button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Function to handle game over
function gameOver() {
  // Display game over message or perform any other actions
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

// Function to reset the game state
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
}
