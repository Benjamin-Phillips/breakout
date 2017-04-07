Game.screens['main-menu'] = (function(game){
	function init(){
		// Initialize button listeners for each button
		document.getElementById('main-new-game-button').addEventListener(
			'click',
			function() {game.showScreen('countdown'); game.gameStart()}
		)

		document.getElementById('main-high-score-button').addEventListener(
			'click',
			function(){game.showScreen('high-score-menu');}
		)

		document.getElementById('main-credits-button').addEventListener(
			'click',
			function(){game.showScreen('credits');}
		)
	}

	function run(){

	}

	return {
		init: init,
		run: run
	};

}(Game.game));