Game.screens['game-over-menu'] = (function(game){
  function initialize(){
    document.getElementById('game-over-back').addEventListener(
      'click',
      function(){game.showScreen('main-menu');}
    )
  }

  function run(){
    document.getElementById('game-over-score').innerHTML = "Game Over <br> Score: " + game.getScore().toString(); 
  }

  return {
    init: initialize,
    run: run
  };

}(Game.game));