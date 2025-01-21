// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
const AU = 35; 
const EARTH_YEAR = 3650000;
const EARTH_DAY = 1;
let planets = [];
let moons = [];
let stars = [];
let stringFlipper = new Map();
let theMoon;
let bg;
let sunTexture;
let mercuryTexture;
let venusTexture;
let ceresTexture;
let earthTexture;
let jupiterTexture;
let saturnTexture;
let uranusTexture;
let neptuneTexture;
let plutoTexture;
let erisTexture; 

//Different classes which could be subclasses but I was scared to break stuff
class Star {
  constructor(x, y, earthDays) {
    this.texture;
    this.x = x;
    this.y = y; 
    this.colour;
    this.mass;
    this.diameter;
    this.surfaceTemp;
    this.brightness; 
    // this.theName;
    this.day = EARTH_DAY * earthDays;
  }

  display() {
    noStroke();
    this.rotateOnAxis();
    //push and pop here allows for the proper functioning of 'panorama' in the draw loop
    push();
    texture(this.texture);
    sphere(this.diameter/2);
    pop();
  }

  rotateOnAxis() {
    rotate(frameCount /this.day);
  }
}
class Planet {
  constructor(astronomicalUnits, earthYears, orbiting, orbitalInclination, earthDays){
    this.astronomicalUnits = astronomicalUnits;
    this.orbiting = orbiting;
    this.radians = 0;
    this.distanceFromSun = this.astronomicalUnits * AU + this.orbiting.diameter/2;
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
    this.mass;
    this.diameter;
    this.orbitalPeriod = earthYears * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromSun/this.orbitalPeriod;
    this.moons;
    this.ringSystem;
    this.eclipticAngle = createVector(0, 0, orbitalInclination);
    this.rotationalAxis = 0;
    this.texture;
    this.day = EARTH_DAY*earthDays;
    this.rings = [];
  }
  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians*this.orbitalPeriod)*this.distanceFromSun;
    this.y = Math.sin(this.radians*this.orbitalPeriod)*this.distanceFromSun; 
    
  }
  display(){
    // rotate(this.rotationalAxis, this.eclipticAngle);
    rotateZ(this.rotationalAxis);
    noStroke();
    fill(this.colour);
    push();
    translate(this.x, this.y, 0);
    // this.displayRings();
    this.rotateOnAxis();
    // textureMode(IMAGE);
    if (this.texture !== undefined){
      rotateX(1.5708);
      texture(this.texture);
    }
    // if (this.ringSystem){
    //   for (let theRing in this.rings){
    //     theRing.displayRing();
    //   }
    // }
    sphere(this.diameter/2);
    this.orbit(this.x, this.y);
    pop();
    //circle(this.x, this.y, this.diameter);
    //translate(this.x, this.y, 0);
  }
  displayOrbit() {
    //rotateZ(this.eclipticAngle);
    rotateZ(this.rotationalAxis);
    // rotate(this.eclipticAngle, [0, 1, 1]);
    rotate(this.eclipticAngle, [1, 0, 1]);
    noFill();
    strokeWeight(0.5);
    stroke('white');
    circle(this.orbiting.x, this.orbiting.y, this.distanceFromSun*2);
  }
  displayRings(){
    for (let theRing in this.rings){
      fill(this.r, this.g, this.b);
      push();
      translate(this.x, this.y, 0);
      torus(this.ringRadius, this.ringTubeRadius, 24, 2);
      pop();

    }
  }
  rotateOnAxis() {
    rotate(frameCount /this.day);
  }
  assignRings(){
    if (this.ringSystem){
      this.rings.push(assignRingData(ringData, this));
    }
  }
  createMoon(){
    let someMoon = new Moon(this); 
  }
}
class Moon {
  constructor(orbiting, earthYears){ 
    this.colour = "white";
    this.astronomicalUnits = 0.002444;
    this.orbiting = orbiting;
    this.radians = 0;
    this.distanceFromOrbiting = this.astronomicalUnits * AU + this.orbiting.diameter/2;
    this.x = this.orbiting.x + this.distanceFromOrbiting;                                                                            
    this.y = this.orbiting.y + this.distanceFromOrbiting; 
    this.mass;
    this.diameter = 1;
    this.orbitalPeriod = this.orbiting.orbitalPeriod+ earthYears * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromOrbiting/this.orbitalPeriod;
  }

  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun + Math.cos(this.radians*Math.PI/this.orbitalPeriod)*this.distanceFromOrbiting;
    this.y = Math.sin(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun + Math.sin(this.radians*Math.PI/this.orbitalPeriod)*this.distanceFromOrbiting;
  }

  display(){
    noStroke();
    fill(this.colour);
    push();
    translate(this.orbiting.x, this.orbiting.y, 0);
    sphere(this.diameter/2);
    this.orbit();
    pop();
  }

  displayOrbit() {
    smooth();
    noFill();
    strokeWeight(0.025);
    stroke('white');
    circle(this.orbiting.x, this.orbiting.y, this.distanceFromOrbiting*2);
  }
}

class Ring{
  constructor(surrounding){
    this.surrounding = surrounding;
    this.ringRadius;
    this.ringTubeRadius;
    this.r;
    this.g;
    this.b;
    this.x = this.surrounding.x;
    this.y = this.surrounding.y;
  }
  displayRing(){
    fill(this.r, this.g, this.b);
    // push();
    // translate(this.x, this.y, 0);
    torus(this.ringRadius, this.ringTubeRadius, 24, 2);
    // pop();
  }
}

function checkForStar(body){
  //mostly for deugging purposed, also assigns the sun as a centre point for orbit
  if (stars.includes(sun)){
    return sun;
  }
  else{
    console.log("No sun sorry!");
  }
}

//Use data sheet to assign values to bodies
function assignData(bodiesData){
  //Iterate through rows
  for (let row = 0; row<bodiesData.getRowCount(); row++){
    //assign temporary variable
    let tempThing;
    //Create stars
    if (bodiesData.get(row, "type") === "Star"){
      tempThing = eval(`${bodiesData.get(row, "theName")} = new ${stringFlipper.get(bodiesData.get(row, "type"))}(0,0, bodiesData.getNum(row, "dayLength"));`);
      tempThing.diameter = bodiesData.get(row, "diamteter"); 
      tempThing.colour = bodiesData.get(row, "colour"); 
      stars.push(tempThing);
    }
    else if (bodiesData.get(row, 'type') === "Planet"){  //      class Type                                        dist AU,                         Earth Years,                       orbiting object,    orbital inclination,                         day length
      console.log('hey');
      tempThing = eval(`${bodiesData.get(row, "theName")} = new ${stringFlipper.get(bodiesData.get(row, "type"))}(bodiesData.getNum(row, "distAu"), bodiesData.getNum(row, "earthYr"), checkForStar(), bodiesData.getNum(row, "orbitalInclination"), bodiesData.getNum(row, "dayLength"));`); 
      tempThing.ringSystem = stringFlipper.get(bodiesData.get(row, 'hasrings'));
      tempThing.diameter = bodiesData.get(row, "diameter");
      tempThing.colour = bodiesData.get(row, "colour");
      tempThing.eclipticAngle = bodiesData.getNum(row, "orbitalInclination");
      planets.push(tempThing);
    }
    tempThing.texture = stringFlipper.get(bodiesData.getString(row, "theTexture"));
    tempThing.diameter = bodiesData.getNum(row, "diameter"); 
    tempThing.orbitalPeriod = bodiesData.getNum(row, "earthYr");
    tempThing.colour = bodiesData.get(row, "colour");
  }
}

//Attempt at recreation of assign bodies data but for rings, it is breaking somewhere... :(
function assignRingData(ringData, connectedThing){
  let tempArray = [];
  for (let row = 0; ringData.getRowCount(); row++){
      
    let tempThing;
    console.log('where is it breaking');
   
    tempThing = eval(`${ringData.get(row, "ringName")} = new ${stringFlipper.get(ringData.getString(row, "class"))}(connectedThing);`);
    tempThing.ringRadius = ringData.getNum(row, 'ringRadius');
    tempThing.ringTubeRadius = ringData.getNum(row, 'ringTubeRadius');
    tempThing.r = ringData.getNum(row, 'r');
    tempThing.g = ringData.getNum(row, 'g');
    tempThing.b = ringData.getNum(row, 'b');
    tempArray.push(tempThing); 
    
  }
  return tempArray;
  
}

function preload(){
  //Prepare all images and the data sheet to be used 
  ringData = loadTable('RingDataSheet.csv', 'csv', 'header');
  bodiesData = loadTable("SSDataSheet.csv", "csv", "header");
  bg = loadImage('360nightSky.jpg');
  sunTexture = loadImage('sunTexture.png');
  mercuryTexture = loadImage('mercuryTexture.png');
  venusTexture = loadImage('venusTexture.png');
  earthTexture = loadImage("earthTexture.png");
  marsTexture = loadImage("marsTexture.png");
  ceresTexture = loadImage('ceresTexture.png');
  jupiterTexture = loadImage('jupiterTexture.png');
  saturnTexture = loadImage('saturnTexture.png');
  uranusTexture = loadImage('uranusTexture.png');
  neptuneTexture = loadImage('neptuneTexture.png');
  plutoTexture = loadImage('plutoTexture.png');
  erisTexture = loadImage('erisTexture.png');
}
function FlipStrings(){
  //Map vairable names form data sheet and class types
  stringFlipper.set('Ring', Ring);
  stringFlipper.set('Star', Star);
  stringFlipper.set('Planet', Planet);
  stringFlipper.set('sunTexture', sunTexture);
  stringFlipper.set('mercuryTexture', mercuryTexture);
  stringFlipper.set('venusTexture', venusTexture);
  stringFlipper.set('ceresTexture', ceresTexture);
  stringFlipper.set('earthTexture', earthTexture);
  stringFlipper.set('marsTexture', marsTexture);
  stringFlipper.set('jupiterTexture', jupiterTexture);
  stringFlipper.set('saturnTexture', saturnTexture);
  stringFlipper.set('uranusTexture', uranusTexture);
  stringFlipper.set('neptuneTexture', neptuneTexture);
  stringFlipper.set('plutoTexture', plutoTexture);
  stringFlipper.set('erisTexture', erisTexture);
  stringFlipper.set('no', false);
  stringFlipper.set('yes', true);
}

function setup() {
  //Display instructions as a window alert before proceeding with simulation
  window.alert("Left-click to rotate, right-click to pan.");
  //get everything set up 
  FlipStrings();
  createCanvas(windowWidth, windowHeight, WEBGL);
  assignData(bodiesData);
  for (thePlanet in planets){
    if (thePlanet.ringSystem){
      //supposed to create an array of rings to store within the planet class, its being dumb :(
      thePlanet.assignRings();
    }
  }
  //Moon orbit is not working, but the shape it (not very helpful)
  //theMoon = new Moon(earth, 27/365);
 
}

function draw() {
  //Big shoutout to Luc Coutu for helping me find this beautiful function (also built in to p5js)
  panorama(bg);
  //built into p5js, allows for 3D panning 
  orbitControl();

  //Execute functions by class type
  for (let thePlanet of planets){
    thePlanet.displayOrbit();
    thePlanet.display();
    thePlanet.displayRings();
  }
  for (let theStar of stars){
    theStar.display();
  }

  //theMoon.display();
}
