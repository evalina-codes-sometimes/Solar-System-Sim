// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const AU = 40; 
const EARTH_YEAR = 10000;

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y; 
    this.colour;
    this.mass;
    this.diameter;
    this.surfaceTemp;
    this.brightness; 
  }

  display() {
    fill(this.colour);
    stroke("white");
    circle(this.x, this.y, this.diameter); 
    //rotateY(millis(1000)/36);
  }
}

class Planet {
  constructor(n, v){
    this.radians = 0;
    this.distanceFromSun = n * AU;
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
    this.mass;
    this.diameter;
    this.orbitalPeriod = v * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromSun/this.orbitalPeriod;
    this.rotationPeriod;
    this.moons;
    this.ringSystem;
  }
  // getvelocity(){
  //   let velocity = 2* Math.PI * this.distanceFromSun/this.orbitalPeriod;
  //   return velocity;
  // }

  orbit(y, x){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
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
  earth = new Planet(1, 1);
  sun.diameter = 300;
  earth.distanceFromSun = 200;
  earth.colour = "blue"; 
  earth.diameter = 0.3; 
  sun.colour = "yellow";
}


function draw() {
  background(0);
  orbitControl();
  sun.display();
  earth.display();
}
