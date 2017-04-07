Game.lives = function(game){
  var canvas;
  var lives;
  var margin = 10;

  function init(){
    canvas = document.getElementById("board")
    lives = 3;
  }

  function draw(paddle){
    context = canvas.getContext('2d');
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for(let i = 0; i < lives; i++){

      context.beginPath();
      context.rect(canvas.width - (paddle.width * (i + 1)) - margin*(i+1), canvas.height/3, paddle.width, canvas.height/3);
      context.fillStyle = paddle.color;
      context.fill();
      context.closePath();
    }
  }

  function die(){
    lives--;
  }

  function getLives(){
    return lives;
  }

  return{
    init: init,
    draw: draw,
    die: die,
    getLives: getLives,

  }
}(Game.game);