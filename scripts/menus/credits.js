Game.screens['credits'] = (function(game){
  function initialize(){
    document.getElementById('credits-back-button').addEventListener(
      'click',
      function(){
        game.showScreen('main-menu');
      }
    )
  }

  function run(){

  }

  return {
    init: initialize,
    run: run
  }
}(Game.game));