//Global variable for PR, only stays until page is refreshed.
let personalHitRecord = 0;
let personalMissRecord = 0;

//Functions

const displayStartMenu = () => {
  //Once main game is finished, make menu
};

const displayBoard = () => {
  displayScoreBoard();
  displayTimer(60);
  //Here will call a function to display inner container to take remaining space
  displayGameBorder();
};

const displayScoreBoard = () => {
  const gameScoreboard = document.querySelector(".game__Scoreboard");
  gameScoreboard.innerHTML = `
        <h1>Scoreboard<h1>
        <p>Hits: <span id="hitCounter">0</span> <p>
        <p>Missed: <span id="missCounter">0</span> <p>
      `;
};

const displayTimer = (totalTime) => {
  const gameContainer = document.querySelector(".game__container");
  const timerCounter = document.createElement("div");
  timerCounter.classList.add("timerCounter");
  gameContainer.appendChild(timerCounter);

  updateTimer(timerCounter, totalTime);
};

const updateTimer = (timerCounter, totalTime) => {
  const intervalId = setInterval(() => {
    timerCounter.innerHTML = `<span>${totalTime}<span>`;
    totalTime--;
    if (totalTime < 0) {
      clearInterval(intervalId);
      stopSpawning();
      displayEndOfRoundStats();
    }
  }, 1000);
};

const displayGameBorder = () => {
  // Probably just displayTimer(3) right before round starts
  const innerBorder = document.createElement("div");
  innerBorder.classList.add("innerContainer");
  console.log("Here will make a child container for the target to spawn");
};

const spawnTarget = (callback) => {
  //Rework function to spawn in a child container
  const gameContainer = document.querySelector(".game__container");
  const targetObject = document.createElement("div");
  targetObject.classList.add("targetObject");
  gameContainer.appendChild(targetObject);
  const scoreboard = document.querySelector(".game__Scoreboard");
  const timer = document.querySelector(".timerCounter");
  console.log(scoreboard);
  console.log(timer);

  //Get boundaries
  const gameContainerRect = gameContainer.getBoundingClientRect();
  const targetObjectRect = targetObject.getBoundingClientRect();
  const scoreboardRect = scoreboard.getBoundingClientRect();
  const timerRect = timer.getBoundingClientRect();

  console.log(scoreboardRect);
  console.log(timerRect);

  let randomizePositionTop =
    Math.random() * (gameContainerRect.height - targetObjectRect.height);
  let randomizePositionLeft =
    Math.random() * (gameContainerRect.width - targetObjectRect.width);
  targetObject.style.top = randomizePositionTop + "px";
  targetObject.style.left = randomizePositionLeft + "px";

  //Using callback function to call scoreHit after spawnTarget
  //Fixes the issue of scoreHit not working when spawnTarget is called
  targetObject.addEventListener("click", () => {
    callback();
    removeTarget();
    spawnTarget(callback);
  });

  // Make sure it doesn't overlap with other elements
};

const removeTarget = () => {
  const targetObject = document.querySelector(".targetObject");

  if (targetObject) {
    targetObject.remove();
  }
};

const stopSpawning = () => {
  //Rename to preventClick
  const targetObject = document.querySelector(".targetObject");
  const gameContainer = document.querySelector(".game__container");
  targetObject.style.pointerEvents;
  gameContainer.style.pointerEvents = "none";
  console.log("This will stop spawning targets when round ends");
};

const displayEndOfRoundStats = () => {
  //Probably displayScoreboard() + calc final stats

  console.log("Display stats from scoreboard here");
};

const scoreHit = () => {
  const hitCounter = document.getElementById("hitCounter");
  hitCounter.innerHTML++;
};

const missedHit = () => {
  const missCounter = document.getElementById("missCounter");
  const gameContainer = document.querySelector(".game__container");
  const targetObject = document.querySelector(".targetObject");
  const timerCounter = document.querySelector(".timerCounter");
  const gameScoreboard = document.querySelector(".game__Scoreboard");

  gameContainer.addEventListener("click", (event) => {
    if (
      //Checks if container has the target or your click is on target
      !gameContainer.contains(event.target) ||
      event.target === targetObject ||
      event.target === timerCounter ||
      event.target === gameScoreboard
    ) {
      return;
    }
    missCounter.innerHTML++;
  });
  //stopPropagation for preventing missCounter from incrementing
  // when clicking on child elements
  timerCounter.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  gameScoreboard.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

//Display the game board
displayBoard();

//Starts spawning targets with scoreHit as callback
spawnTarget(scoreHit);

//Increments missed for each missed click
missedHit();
