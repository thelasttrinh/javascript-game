//Functions

const displayStartMenu = () => {
  //
};

const displayBoard = () => {
  displayScoreBoard();
  // call displayTimer
};

const displayScoreBoard = () => {
  const gameScoreboard = document.querySelector(".game__Scoreboard");
  gameScoreboard.innerHTML = `
        <h1>Scoreboard<h1>
        <p>Hits: <span id="hitCounter">0</span> <p>
        <p>Missed: <span id="missCounter">0</span> <p>
      `;
};

const displayTimer = () => {
  // Call startTimer(), with parameter of 3
};

const startTimer = () => {
  //Timer starts then at zero, call displayRound()
};

const displayRound = () => {
  //Call displayScoreboard(), startTimer(30 or 60)
  // TBD for actual game
};

const scoreHit = () => {
  const hitCounter = document.getElementById("hitCounter");
  const gameContainer = document.querySelector(".game__container");
  gameContainer.addEventListener("click", () => {
    hitCounter.innerHTML++;
  });
  // return hitCounter.innerHTML;
};

const missedHit = () => {
  const missCounter = document.getElementById("missCounter");
  const gameContainer = document.querySelector(".game__container");
  document.addEventListener("click", (event) => {
    //Detect clicks outside elements, will change once targets are implemented
    if (!gameContainer.contains(event.target)) {
      missCounter.innerHTML++;
    }
  });
  // return missCounter.innerHTML;
};

displayScoreBoard();
missedHit();
scoreHit();
