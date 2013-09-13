;(function(w) {

	'use strict';

		// Vars
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		W = w.innerWidth,
		H = w.innerHeight,
		numParticles = 140,
		minDist = 100,
		particles = [],
		dist,
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
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillRect(0, 0, W, H);
	// Shared members
	Particle.prototype.draw = function() {
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	};
	Particle.prototype.radius = 1;
	
	function distance(p1, p2) {
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y;
		dist = Math.sqrt(dx * dx + dy * dy);
		if (dist <= minDist) {
			
			ctx.beginPath();
			ctx.strokeStyle = "rgba(0,0,0,"+ (.4-dist/minDist) +")";

			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			
			ctx.closePath();
			var ax = dx / 2000,
				ay = dy / 2000;
			p1.vx -= .2 * ax;
			p1.vy -= .2 * ay;	
			p2.vx += .2 * ax;
			p2.vy += .2 * ay;
		}	
	};

	function clear() {
		ctx.fillStyle = "rgba(255,255,255,.3)"
		ctx.fillRect(0, 0, W, H);
	};
	function setup() {
		for (var i = numParticles; i >= 0; i--) {
			particles.push(new Particle());
				
		};
		//console.log(particles);
	};


	function update() {
		var particle1,
			particle2;

		for (var i = 0; i < particles.length; i ++) {
			particle1 = particles[i]; 
			
			particle1.x += particle1.vx;
			particle1.y += particle1.vy;

			if (particle1.x > W) {
				particle1.vx *= -1; 
			} else if (particle1.x < 0) {
				particle1.vx *= -1;
			}
			if (particle1.y > H) {
				particle1.vy *= -1; 
			} else if (particle1.y < 0) {
				particle1.vy *= -1;
			}
			
			for(var j = i + 1; j < particles.length; j++) {
				particle2 = particles[j];
				distance(particle1, particle2);
			}


	
		}
	};
	function draw() {
		clear();
		for (var i = particles.length - 1; i >= 0; i --) {
			particles[i].draw();
		};
		update();	
	};
	function loop() {
		draw();
		requestAnimFrame(loop);
	};
	function init() {
		setup();
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