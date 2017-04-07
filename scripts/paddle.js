class paddle_event {
	constructor(name, direction){
		this.name = name;
		this.direction = direction;
	}
}

Game.paddle = function(game){
  'use strict'
  
  function generatePaddle(){
    var that = {};

    var events = [];

    // Upper left coordinate, and widht/height of paddle
    that.width = game.canvas.width / 7;
    that.height = game.canvas.height / 40;
    that.halfFlag = false;
    that.x = game.canvas.width / 2 - that.width / 2;
    that.y = (game.canvas.height - 10) - that.height;
    that.speed = 8;
    that.moveLeft = false;
    that.moveRight = false;
    that.color = "#a8353b";

    that.keydownListener = window.addEventListener('keydown', function(event){
      if(event.keyCode === 37){
        that.moveLeft = true;
      }
      if(event.keyCode === 39){
        that.moveRight = true;
      }
    })
    
    that.keyupListener = window.addEventListener('keyup', function(e){
      if(e.keyCode === 37){
        that.moveLeft = false;
      }
      if(event.keyCode === 39){
        that.moveRight = false;
      }
    })

    that.draw = function (){
      let context = game.canvas.getContext("2d");
      context.save();
      context.beginPath();
      context.rect(that.x, that.y, that.width, that.height);
      context.fillStyle = that.color;
      context.shadowColor = '#999';
      context.shadowBlur = 5;
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.fill();
      context.closePath();
      context.restore();
    }

    that.update = function (){
      if(that.moveRight){
        if((that.x + that.width) + that.speed <= game.canvas.width)
          that.x += that.speed;
        else
          that.x = game.canvas.width - that.width;
      }
      if(that.moveLeft){
        if(that.x - that.speed >= 0)
          that.x -= that.speed;
        else
          that.x = 0;
      }
      // for(let i = 0; i < events.length; i++){
      //   if(events[i].name === 'move'){
    
      //   }
      // }
      // events.length = 0;
    }

    that.getHitBox = function (){
      return {
        x: that.x, 
        y: that.y, 
        width: that.width, 
        height: that.height
      };
    }

    that.halfPaddle = function(){
      if(!that.halfFlag){
        that.halfFlag = true;
        that.width /= 2;
      }
    }

    return that;
  }

  return{
    generatePaddle: generatePaddle
  }
}(Game.game)