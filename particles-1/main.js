;(function(w) {

	'use strict';
	console.log('Starting from scratch');

	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		W = w.innerWidth,
		H = w.innerHeight,
		numParticles = 150,
		particles = [],
		Particle = function(x, y) {
			this.x = Math.random() * W;
			this.y = Math.random() * H;
			this.radius = 4;

		};
		canvas.width = W;
		canvas.height = H;
		ctx.fillStyle = "rgba(0,0,0,1)";
	
	// This will create a rectangle of white color from the 
	// top left (0,0) to the bottom right corner (W,H)
	ctx.fillRect(0,0,W,H);
		Particle.prototype.draw = function() {
			ctx.fillStyle = "white";
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			console.log('drawing myself');
		};

	function setup() {
		for (var i = numParticles - 1; i >= 0; i--) {
			particles.push(new Particle);
				
		};
		console.log(particles);
		

	};

	function draw() {
		for (var i = particles.length - 1; i >= 0; i--) {
			particles[i].draw();
		};
	};

	function loop() {
		requestAnimFrame(loop);
	};

	function init() {
		setup();
		draw();
		loop();
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