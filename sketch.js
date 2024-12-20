// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const AU = 35; 
const EARTH_YEAR = 3650000;
let planets = [];
let moons = [];
let stars = [];
let stringFlipper = new Map();
let theMoon;
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


class Star {
  constructor(x, y) {
    this.texture;
    this.x = x;
    this.y = y; 
    this.colour;
    this.mass;
    this.diameter;
    this.surfaceTemp;
    this.brightness; 
  }

  display() {
    //fill(this.colour);
    noStroke();
    texture(this.texture);
    sphere(this.diameter/2);//, this.x, this.y); 
    //rotateY(millis(1000)/36);
  }
 
}

class Planet {
  constructor(astronomicalUnits, earthYears, orbiting, orbitalInclination){
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
  }

  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians*this.orbitalPeriod)*this.distanceFromSun;
    this.y = Math.sin(this.radians*this.orbitalPeriod)*this.distanceFromSun; 
    
  }
  display(){
    // rotate(this.rotationalAxis, this.eclipticAngle);
   // rotateZ(this.rotationalAxis);
    noStroke();
    fill(this.colour);
    push();
    translate(this.x, this.y, 0);
    // textureMode(IMAGE);
    if (this.texture !== undefined){
     // rotateX(90);
      texture(this.texture);
    }
    sphere(this.diameter/2);
    this.orbit(this.x, this.y);
    pop();
    //circle(this.x, this.y, this.diameter);
    //translate(this.x, this.y, 0);

  }
  displayOrbit() {
    //rotateZ(this.eclipticAngle);
    // rotate(this.eclipticAngle, [0, 1, 1]);
   // rotate(this.eclipticAngle, [1, 0, 1]);
    noFill();
    strokeWeight(0.5);
    stroke('white');
    circle(this.orbiting.x, this.orbiting.y, this.distanceFromSun*2);
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
    this.x = Math.cos(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun + Math.cos(this.radians*this.orbitalPeriod)*this.distanceFromOrbiting;
    this.y = Math.sin(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun + Math.sin(this.radians*this.orbitalPeriod)*this.distanceFromOrbiting;
    //This has an example of how to solve, with a very good formula. Should try it out. 
    //https://www.google.com/search?sca_esv=6998cc71aa68975d&q=sin(x)+%2B+sin(10x)&source=lnms&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J7pRxUp2pI1mXV9fBsfh39Jw_Y7pXPv6W9UjIXzt09-YtiqJSnyznYMycaNNv7N_qyqA4nWiNpMBQ-7f5KgNVAh12h29aAKQPuzuPcMwfTQBzc1pQOFZyAaBYXuqtpmZcvsjt3wMGURkScfI-cTqUyiiBliztZhwmvMvmJMMIg2jPaA72A&sa=X&ved=2ahUKEwi21-nMwqCKAxVCATQIHer_CzsQ0pQJegQICBAB&biw=1592&bih=776&dpr=1
  }
  display(){
    fill(this.colour);
    noStroke();
    fill(this.colour);
    push();
    translate(this.x, this.y, 0);
    sphere(this.diameter/2);
    this.orbit(this.x, this.y);
    pop();
    // circle(this.x, this.y, this.diameter);
    // this.orbit(this.x, this.y);
    //this.displayOrbit();
  }
  displayOrbit() {
    smooth();
    noFill();
    strokeWeight(0.025);
    stroke('white');
    circle(this.orbiting.x, this.orbiting.y, this.distanceFromOrbiting*2);
  }
}

function checkForStar(body){
  if (stars.includes(sun)){
    return sun;
  }
  else{
    console.log("No sun sorry!");
  }
}
//create different if statements for different body types 
//Create body super class and look into sub classes 
//create function for displaying moons and rings 
//create a function to store my map settings to shorten setup 

function assignData(bodiesData){
//n this will work!!!!
  //eval(`${bodiesData.getString(0, "theName")} = new ${stringFlipper.get(bodiesData.get(0, "type"))}();`);
  for (let row = 0; row<bodiesData.getRowCount(); row++){
    let tempThing;
    if (bodiesData.get(row, "type") === "Star"){
      tempThing = eval(`${bodiesData.get(row, "theName")} = new ${stringFlipper.get(bodiesData.get(row, "type"))}(0,0);`);
      tempThing.diameter = bodiesData.get(row, "diamteter"); 
      tempThing.colour = bodiesData.get(row, "colour"); 
      stars.push(tempThing);
    }
    else if (bodiesData.get(row, 'type') === "Planet"){  //      class Type                                        dist AU,                         Earth Years,                       orbiting object
      tempThing = eval(`${bodiesData.get(row, "theName")} = new ${stringFlipper.get(bodiesData.get(row, "type"))}(bodiesData.getNum(row, "distAu"), bodiesData.getNum(row, "earthYr"), checkForStar());`); 
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

function preload(){
  bodiesData = loadTable("SSDataSheet.csv", "csv", "header");
  sunTexture = loadImage('sunTexture.jpg');
  mercuryTexture = loadImage('mercuryTexture.jpg');
  venusTexture = loadImage('venusTexture.jpg');
  earthTexture = loadImage("no_ice_clouds.jpg");
  ceresTexture = loadImage('ceresTexture.jpg');
  jupiterTexture = loadImage('jupiterTexture.jpg');
  saturnTexture = loadImage('saturnTexture.jpg');
  uranusTexture = loadImage('uranusTexture.jpg');
  neptuneTexture = loadImage('neptuneTexture.jpg');
  plutoTexture = loadImage('plutoTexture.jpg');
  erisTexture = loadImage('erisTexture.jpg');
}

function FlipStrings(){
  stringFlipper.set('Star', Star);
  stringFlipper.set('Planet', Planet);
  stringFlipper.set('sunTexture', sunTexture);
  stringFlipper.set('mercuryTexture', mercuryTexture);
  stringFlipper.set('venusTexture', venusTexture);
  stringFlipper.set('ceresTexture', ceresTexture);
  stringFlipper.set('earthTexture', earthTexture);
  stringFlipper.set('jupiterTexture', jupiterTexture);
  stringFlipper.set('saturnTexture', saturnTexture);
  stringFlipper.set('uranusTexture', uranusTexture);
  stringFlipper.set('neptuneTexture', neptuneTexture);
  stringFlipper.set('plutoTexture', plutoTexture);
  stringFlipper.set('erisTexture', erisTexture);
}

function setup() {
  FlipStrings();
  createCanvas(windowWidth, windowHeight, WEBGL);
  assignData(bodiesData);
  theMoon = new Moon(earth, 27/365);
}

function draw() {
  background(0);
  orbitControl();
  for (let thePlanet of planets){
    thePlanet.displayOrbit();
    thePlanet.display();
  }
  for (let theStar of stars){
    theStar.display();
  }
  theMoon.display();
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
