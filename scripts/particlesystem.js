Game.particle = function(game){
  
  function generateParticleSystem(brick){
    var that = {};
    var particles = [];
    that.x = brick.x;
    that.y = brick.y;
    that.width = brick.width;
    that.height = brick.height;
    that.lifetime = 300; // In milliseconds
    that.killme = false;

    that.createParticle = function(){
      p = {
        side: Math.random() * 3,
        x: Math.random() * (that.width) + that.x,
        y: Math.random() * (that.height) + that.y,
        speed: Math.random() * 100,
        direction:{x: 0, y: 1},
        lifetime: Random.nextGaussian(500, 200), //lifetime in ms
      }

      p.side = Math.max(p.side, p.side * -1);
      p.speed = Math.max(p.speed, -1*p.speed);
      p.lifetime = Math.max(p.lifetime, -1*p.speed);
      return p;
    }

    for(let i = 0; i < 500; i++){
      particles.push(that.createParticle());
    }

    that.draw = function(){
      context = game.canvas.getContext('2d');
      for(let i = 0; i < particles.length; i++){
        context.save();
        context.beginPath();
        context.rect(particles[i].x, particles[i].y, particles[i].side, particles[i].side);
        context.fillStyle = 'yellow';
        context.fill();
        context.closePath();
        context.restore();
      }
    }

    that.update = function(elapsedTime){
      that.lifetime -= elapsedTime;
      if(that.lifetime >= 0){
        // if(particles.length < 50){
        //   particles.push(that.createParticle());
        // }
      }
      else{
        if(particles.length == 0){
          that.killme = true;
        }
      }

      for(let i = 0; i < particles.length; i++){
        particles[i].lifetime -= elapsedTime;

        if(particles[i].lifetime <= 0){
          particles.splice(i, 1);
          i--;
          continue;
        }
        else{
          particles[i].x += elapsedTime/1000 * particles[i].speed * particles[i].direction.x;
          particles[i].y += elapsedTime/1000 * particles[i].speed * particles[i].direction.y;
        }
      }
    }

    return that;
  }

  return{
    generateParticleSystem: generateParticleSystem,

  }
}(Game.game)