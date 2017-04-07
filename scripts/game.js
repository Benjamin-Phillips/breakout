var Game = {
  screens: {}
};

var particleGenerators = [];

Game.game = (function(screens){
  'use strict';
  var curTime = performance.now()
  var prevTime = null;
  var events = [];
  var canvas = document.getElementById("game-area");
  var active;

  var balls = [];
  var paddle;

  var highScores = [];
  var score;
  
  function getHighScores(){
    return highScores;
  }

  function showScreen(id){
    var screen = 0, active = null;

		// Remove active elements to ensure only one will be active at a time
		active = document.getElementsByClassName('active');
		for (screen = 0; active.length > 0; ) {
			active[screen].classList.remove('active');
		}

		// Start running that screen, then set it as the active screen 
    if(id != null){
      document.getElementById(id).classList.add('active');
      document.getElementById('menu-background').classList.add('active');
      screens[id].run();
    }
    else{
      document.getElementById('menu-background').classList.remove('active');
    }
  }

  function gameOver(){
    active = false;
    highScores.push(score);
    highScores.sort(function(a, b){
      if(a < b){
        return 1
      }
      else if(b < a){
        return -1
      }
      else{
        return 0
      }
    });
    if(highScores.length > 5){
      highScores.length = 5;
    }
    window.localStorage.setItem("Game.highScores", JSON.stringify(highScores));
    showScreen('game-over-menu');
  }

  function death(){
    Game.lives.die();
    if(Game.lives.getLives() > 0){
      active = false;
      paddle = Game.paddle.generatePaddle();
      balls.push(Game.ball.generateBall(paddle.x + paddle.width/2, paddle.y - 9));
      showScreen('countdown');
    }
    else{
      gameOver();
    }
  }

  function gameStart(){
    paddle = Game.paddle.generatePaddle();
    Game.brickField.init();
    Game.lives.init();
    balls = [];
    balls.push(Game.ball.generateBall(canvas.width/2, paddle.getHitBox().y - 9));
    score = 0;
  }

  function init(){
    var screen = null;
    active = false;

    let previousScores = window.localStorage.getItem('Game.highScores');
		if (previousScores !== null) {
      highScores = JSON.parse(previousScores);
		}

    // paddle = Game.paddle.generatePaddle();
    // Game.brickField.init();
    // Game.lives.init();

    let menu = document.getElementById('menu-area');
		menu.style.width = canvas.width.toString() + 'px';
		menu.style.height = (canvas.height + document.getElementById("board").height).toString() + 'px';
		menu.style.left = (getComputedStyle(canvas).getPropertyValue("left")).toString();

    for(var i in Game.screens){
      Game.screens[i].init();
    }
    showScreen('main-menu');
    // balls.push(Game.ball.generateBall(canvas.width/2, paddle.getHitBox().y - 9));
    gameStart();
    requestAnimationFrame(gameLoop);
  }

  function gameLoop(){
    prevTime = curTime
	  curTime = performance.now()
	  var elapsedTime = curTime - prevTime

    if(active){
      update(elapsedTime);
    }
    if(screens['countdown'].isRunning()){
      screens['countdown'].update(elapsedTime);
    }

    render();

    window.requestAnimationFrame(gameLoop);
  }

  function update(elapsedTime){
    // Update paddle
    paddle.update();

    for(let i = 0; i < particleGenerators.length; i++){
      particleGenerators[i].update(elapsedTime);
      if(particleGenerators[i].killme){
        particleGenerators.splice(i, 1);
        i--;
      }
    }

    //Update each ball
    for(let i = 0; i < balls.length; i++){
      // If ball is dead, delete it
      if(!balls[i].isAlive()){
        balls.splice(i, 1);
        i--;
      }
      else{
        balls[i].update();
        detectBallCollision(balls[i]);
      }
    }

    document.getElementById('current-score').innerHTML = "Score: " + score.toString();
    if(balls.length === 0){
      death();
    }
  }

  function render(){
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    Game.lives.draw(paddle);
    drawGameField();
    paddle.draw();
    Game.brickField.draw();

    for(let i = 0; i < particleGenerators.length; i++){
      particleGenerators[i].draw();
    }

    for(let i = 0; i < balls.length; i++){
      balls[i].draw(canvas);
    }
  }

  function detectBallCollision(ball){
    var leftside = ball.x - ball.radius;
    var rightside = ball.x + ball.radius;
    var top = ball.y - ball.radius;
    var bottom = ball.y + ball.radius;

    // First check walls
    // Check left wall
    if(leftside <= 0){
      ball.xDirection = -ball.xDirection;
      ball.x = ball.radius;
    }
    // Check right wall
    if(rightside >= canvas.width){
      ball.xDirection = -ball.xDirection;
      ball.x = canvas.width - ball.radius;
    }
    // Check top wall
    if(top <= 0){
      ball.yDirection = -ball.yDirection;
      ball.y = ball.radius;
    }

    // Check paddle collision 
    if(bottom < paddle.y + paddle.height && bottom >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.width){
      ball.xDirection = (ball.x - (paddle.x + .5 * paddle.width)) / (paddle.width/ 3);
      ball.yDirection = -ball.yDirection;
      ball.y = paddle.y - ball.radius;
    }

    // Detect if ball is within the brickField hitbox 
    var brickFieldBox = Game.brickField.getHitBox(); 
    if(top < brickFieldBox.bottom && top > Game.brickField.getHitBox().top || bottom > brickFieldBox.top && bottom < brickFieldBox.bottom){
      Game.brickField.brickCollisionCheck(ball, paddle)
    }
    // else if(bottom < )
  }

  function drawGameField(){
    let context = canvas.getContext("2d");
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
  } 

  function toggleActive(){
    active = !active;
  }

  function addToScore(x){
    score += x;
  }

  function getScore(){
    return score;
  }

  return {
    init: init,
    showScreen: showScreen,
    canvas,
    toggleActive: toggleActive,
    getHighScores: getHighScores,
    gameStart: gameStart,
    addToScore: addToScore,
    getScore: getScore
  }
}(Game.screens));