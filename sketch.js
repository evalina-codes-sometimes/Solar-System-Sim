// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const AU = 35; 
const EARTH_YEAR = 36500;
let planets = [];
let moons = [];
let stars = [];
let stringFlipper = new Map();



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
    noStroke();
    circle(this.x, this.y, this.diameter); 
    //rotateY(millis(1000)/36);
  }
}

class Planet {
  constructor(astronomicalUnits, earthYears, orbiting){
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
  }

  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians)*this.distanceFromSun;
    this.y = Math.sin(this.radians)*this.distanceFromSun; 
  }
  display(){
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
  }
  displayOrbit() {
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
    this.astronomicalUnits = 0.002254;
    this.orbiting = orbiting;
    this.radians = 0;
    this.distanceFromOrbiting = this.astronomicalUnits * AU + this.orbiting.diameter/2;
    this.x = Math.cos(this.radians)*this.distanceFromOrbiting;
    this.y = Math.sin(this.radians)*this.distanceFromOrbiting; 
    this.mass;
    this.diameter = 3;
    this.orbitalPeriod = earthYears * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromOrbiting/this.orbitalPeriod;
  }
  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians)*this.distanceFromOrbiting;
    this.y = Math.sin(this.radians)*this.distanceFromOrbiting; 
  }
  display(){
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
    this.displayOrbit();
  }
  displayOrbit() {
    smooth();
    noFill();
    strokeWeight(0.25);
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
//create a function to store my map settings to shorted setup 
//add if statement with type 

function assignData(){
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
      planets.push(tempThing);

    }
    tempThing.diameter = bodiesData.getNum(row, "diameter"); 
    tempThing.orbitalPeriod = bodiesData.getNum(row, "earthYr");
    tempThing.colour = bodiesData.get(row, "colour");
  }
}

function preload(){
  bodiesData = loadTable("SSDataSheet.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  stringFlipper.set('Star', Star);
  stringFlipper.set('Planet', Planet);
  assignData();
}

function draw() {
  let theMoon = new Moon(earth, 27/365);
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
