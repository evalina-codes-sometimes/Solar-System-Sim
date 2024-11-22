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
    sphere(this.radius); 
    //rotateY(millis(1000)/36);
  }
}

class Planet {
  constructor(){
    this.mass;
    this.diameter;
    this.distanceFromSun;
    this.orbitalPeriod;
    this.orbitalVelocity;
    this.rotationPeriod;
    this.moons;
    this.ringSystem;
  }
}

let sun = new Star;

let earth = new Planet;
// earth.mass = 5.97, earth.diameter = 3475, earth.distanceFromSun = 149.6;
// earth.orbitalPeriod = 365.2, earth.orbitalVelocity = 29.8, earth.moons = 1, earth.ringSystem = false; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  sun.colour = "yellow"; 
  sun.radius = 35; 

}


function draw() {
  background(220);
  orbitControl();
  sun.display();
}
