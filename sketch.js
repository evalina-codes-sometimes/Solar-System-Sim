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
let sun = new Star;

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
