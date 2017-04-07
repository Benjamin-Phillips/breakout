Game.ball = function(){
  let radius = 9;
  let speed = 3;

  // Game.ball = function(canvas){
  generateBall = function(x = radius, y = radius, color = '#58b7fa'){
    // var balls = [];
    var that = {};

    that.radius = 9;
    that.x = x;
    that.y = y;
    that.color = color;
    that.xDirection = 1;
    that.yDirection = -1;
    that.xDirectionNormal = 1;
    that.yDirectionNormal = -1;
    that.speed = speed;
    that.alive = true;
    that.kills = 0;

    // The canvas parameter is the canvas to draw the ball on.
    that.draw = function(canvas){
      let context = canvas.getContext("2d");
      context.save();
      context.beginPath();
      context.arc(that.x, that.y, that.radius, 0, 2*Math.PI);
      context.fillStyle = that.color;
      context.fill();
      context.closePath();
      context.restore();
    }

    that.update = function(){
      // Normalize the vector
      let z = Math.sqrt(Math.pow(that.xDirection, 2) + Math.pow(that.yDirection, 2));
      let xDirNormal = that.xDirection / z;
      let yDirNormal = that.yDirection / z;

      that.x += xDirNormal * that.speed;
      that.y += yDirNormal * that.speed;

      if(that.kills < 4){
        that.speed = 4;
      }
      else if(that.kills < 12){
        that.speed = 5;
      }
      else if(that.kills < 36){
        that.speed = 7;
      }
      else if(that.kills < 62){
        that.speed = 8;
      }
      if(that.y-that.radius > Game.game.canvas.height){
        that.alive = false;
      }
    }

    that.isAlive = function(){
      return that.alive;
    }

    // function xDirectionUpdate(bally){
    //   if(bally.xDirection > 0){
    //     if(bally.xDirection + bally.x <= canvas.width){
    //       bally.x += bally.xDirection;
    //     }
    //     else{
    //       bally.x = canvas.width - radius;
    //       bally.xDirection = -bally.xDirection;
    //     }
    //   }

    //   else if(bally.xDirection < 0){
    //     if(bally.xDirection + bally.x >= 0){
    //       bally.x += xDirection;
    //     }
    //     else{
    //       bally.x = 0 + radius;
    //       bally.xDirection = -bally.xDirection;
    //     }
    //   }
    // }

    return that;
  }

  return{
    generateBall: generateBall,
  }
}();