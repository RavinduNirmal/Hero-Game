var hero = document.getElementById("hero");
let playAgainBtn = document.querySelector("#playAgainBtn");
var gameOver = document.getElementById("gameOver");
var background = document.getElementById("background");
let scoreBoard = document.querySelector("#scoreBoard");
let scoreDisplay = document.querySelector("#scoreDisplay");
let wonDisplay = document.querySelector("#wonDisplay");
let GoHomeBtn = document.querySelector("#GoHomeBtn");
let idleImageNumber = 0;
let runImageNumber = 0;
let attackImageNumber = 0;
let jumpImageNumber = 0;
let jumpAttackImageNumber = 0;
let walkImageNumber = 0;
let deadImageNumber = 0;
let idleIntevalId;
let runIntevalId;
let jumpIntevalId;
let attackIntevalId;
let jumpAttackIntevalId;
let walkIntevalId;
let deadIntervalId;
let ScoreIntervalId;
let moveEnemyIntervalId = 0;
let run = false;
var backgroundImagePosition = 0;
let moveBackgroundX;
let moveWalkBackgroundX;
let enemyMarginLeft = 1500;
let boyMarginTop = 500;
let gameRunning = true;
let newMarginLeft = 0;
let score = 0;
const backgroundMusic = new Audio("music/game.mp3");

window.addEventListener("keydown", changeAction);
playAgainBtn.addEventListener("click", restartGame);
// GoHomeBtn.addEventListener("click", GoToHome);

gameStart();

function gameStart() {
  gameRunning = true;

  if (gameRunning) {
    IdleAnimationStart();
    createEnemy();
    enemyMove();
    HeroScore();
    backgroundMusicCheck();
  }
}

/* -----------------------   Actions ------------- ------- */

function IdleAnimation() {
  idleImageNumber += 1;

  if (idleImageNumber >= 11) {
    idleImageNumber = 1;
  }
  hero.src = "images/idle (" + idleImageNumber + ").png";
}

function runAnimation() {
  runImageNumber += 1;
  run = true;

  if (runImageNumber >= 11) {
    runImageNumber = 1;
  }
  if (run) {
    hero.src = "images/Run (" + runImageNumber + ").png";
  }
}

let jumpPositionY = 500;
let jumpY;

function jumpAnimation() {
  jumpImageNumber += 1;

  if (jumpImageNumber >= 11) {
    jumpImageNumber = 1;

    if (jumpImageNumber == 1) {
      jumpPositionY = 500;
      jumpY = hero.style.marginTop = jumpPositionY + "px";

      clearInterval(jumpIntevalId);
      checkWalkOrRun();
      jumpSound();
    }
  }

  if (jumpImageNumber <= 6 && jumpImageNumber >= 2) {
    jumpPositionY = jumpPositionY - 30;
    jumpY = hero.style.marginTop = jumpPositionY + "px";
  }
  if (jumpImageNumber > 6) {
    jumpPositionY = jumpPositionY + 30;

    jumpY = hero.style.marginTop = jumpPositionY + "px";
  }

  hero.src = "images/Jump (" + jumpImageNumber + ").png";
}

function attackAnimation() {
  attackImageNumber += 1;

  if (attackImageNumber >= 11) {
    attackImageNumber = 1;
    clearInterval(attackIntevalId);
    IdleAnimationStart();
  }
  hero.src = "images/Attack (" + attackImageNumber + ").png";
}

function jumpAttackAnimation() {
  jumpAttackImageNumber += 1;

  if (jumpAttackImageNumber >= 11) {
    jumpAttackImageNumber = 1;

    if (jumpAttackImageNumber == 1) {
      jumpPositionY = 500;
      hero.style.marginTop = jumpPositionY + "px";
      clearInterval(jumpAttackIntevalId);
      checkWalkOrRun();
      console.log(Walk);
    }
  }

  if (jumpAttackImageNumber <= 6 && jumpAttackImageNumber >= 2) {
    jumpPositionY -= 30;
    jumpY = hero.style.marginTop = jumpPositionY + "px";
  }
  if (jumpAttackImageNumber > 6) {
    jumpPositionY += 30;
    jumpY = hero.style.marginTop = jumpPositionY + "px";
  }
  hero.src = "images/JumpAttack (" + jumpAttackImageNumber + ").png";
}

function walkAnimation() {
  walkImageNumber += 1;

  if (walkImageNumber >= 11) {
    walkImageNumber = 1;
  }
  hero.src = "images/Walk (" + walkImageNumber + ").png";
}
// function heroDefaultPosition(){

//     jumpPositionY = 500;

//     hero.style.marginTop = jumpPositionY + "px";
// };

// function checkHeroPosition(){
//     setInterval(() => {
//         heroDefaultPosition();
//         console.log('hello');
//     }, 2000);
// };

function runAnimationStart() {
  runIntevalId = setInterval(runAnimation, 100);
}

function IdleAnimationStart() {
  idleIntevalId = setInterval(IdleAnimation, 100);
}

function jumpAnimationStart() {
  jumpIntevalId = setInterval(jumpAnimation, 100);
}

function attackAnimationStart() {
  attackIntevalId = setInterval(attackAnimation, 100);
}

function jumpAttackAnimationStart() {
  jumpAttackIntevalId = setInterval(jumpAttackAnimation, 75);
}

function walkAnimationStart() {
  walkIntevalId = setInterval(walkAnimation, 105);
}

function stopAttack() {
  let stopAttackHero = clearInterval(attackIntevalId);

  return stopAttackHero;
}

function changeAction(event) {
  let keyPressed = event.keyCode;

  console.log(keyPressed);
  const forwardRun = 39;
  const idlePosition = 37;
  const jumpPosition = 38;
  const attackPosition = 40;
  const attackStop = 71;
  const jumpAttackPosition = 86;
  const walkPosition = 13;

  switch (keyPressed) {
    case forwardRun:
      {
        backMove = true;
        Walk = false;
        clearInterval(runIntevalId);
        // runAnimationStart();
        clearInterval(idleIntevalId);
        clearInterval(jumpIntevalId);
        clearInterval(attackIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        // moveBackground();
        checkbackground();
        checkWalkOrRun();
        console.log("run");
      }

      break;
    case idlePosition:
      {
        clearInterval(idleIntevalId);
        IdleAnimationStart();
        clearInterval(runIntevalId);
        clearInterval(jumpIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(attackIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        console.log("idle");
      }
      break;
    case jumpPosition:
      {
        clearInterval(jumpIntevalId);
        jumpAnimationStart();
        clearInterval(idleIntevalId);
        clearInterval(runIntevalId);
        clearInterval(attackIntevalId);
        clearInterval(jumpAttackIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        // moveBackground();
        checkbackground();
        console.log("jump");
        // checkHeroPosition();
        console.log(jumpY);
      }
      break;
    case attackPosition:
      {
        clearInterval(attackIntevalId);
        attackAnimationStart();
        attackAnimation();
        clearInterval(idleIntevalId);
        clearInterval(runIntevalId);
        clearInterval(jumpIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        console.log("attack");
      }
      break;
    case attackStop:
      {
        clearInterval(runIntevalId);
        clearInterval(attackIntevalId);
        clearInterval(idleIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        stopAttack();
        IdleAnimationStart();
      }
      break;
    case jumpAttackPosition:
      {
        clearInterval(jumpAttackIntevalId);
        clearInterval(idleIntevalId);
        clearInterval(runIntevalId);
        clearInterval(jumpIntevalId);
        clearInterval(walkIntevalId);
        clearInterval(moveWalkBackgroundX);
        clearInterval(moveBackgroundX);
        // moveBackground();
        jumpAttackAnimationStart();
        checkbackground();
        // heroDefaultPosition();
        console.log("attackjump");
        console.log(jumpY);
      }
      break;
    case walkPosition:
      {
        backMove = false;
        Walk = true;
        clearInterval(jumpAttackIntevalId);
        clearInterval(idleIntevalId);
        clearInterval(runIntevalId);
        clearInterval(jumpIntevalId);
        clearInterval(moveBackgroundX);
        clearInterval(moveWalkBackgroundX);
        // moveWalkBackground();
        clearInterval(walkIntevalId);
        // walkAnimationStart();
        checkWalkOrRun();
        checkbackground();
        console.log("walk");
        console.log(jumpY);
      }
      break;
  }
}

function changeBackground() {
  backgroundImagePosition -= 20;
  background.style.backgroundPositionX = backgroundImagePosition + "px";
}
let backMove = false;

function moveBackground() {
  moveBackgroundX = setInterval(changeBackground, 50);
  console.log("moveBackground");

  backMove = true;

  return backMove;
}

function pauseBackground() {
  clearInterval(moveBackgroundX);
}

function changeWalkBackground() {
  backgroundImagePosition -= 10;
  background.style.backgroundPositionX = backgroundImagePosition + "px";
}

function moveWalkBackground() {
  moveWalkBackgroundX = setInterval(changeWalkBackground, 50);
  console.log("movewalkBackground");
}

function checkbackground() {
  if (backMove) {
    moveBackground();
  } else {
    moveWalkBackground();
  }
}

let Walk = true;
function checkWalkOrRun() {
  if (Walk) {
    walkAnimationStart();
  } else {
    runAnimationStart();
  }
}

/*-----------------  Enemies ------------------*/

function createEnemy() {
  for (var i = 1; i <= 20; i++) {
    enemy = document.createElement("div");
    enemy.className = "enemy";
    document.getElementById("background").appendChild(enemy);
    enemy.style.marginLeft = enemyMarginLeft + "px";
    enemy.id = "enemy" + i;

    if (i < 5) {
      enemyMarginLeft += 1500;
    } else if (i <= 8) {
      enemyMarginLeft += 1100;
    } else {
      enemyMarginLeft += 800;
    }
  }
}

function enemyMove() {
  if (moveEnemyIntervalId == 0) {
    moveEnemyIntervalId = setInterval(moveAnimation, 25);
  }
}

function moveAnimation() {
  for (var i = 1; i <= 20; i++) {
    var enemy = document.getElementById("enemy" + i);
    var currentMarginLeft = getComputedStyle(enemy).marginLeft;
    newMarginLeft = parseInt(currentMarginLeft) - 14;
    enemy.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft >= 100) & (newMarginLeft <= 200)) {
      if (jumpPositionY > 450) {
        gameOverAnimations();
      }
    }
  }

  // console.log(jumpPositionY);
}

function testEnemy() {
  enemy = document.createElement("div");
  enemy.className = "enemy";
  document.getElementById("background").appendChild(enemy);
  enemy.style.marginLeft = "300px";
}

/* ----------------------------   Hero Dead -------------------------*/

function gameOverAnimations() {
  clearInterval(runIntevalId);
  clearInterval(walkIntevalId);
  clearInterval(moveEnemyIntervalId);
  clearInterval(jumpIntevalId);
  clearInterval(idleIntevalId);
  clearInterval(attackIntevalId);
  clearInterval(jumpAttackIntevalId);
  clearInterval(walkIntevalId);
  clearInterval(moveWalkBackgroundX);
  clearInterval(moveBackgroundX);
  clearInterval(ScoreIntervalId);

  gameRunning = false;
  backgroundMusicCheck();
  DeadSound();
  deadAnimationStart();
}

function deadAnimationStart() {
  deadIntervalId = setInterval(deadAnaimation, 100);
}
function deadAnaimation() {
  deadImageNumber += 1;

  if (deadImageNumber >= 10) {
    clearInterval(deadIntervalId);
    gameOver.style.display = "block";
    scoreDisplay.textContent = `Your Score is : ${score}`;
  }

  hero.src = "images/Dead (" + deadImageNumber + ").png";
}

// Hero Score
function HeroScore() {
  ScoreIntervalId = setInterval(scoreCalculate, 100);
}

function scoreCalculate() {
  score += 10;
  scoreBoard.textContent = `Score : ${score}`;
  gameWin();
}

//Restart Game
function restartGame() {
  gameRunning = true;
  gameOver.style.display = "none";
  idleImageNumber = 0;
  runImageNumber = 0;
  attackImageNumber = 0;
  jumpImageNumber = 0;
  jumpAttackImageNumber = 0;
  walkImageNumber = 0;
  deadImageNumber = 0;
  idleIntevalId;
  runIntevalId;
  jumpIntevalId;
  attackIntevalId;
  jumpAttackIntevalId;
  walkIntevalId;
  deadIntervalId;
  moveEnemyIntervalId = 0;
  run = false;
  backgroundImagePosition = 0;
  moveBackgroundX;
  moveWalkBackgroundX;
  enemyMarginLeft = 1500;
  boyMarginTop = 500;
  // gameStart();
  window.location.reload();
}

// Game Win

function gameWin() {
  if (score >= 3000) {
    wonDisplay.style.display = "block";
    clearInterval(runIntevalId);
    clearInterval(walkIntevalId);
    clearInterval(moveEnemyIntervalId);
    clearInterval(jumpIntevalId);
    clearInterval(idleIntevalId);
    clearInterval(attackIntevalId);
    clearInterval(jumpAttackIntevalId);
    clearInterval(walkIntevalId);
    clearInterval(moveWalkBackgroundX);
    clearInterval(moveBackgroundX);
    clearInterval(ScoreIntervalId);
    gameRunning = false;
    backgroundMusicCheck();
    gameWinSound();
  }
}

// Music & sounds

function backgroundMusicCheck() {
  if (gameRunning) {
    backgroundMusic.play();
    backgroundMusic.loop = true;
  } else {
    backgroundMusic.pause();
  }
}

function DeadSound() {
  let gameOverMusic = new Audio("music/gameOver.mp3");
  gameOverMusic.play();
}

function gameWinSound() {
  let gameWinMusic = new Audio("music/win_sound.wav");
  gameWinMusic.play();
}

function jumpSound() {
  let gameJumpMusic = new Audio("music/jump.wav");
  gameJumpMusic.play();
}
