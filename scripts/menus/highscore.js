Game.screens['high-score-menu'] = (function(game){
  function initialize(){
    document.getElementById('high-score-back').addEventListener(
      'click',
      function(){game.showScreen('main-menu');}
    )
  }

  function run(){
    let scoreOutput = document.getElementById("high-scores");
    scoreOutput.innerHTML = '';
    scores = game.getHighScores();
    for(i in scores){
      scoreOutput.innerHTML += scores[i] + '<br>'
    }
  }

  return {
    init: initialize,
    run: run
  };

}(Game.game));