// Utility Functions
function hexToRGBA(hex, opacity){
  var rgba = "rgba(";
  var inc = Math.abs(hex.length - 5);
  for (var i = 1; i < hex.length; i+=inc){
    var component = hex[i] + hex[i + (inc-1)];
    rgba += parseInt(component, 16) + ",";
  }
  return rgba + opacity + ")";
}
// abs() gives absolute val (modulus); -5 just produces correct increment (1 or 2, based on length of 4 or 7... #f0f vs #ff00ff)



class Particle{
  constructor(options, firstFrame){
    this.options = options;

    this.age = 0; // number of updates it has lived through

    this.canvas = options.canvas.element;
    this.ctx = options.canvas.ctx
    // rand between min to max, inclusive
    this.radius = Math.floor(Math.random()*(options.size.max - options.size.min +1)) + options.size.min;

    // Random vector components in range -1,1
    var randX = (Math.random()*2)-1;
    var randY = (Math.random()*2)-1;
    // Get magnitude of the random vector
    var mag = Math.sqrt(Math.pow(randX,2) + Math.pow(randY,2));
    // Use magnitude to normalise the vector components
    var normX = randX/mag;
    var normY = randY/mag;
    // Get a random speed for the particle in range min,max
    var speed = Math.random()*(options.speed.max-options.speed.min) + options.speed.min;
    // Get final vector components in random direction of random speed in range min,max
    this.xVel = normX*speed;
    this.yVel = normY*speed;

    var startPos = (firstFrame) ? this.getRandPos(false) : this.getRandPos(true);
    this.xPos = startPos.x;
    this.yPos = startPos.y;

    if (options.style.fill.color[0] == "#"){ // Hex color code
      this.fill = hexToRGBA(options.style.fill.color, options.style.fill.opacity);
    }else{
      this.fill = options.style.fill.color;
    }

  }

  getRandPos(onEdge){
    var pos = {};

    if (onEdge){
      var side = Math.floor(Math.random()*4) // 0-3

      if(side == 0){ // TOP
        pos.x = Math.floor(Math.random()*this.canvas.width);
        pos.y = (this.radius * -2); // 2*radius, negative to put it off canvas
      }else if(side==1){ // RIGHT
        pos.x = this.canvas.width + this.radius;
        pos.y = Math.floor(Math.random()*this.canvas.height);
      }else if(side==2){ // BOTTOM
        pos.x = Math.floor(Math.random()*this.canvas.width);
        pos.y = this.canvas.height + this.radius;
      }else if(side==3){ // LEFT
        pos.x = (this.radius * -2);
        pos.y = Math.floor(Math.random()*this.canvas.height);
      }
    }else{
      pos.x = Math.floor(Math.random()*this.canvas.width);
      pos.y = Math.floor(Math.random()*this.canvas.height);
    }

    return pos;
  }

  update(ctx){
    var ctxData = {};

    this.age++;
    if (this.age > 10 & this.outOfRange()){
      return false;
    }else{
      ctx.beginPath();
      ctx.arc(this.xPos, this.yPos, this.radius, 0, Math.PI*2);

      ctx.fillStyle = this.fill;
      ctx.fill();

      this.xPos += this.xVel;
      this.yPos += this.yVel;

      return ctx;
    }

  }

  outOfRange(){
    var outOfRange = false;
    if (this.xPos > this.canvas.width + this.radius){
      outOfRange = true;
    }else if (this.yPos > this.canvas.height + this.radius){
      outOfRange = true;
    }else if (this.xPos < this.radius*-1 | this.yPos < this.radius*-1){
      outOfRange = true;
    }
    return outOfRange;
  }

}




function bParticles(options){
  // Setup Canvas
  var container = document.querySelector(options.container);
  options.canvas = {};
  options.canvas.element = document.createElement('canvas');
  options.canvas.ctx = options.canvas.element.getContext('2d');
  options.canvas.element.style.cssText = "background-color: " + options.style.backgroundColor + ";";

  container.appendChild(options.canvas.element); // add canvas to DOM container

  // Recalculate velocity range relative to FPS...
  var fpsDivisor = 10 // chosen number which I decided gives best velocity control
  options.speed.min = options.speed.min/(options.fps/fpsDivisor);
  options.speed.max = options.speed.max/(options.fps/fpsDivisor);

  function resizeCanvas(){
    // create a temporary canvas to cache the canvas content
    var temp_canvas = document.createElement('canvas');
    var temp_ctx = temp_canvas.getContext('2d');
    // set it to the new width & height
    temp_canvas.width = container.offsetWidth;
    temp_canvas.height = container.offsetHeight;
    // draw current canvas content to it
    temp_ctx.drawImage(options.canvas.element, 0, 0);

    // resize original canvas (which blanks its content)
    options.canvas.element.width = container.clientWidth;
    options.canvas.element.height = container.clientHeight;
    // redraw original content back onto canvas
    options.canvas.ctx.drawImage(temp_canvas, 0, 0);
  }

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  // Particles
  var particles = [];

  var count = 0;
  const timerID = setInterval(function(){
    count++;

    // GEN new particles
    if (particles.length < options.amount){
      var p = new Particle(options, (count<=options.amount));
      particles.push(p)
    }

    // redraw particles
    options.canvas.ctx.clearRect(0, 0, options.canvas.element.width, options.canvas.element.height);
    for (i=particles.length-1; i>=0; i--){
      var particle = particles[i];

      var ctx = particle.update(options.canvas.ctx);
      if (!ctx){
        particles.splice(i,1);
      }else{
        options.canvas.ctx = ctx;
      }
    }


  }, 1000/options.fps);

}

// Find THIS bParticle.js import...
for (script of document.getElementsByTagName('script')){
  if (script == document.currentScript){
    particleOptions = JSON.parse(script.innerHTML);
  }
}

bParticles(particleOptions);
