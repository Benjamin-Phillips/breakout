Game.screens['countdown'] = function(game){
  let countdiv = document.getElementById("count");
  let count;
  let counter = 0;
  let running = false;

  function initialize(){
      
  }

  function run(){
    count = 3;
    running = true;
    counter = 0;
    // let cur = performance.now();
    // let prev = cur;
    countdiv.innerHTML = count.toString();
    // while(i > 0){
    //   if(cur - prev >= 1000){
    //     i--;
    //     count.innerHTML = i.toString();
    //     prev = cur;
    //   }
    //   else{
    //     cur = performance.now();
    //   }
    // }
    // game.showScreen(null);
  }

  function update(elapsedTime){
    counter += elapsedTime;
    if(counter > 1000){
      if(--count == 0){
        running = false;
        game.showScreen(null);
        game.toggleActive();
        return;
      }
      counter -= 1000;
      countdiv.innerHTML = count.toString();
    }
  }

  function isRunning(){
    return running;
  }

  return {
    init: initialize,
    run: run,
    update: update,
    isRunning: isRunning
  };
}(Game.game)