//Functions

const displayStartMenu = () => {
  //Once main game is finished, make menu
};

const displayBoard = () => {
  displayScoreBoard();
  displayTimer(60);
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
  //Tacks on timer div without rewriting game container
  const gameContainer = document.querySelector(".game__container");
  const timerCounter = document.createElement("div");
  timerCounter.classList.add("timerCounter");
  gameContainer.appendChild(timerCounter);

  //Closure function to update internal timer without globals
  const updateTimer = () => {
    timerCounter.innerHTML = `<span>${totalTime}<span>`;
    totalTime--;
    // while (totalTime > 0 && !gameContainer.contains(displayTarget())) {
    //   spawnTarget();
    //   if (
    //     gameContainer.contains(displayTarget()) &&
    //     totalTime % 5 == 0 &&
    //     totalTime < 60
    //   ) {
    //     removeTarget();
    //   }
    // }
    if (totalTime < 0) {
      clearInterval(intervalId);
      stopSpawning();
      displayEndOfRoundStats();
    }
  };
  //Update timer each second
  updateTimer();

  const intervalId = setInterval(updateTimer, 1000);
};

const displayRound = () => {
  // Need to think more about this
  // TBD for actual game
};

const displayTarget = () => {
  const gameContainer = document.querySelector(".game__container");
  const targetObject = document.createElement("div");
  targetObject.classList.add("targetObject");
  gameContainer.appendChild(targetObject);
};

const spawnTarget = () => {
  const gameContainer = document.querySelector(".game__container");
  displayTarget();
  const targetObject = document.querySelector(".targetObject");
  const gameContainerRect = gameContainer.getBoundingClientRect();
  const targetObjectRect = targetObject.getBoundingClientRect();
  let randomizePositionTop =
    Math.random() * (gameContainerRect.height - targetObjectRect.height);
  let randomizePositionLeft =
    Math.random() * (gameContainerRect.width - targetObjectRect.width);
  targetObject.style.top = randomizePositionTop + "px";
  targetObject.style.left = randomizePositionLeft + "px";
  displayTarget();
  // console.log(randomizePositionTop);
  // console.log(randomizePositionLeft);

  //Add random positioning within game container,
  // make sure it doesn't overlap with other elements,
  // only have one target on the screen each time.
};

const removeTarget = () => {
  const targetObject = document.querySelector(".targetObject");
  if (targetObject) {
    targetObject.remove();
  }
};

const stopSpawning = () => {
  //Maybe just a break in the while loop will suffice
  console.log("This will stop spawning targets when round ends");
};

const displayEndOfRoundStats = () => {
  //Probably displayScoreboard() + calc final stats
  console.log("Display stats from scoreboard here");
};

const scoreHit = () => {
  const hitCounter = document.getElementById("hitCounter");
  const targetObject = document.querySelector(".targetObject");
  targetObject.addEventListener("click", () => {
    hitCounter.innerHTML++;
  });
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
  //stopPropagation for preventing missCounter from incrementing on child elements
  timerCounter.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  gameScoreboard.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

displayBoard();
spawnTarget();
missedHit();
scoreHit();
