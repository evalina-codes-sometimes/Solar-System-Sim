// Capstone Coding Project 
// Evalina Maille
// November 19, 2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const AU = 35; 
const EARTH_YEAR = 365000;
let planets = [];
let moons = [];
let stars = [];
let stringFlipper = new Map();
let theMoon;



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
    sphere(this.diameter/2);//, this.x, this.y); 
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
    this.x = Math.cos(this.radians*this.orbitalPeriod)*this.distanceFromSun;
    this.y = Math.sin(this.radians*this.orbitalPeriod)*this.distanceFromSun; 
  }
  display(){
    noStroke();
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
    //translate(this.x, this.y, 0);

    //sphere(this.diameter/2);
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
    this.astronomicalUnits = 0.002444;
    this.orbiting = orbiting;
    this.radians = 0;
    this.distanceFromOrbiting = this.astronomicalUnits * AU + this.orbiting.diameter/2;
    this.x = this.orbiting.x + this.distanceFromOrbiting;                                                                            
    this.y = this.orbiting.y + this.distanceFromOrbiting; 
    this.mass;
    this.diameter = 1;
    this.orbitalPeriod = earthYears * EARTH_YEAR;
    this.orbitalVelocity = 2* Math.PI * this.distanceFromOrbiting/this.orbitalPeriod;
  }
  orbit(){
    this.radians += this.orbitalVelocity; 
    this.x = Math.cos(this.radians*this.orbitalPeriod)*this.distanceFromOrbiting + Math.cos(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun;
    this.y = Math.sin(this.radians*this.orbitalPeriod)*this.distanceFromOrbiting + Math.sin(this.orbiting.radians*this.orbiting.orbitalPeriod)*this.orbiting.distanceFromSun;
    //This has an example of how to solve, with a very good formula. Should try it out. 
    //https://www.google.com/search?sca_esv=6998cc71aa68975d&q=sin(x)+%2B+sin(10x)&source=lnms&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J7pRxUp2pI1mXV9fBsfh39Jw_Y7pXPv6W9UjIXzt09-YtiqJSnyznYMycaNNv7N_qyqA4nWiNpMBQ-7f5KgNVAh12h29aAKQPuzuPcMwfTQBzc1pQOFZyAaBYXuqtpmZcvsjt3wMGURkScfI-cTqUyiiBliztZhwmvMvmJMMIg2jPaA72A&sa=X&ved=2ahUKEwi21-nMwqCKAxVCATQIHer_CzsQ0pQJegQICBAB&biw=1592&bih=776&dpr=1
  }
  display(){
    fill(this.colour);
    circle(this.x, this.y, this.diameter);
    this.orbit(this.x, this.y);
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
  theMoon = new Moon(earth, -27/365);
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
