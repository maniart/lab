;(function(w) {

	'use strict';

		// Vars
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		W = w.innerWidth,
		H = w.innerHeight,
		numParticles = 150,
		particles = [],
		// Particle constructor
		Particle = function() {
			this.x = Math.random() * W;
			this.y = Math.random() * H;
			this.vx = -1 + Math.random() * 2;
			this.vy = -1 + Math.random() * 2;
		};
	// Setting up the stage
	canvas.width = W;
	canvas.height = H;
	ctx.fillStyle = "rgba(0,0,0,1)";
	ctx.fillRect(0 ,0 ,W ,H);
	// Shared members
	Particle.prototype.draw = function() {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	};
	Particle.prototype.update = function() {
		this.y += this.vy;
		this.x += this.vx;
		

	};
	Particle.prototype.collision = function() {
		
			if (this.x < 0) {
				this.vx *= -1;
			} else if (this.x > W) {
				this.vx *= -1
			}
			if (this.y < 0) {
				this.vy *= -1;
			} else if (this.y > H) {
				this.vy *= -1
			}
	};
	Particle.prototype.radius = 1;
	function clear() {
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, W, H);
	};
	function setup() {
		for (var i = numParticles - 1; i >= 0; i--) {
			particles.push(new Particle);
					
		};
		//console.log(particles);
	};

	function draw() {
		clear();
		for (var i = particles.length - 1; i >= 0; i --) {
			particles[i].draw();
			ctx.fillStyle = "white";
		};
		requestAnimFrame(draw);	
	};

	function update() {
		
		for (var i = particles.length - 1; i >= 0; i --) {
			particles[i].update();
			particles[i].collision();
		};
		requestAnimFrame(update);
	};

	function loop() {
		requestAnimFrame(loop);
	};

	function init() {
		setup();
		update();
		draw();
		//loop();
	};


	// RequestAnimFrame: a browser API for getting smooth animations
	window.requestAnimFrame = (function(){
  	return  window.requestAnimationFrame       || 
		  	window.webkitRequestAnimationFrame || 
		  	window.mozRequestAnimationFrame    || 
		  	window.oRequestAnimationFrame      || 
		  	window.msRequestAnimationFrame     ||  
		  	function( callback ){
				window.setTimeout(callback, 1000 / 60);
		  	};
	})();

	w.onload = init;

})(window);