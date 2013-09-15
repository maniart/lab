;(function(w) {

	'use strict';

	// Vars
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		W = w.innerWidth,
		H = w.innerHeight,
		particles = [],	
		dist,
		args = {
			radius : 1,
			minDist : 100,
			blur : 1,
			colors: [
				'rgba(100,200,300)',
				'rgba(200,0,22)',
				'rgba(255,23,200)'
			],

			isColor : false,
			toggleColor: function() {
				console.log(args.isColor);
				args.isColor != args.isColor;

				if (this.isColor) {
					for (var i = particles.length ; i > 0 ; i -= 1) {
						return colors[ Math.floor(Math.random() * 3) ];	
					}
				} else {
					for (var i = particles.length ; i > 0 ; i -= 1) {
						return 'rgba(0,0,0,1)';	
					}
				}

			} 
		},
		// Particle constructor
		Particle = function(args) {
			this.x = Math.random() * W;
			this.y = Math.random() * H;
			this.color = 'rgba(0,0,0,1)';
			this.vx = -1 + Math.random() * 2;
			this.vy = -1 + Math.random() * 2;
			this.radius = args.radius;
		};
	// Setting up the stage
	canvas.width = W;
	canvas.height = H;
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fillRect(0, 0, W, H);
	// Shared members
	//Particle.prototype.radius = 1;
	Particle.prototype.draw = function() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	};	
	function distance(p1, p2) {
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y;
		dist = Math.sqrt(dx * dx + dy * dy);
		if (dist <= args.minDist) {
			
			ctx.beginPath();
			ctx.strokeStyle = "rgba(0,0,0,"+ (.4-dist/args.minDist) +")";

			ctx.moveTo(p1.x, p1.y);
			ctx.lineTo(p2.x, p2.y);
			ctx.stroke();
			
			ctx.closePath();
			var ax = dx / (args.minDist * 20),
				ay = dy / (args.minDist * 20);
			p1.vx -= (args.minDist / Math.pow(100,2)) * ax;
			p1.vy -= (args.minDist / Math.pow(100,2)) * ay;	
			p2.vx += (args.minDist / Math.pow(100,2)) * ax;
			p2.vy += (args.minDist / Math.pow(100,2)) * ay;
		}	
	};

	function clear() {
		ctx.fillStyle = "rgba(255,255,255,"+ 1/args.blur +")";
		ctx.fillRect(0, 0, W, H);
	};
	function setup(args) {
		for (var i = 200; i >= 0; i--) {
			var p = new Particle(args);
			particles.push(p);
		};
		setupDatGui();
	};


	function update() {
		var particle1,
			particle2;
		
		for (var i = 0; i < particles.length; i ++) {
			particle1 = particles[i]; 
			particle1.radius = args.radius;
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
	function setupDatGui() {
	    var gui = new dat.GUI();
	    gui.remember(args);
	    gui.add(args, 'radius', 0, 10).step(1);
	    gui.add(args, 'minDist', 100, 200).step(1);
		gui.add(args, 'blur', 1, 100).step(1);
		gui.add(args, 'toggleColor');
	};
	function init() {
		setup(args);
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