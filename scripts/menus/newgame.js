myGame.screens['new-game-menu'] = (function(game){
    function initialize(){
        document.getElementById('new-game-5x5-button').addEventListener(
            'click',
            function(){
                events.push(new event('new-maze', 5))
            }
        )

        document.getElementById('new-game-10x10-button').addEventListener(
            'click',
            function(){
                events.push(new event('new-maze', 10))
            }
        )

        document.getElementById('new-game-15x15-button').addEventListener(
            'click',
            function(){
                events.push(new event('new-maze', 15))
            }
        )

        document.getElementById('new-game-20x20-button').addEventListener(
            'click',
            function(){
                events.push(new event('new-maze', 20))
            }
        )

        document.getElementById('new-game-back-button').addEventListener(
            'click',
            function(){game.showScreen('main-menu')}
        )
    }

    function run(){
    }

    return {
        initialize: initialize,
        run: run
    };
}(myGame.game))