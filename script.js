//Global variable for PR, only stays until page is refreshed.
let personalHitRecord = 0;
let personalMissRecord = 0;

//Functions

const displayStartMenu = () => {
  //Once main game is finished, make menu & difficulty
  const gameContainer = document.querySelector(".game__container");
  gameContainer.innerHTML = `
  <div>
  <h1>Wannabe Osu simulator or aim trainer</h1>
  </div>
  <div class="startMenu__buttons">
  <button class="startMenu__startGame">Start Game</button>
  <button class="startMenu__selectDiff">Select Difficulty</button>
  </div>
  `;

  const startGame = document.querySelector(".startMenu__startGame");
  const selectDiff = document.querySelector(".startMenu__selectDiff");

  //Event Listener for buttons
  startGame.addEventListener("click", (event) => {
    gameContainer.innerHTML = "";
    initializeBoard();
    displayBoard();
    enableClick();
  });

  selectDiff.addEventListener("click", (event) => {
    console.log(
      "TODO: Make a list of difficulties for user to choose - Ez => Medium => Hard => Maybe Pro => Prob not but Infinite/Random?"
    );
  });
};

const initializeBoard = () => {
  const gameContainer = document.querySelector(".game__container");
  gameContainer.innerHTML = `
    <div class="game__Scoreboard"></div>
    <div class="game__timerCounter"></div>
    <div class="game__endStats"></div>
    <div class="game__InnerBorder"></div>
  `;
};

const displayBoard = () => {
  const timerCounter = document.querySelector(".game__timerCounter");
  displayScoreBoard();
  updateTimer(timerCounter, 1);
  //Starts spawning targets with scoreHit as callback
  spawnTarget(scoreHit);
};

const displayScoreBoard = () => {
  const initialHit = 0;
  const initialMissed = 0;
  const gameScoreboard = document.querySelector(".game__Scoreboard");
  gameScoreboard.innerHTML = `
        <h1>Scoreboard<h1>
        <p>Hits: <span id="hitCounter">${initialHit}</span> <p>
        <p>Missed: <span id="missCounter">${initialMissed}</span> <p>
      `;
};

const updateTimer = (timerCounter, totalTime) => {
  //Determine whether timerCounter to be called in the function...
  const intervalId = setInterval(() => {
    timerCounter.innerHTML = `<span>${totalTime}<span>`;
    totalTime--;
    if (totalTime < 0) {
      clearInterval(intervalId);
      preventClicking();
      displayEndOfRoundStats();
    }
  }, 1000);
};

const spawnTarget = (callback) => {
  const innerBorder = document.querySelector(".game__InnerBorder");
  const targetObject = document.createElement("div");
  targetObject.classList.add("targetObject");
  innerBorder.appendChild(targetObject);

  //Get boundaries
  const innerBorderRect = innerBorder.getBoundingClientRect();
  const targetObjectRect = targetObject.getBoundingClientRect();

  //Generate random coordinates
  let randomizePositionTop =
    Math.random() * (innerBorderRect.height - targetObjectRect.height);
  let randomizePositionLeft =
    Math.random() * (innerBorderRect.width - targetObjectRect.width);
  targetObject.style.top = randomizePositionTop + "px";
  targetObject.style.left = randomizePositionLeft + "px";

  //Using callback function to call scoreHit after spawnTarget
  //Fixes the issue of scoreHit not working when spawnTarget is called
  targetObject.addEventListener("click", () => {
    callback();
    removeTarget();
    spawnTarget(callback);
  });
};

const removeTarget = () => {
  const targetObject = document.querySelector(".targetObject");

  if (targetObject) {
    targetObject.remove();
  }
};

const preventClicking = () => {
  const targetObject = document.querySelector(".targetObject");
  const gameContainer = document.querySelector(".game__container");
  targetObject.style.pointerEvents = "none";
  gameContainer.style.pointerEvents = "none";
};

const enableClick = () => {
  const targetObject = document.querySelector(".targetObject");
  const gameContainer = document.querySelector(".game__container");
  targetObject.style.pointerEvents = "auto";
  gameContainer.style.pointerEvents = "auto";
};

const displayEndOfRoundStats = () => {
  const gameContainer = document.querySelector(".game__container");
  const endStats = document.querySelector(".game__endStats");
  const targetObject = document.querySelector(".targetObject");

  endStats.style.display = "block";
  targetObject.style.display = "none";

  const gameContainerRect = gameContainer.getBoundingClientRect();

  endStats.style.top = `${
    gameContainerRect.top + gameContainerRect.height / 2
  }px`;
  //gameContainerRect.width
  //gameContainerRect.height
  endStats.style.left = `${
    gameContainerRect.left + gameContainerRect.width / 2
  }px`;

  //Use string literal to display score & PR score
  endStats.innerHTML = `
 <p id="hitPR">Hits PR: ${personalHitRecord}<p>
 <p id="missedPR">Missed PR: ${personalMissRecord}<p>
 <button class="game__Retry">Retry?</button>
 <button class="game__toStart">Go to Start</button>
 `;

  //Makes endStats & child elements clickable while the parent container is unclickable
  endStats.style.pointerEvents = "auto";

  //Adds retry button & enables clicking
  const retryRound = document.querySelector(".game__Retry");
  const backToStart = document.querySelector(".game__toStart");

  retryRound.addEventListener("click", (event) => {
    gameContainer.innerHTML = "";
    initializeBoard();
    displayBoard();
    enableClick();
  });

  backToStart.addEventListener("click", (event) => {
    gameContainer.innerHTML = "";
    displayStartMenu();
    gameContainer.style.pointerEvents = "auto";
  });

  //TODO: Go back to menu button
};

const scoreHit = () => {
  const hitCounter = document.getElementById("hitCounter");
  hitCounter.textContent++;

  //Using Number() & textContent to avoid string conversion issue
  if (hitCounter.textContent > personalHitRecord) {
    updateNewPR();
  }
};

const detectMissedHit = () => {
  const gameContainer = document.querySelector(".game__container");
  const targetObject = document.querySelector(".targetObject");
  const timerCounter = document.querySelector(".game__timerCounter");
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
    } else {
      missedHit();
    }
  });

  timerCounter.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  gameScoreboard.addEventListener("click", (event) => {
    event.stopPropagation();
  });
};

const missedHit = () => {
  //Maybe consider making a function for detecting if a click is in
  const missCounter = document.getElementById("missCounter");
  // const gameContainer = document.querySelector(".game__container");
  // const targetObject = document.querySelector(".targetObject");
  // const timerCounter = document.querySelector(".game__timerCounter");
  // const gameScoreboard = document.querySelector(".game__Scoreboard");

  // gameContainer.addEventListener("click", (event) => {
  //   if (
  //     //Checks if container has the target or your click is on target
  //     !gameContainer.contains(event.target) ||
  //     event.target === targetObject ||
  //     event.target === timerCounter ||
  //     event.target === gameScoreboard
  //   ) {
  //     return;
  //   }
  //Using Number() & textContent to avoid string conversion issue
  missCounter.textContent++;
  console.log(missCounter);
  // console.log(personalMissRecord);
  // });
  if (missCounter.textContent > personalMissRecord) {
    // personalMissRecord = Number(missCounter.textContent);
    updateNewPR();
  }
  // console.log(missCounter);
  // console.log(personalMissRecord);

  //stopPropagation for preventing missCounter from incrementing
  // when clicking on child elements
  // timerCounter.addEventListener("click", (event) => {
  //   event.stopPropagation();
  // });

  // gameScoreboard.addEventListener("click", (event) => {
  //   event.stopPropagation();
  // });
};

const updateNewPR = () => {
  const hitCounter = document.getElementById("hitCounter");
  const missCounter = document.getElementById("missCounter");
  const hitPR = document.getElementById("hitPR");
  const missedPR = document.getElementById("missedPR");

  if (hitCounter.textContent > personalHitRecord) {
    personalHitRecord = Number(hitCounter.textContent);
  }

  if (missCounter.textContent > personalMissRecord) {
    personalMissRecord = Number(missCounter.textContent);
  }

  console.log("Update PR + change wording in EndStats");
};

displayStartMenu();
//Display the game board
// displayBoard();
//Increments missed for each missed click & prevents the additional calls of missedHit()
detectMissedHit();
