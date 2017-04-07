class brick {
  constructor(x, y, colorIndex){
    this.x = x;
    this.y = y;
    this.colorIndex = colorIndex;
    if(colorIndex == 0){
      this.score = 1;
    }
    else if(colorIndex == 1){
      this.score = 2;
    }
    else if(colorIndex == 2){
      this.score = 3;
    }
    else if(colorIndex == 3){
      this.score = 5;
    }
  }
}

// IIFE for the brick field, which consists of rows and columns of bricks.
Game.brickField = function(game){
  var brickWidth, brickHeight, brickPadding, columns, rows;
  var offsetTop; // Brick field offset from top
  var bricks = []
  var colorArray = [];

  function init(){
    bricks = [];
    colorArray = [];
    columns = 14;
    rows = 8;
    offsetTop = game.canvas.height / 7;
    brickPadding = 2;
    brickWidth = game.canvas.width / columns - 2 * brickPadding;
    brickHeight = game.canvas.height / 3 / rows - 2 * brickPadding;
    
    colorArray.push('yellow');
    colorArray.push('orange');
    colorArray.push('blue');
    colorArray.push('green');
    
    for(let row = 0; row < rows; row++){
      bricks[row] = [columns];
      for(let column = 0; column < columns; column++){
        bricks[row][column] = new brick(((column * (2 * brickPadding + brickWidth)) + brickPadding), 
          (offsetTop + (row * (brickHeight + 2 * brickPadding)) + brickPadding), Math.floor((rows - row - 1)/2));
      }
    }
  }

  function drawBrick(bricky){
    let context = game.canvas.getContext("2d");
    context.save();
    context.fillStyle = "#a8353b";
    context.shadowColor = '#999';
    context.shadowBlur = 5;
    context.shadowOffsetX = 1;
    context.shadowOffsetY = 1;
    context.beginPath();
    context.rect(bricky.x, bricky.y, brickWidth, brickHeight);
    context.fillStyle = colorArray[bricky.colorIndex]
    context.fill();
    context.closePath();
    context.restore();
  }

  function hitBrick(bricky){
    bricky.colorIndex -= 1;

    if(bricky.colorIndex < 0){
      delete bricky
    }
  }

  function draw(){
    for(let row = 0; row < rows; row++){
      for(let column = 0; column <bricks[row].length; column++){
        drawBrick(bricks[row][column]);
      }
    }
  }

  function update(){
    
  }

  function brickCollisionCheck(ball, paddle){
    var top = ball.y - ball.radius;
    var bottom = ball.y + ball.radius;
    var right = ball.x + ball.radius;
    var left = ball.x - ball.radius;

    for(let row = 0; row < rows; row++){
      for(let column = 0; column < bricks[row].length; column++){
        var curBrick = bricks[row][column]
        var brickTop = curBrick.y;
        var brickBottom = curBrick.y + brickHeight;
        var brickLeft = curBrick.x;
        var brickRight = curBrick.x + brickWidth;

        if(bottom > brickTop && bottom < brickBottom){
          if(left > brickLeft && left < brickRight || right > brickLeft && right < brickRight){
            ball.yDirection = -ball.yDirection;
            ball.yDirectionNormal = -ball.yDirectionNormal;
            curBrick.colorIndex -= 1;
            if(curBrick.colorIndex < 0){
              ball.kills++;
              curBrick.width = brickWidth;
              curBrick.height = brickHeight;
              particleGenerators.push(Game.particle.generateParticleSystem(curBrick));              
              game.addToScore(curBrick.score);
              if(curBrick.score == 5){
                paddle.halfPaddle();
              }
              bricks[row].splice(column, 1);
              column -= 1;
            }
            return;
          }
        }
        else if(top < brickBottom && top > brickTop){
          if(left > brickLeft && left < brickRight || right > brickLeft && right < brickRight){
            ball.yDirection = -ball.yDirection;
            ball.yDirectionNormal = -ball.yDirectionNormal;
            curBrick.colorIndex -= 1;
            if(curBrick.colorIndex < 0){
              ball.kills++;
              curBrick.width = brickWidth;
              curBrick.height = brickHeight;
              particleGenerators.push(Game.particle.generateParticleSystem(curBrick));
              game.addToScore(curBrick.score);
              if(curBrick.score == 5){
                paddle.halfPaddle();
              }
              bricks[row].splice(column, 1);
              column -= 1;
            }
            return;
          }
        }
      }
    }
  }

  function getHitBox(){
    return {
      top: offsetTop,
      bottom: (offsetTop + game.canvas.height / 3)
    }
  }

  return{
    init: init,
    draw: draw,
    brickCollisionCheck: brickCollisionCheck,
    getHitBox: getHitBox
  }

}(Game.game);