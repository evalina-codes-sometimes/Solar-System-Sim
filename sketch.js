// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y; 
    this.colour;
    this.mass;
    this.radius;
    this.surfaceTemp;
    this.brightness; 
  }

  display() {
    fill(this.colour);
    stroke("orange");
    circle(this.x, this.y, this.radius); 
    //rotateY(millis(1000)/36);
  }
}

class Planet {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.mass;
    this.diameter;
    this.distanceFromSun;
    this.orbitalPeriod;
    this.orbitalVelocity;
    this.rotationPeriod;
    this.moons;
    this.ringSystem;
    this.radians = 0;
  }
  getvelocity(){
    let velocity = 2* Math.PI * this.distanceFromSun/8000;
    return velocity;
  }

  orbit(y, x){
    this.radians += this.getvelocity(); 
    this.x = this.x + Math.cos(this.radians)*10;
    this.y = this.y + Math.sin(this.radians)*10; 
  }
  display(){
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
    //console.log(earth.radians);
  }
}

let sun = new Star(0, 0);

// earth.mass = 5.97, earth.diameter = 3475, earth.distanceFromSun = 149.6;
// earth.orbitalPeriod = 365.2, earth.orbitalVelocity = 29.8, earth.moons = 1, earth.ringSystem = false; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  earth = new Planet(0, 0);
  
  earth.distanceFromSun = 100;
  earth.colour = "blue"; 
  earth.diameter = 50; 
  sun.radius = 100;
  sun.colour = "yellow";
}


function draw() {
  background(220);
  orbitControl();
  sun.display;
  earth.display();
}
