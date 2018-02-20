

var canvasMidpoint = width/2;

// this object holds all other objects, inlcuding dynamically created ones
var space = {
    bgrnd: [color(0,0,0), color(35, 25, 55), color(25, 30, 40), color(30, 25, 30)],
    stars: [],
    sun: {
        winston: getImage("creatures/Winston"),
        theSize: 100,
        theRadius: 50,
        xPos: canvasMidpoint - 50,
        yPos: canvasMidpoint - 50
    },
    planets: []
};

var setUpBackground = function(){
    background(space.bgrnd[0]); // black background, corners
    noStroke();
    fill(space.bgrnd[3]);
    ellipse(125,190,325,350);   // dark grey background, top left
    fill(space.bgrnd[2]);
    ellipse(206,325,500,100);   // dark teal background, bottom left
    fill(space.bgrnd[1]);
    ellipse(293,200,340,420);   // dark marine blue background, right
};

// creates a star object, which really is just pertinent attributes
var createRandomStar = function(){
    var x = random(0,width);    // random x position
    var y = random(0,height);   // random y position
    var size = random(1,5);     // random small size
    // random star color; values are high to maintain a star's probable color
    var nextStarColor = color(random(230,255),random(230,255),random(0,255));
    // returns attributes as an object
    return {theX: x, theY: y, theSize: size, nextColor: nextStarColor};
};

// calls createRandomStar() a fixed number of times which instantiates new objects
var createStars = function() {
    for (var i=0; i<30; i++){
        // each object returned is pushed to the space.stars[] array
        space.stars.push(createRandomStar());
    }
};

// creates the necessary attributes for planet objects
// radiusOffset ensures that planets are properly spaced, avoiding collisions
var createRandomPlanet = function(radiusOffset){
    var theRadius = 70+radiusOffset;    // distance from canvas center to planets' x
    var theAngle = random(0,360);       // random angle gives random starting positions
    var theAngleOffset = random(-3,3);  // gives random orbit speeds & directions
    // these next 2 lines are what calculate the next positions of the orbiting
    // planets.  Thanks: https://www.khanacademy.org/partner-content/nasa/measuringuniverse/orbital-mechanics/p/coding-a-circular-orbit
    var theX = canvasMidpoint+theRadius*cos(theAngle);  
    var theY = canvasMidpoint+theRadius*sin(theAngle);
    var theSize = random(10,35);        // random planet size
    var nextColor = color(random(50,255),random(50,255),random(50,255));
    // returns planetary attributes in an object to the caller statement
    return {x: theX, y: theY, size: theSize, theColor: nextColor, 
        radius: theRadius, angle: theAngle, angleOffset: theAngleOffset};
};

// uses createRandomPlanet() to instantiate objects 
// that are pushed to space.planets[] array
var createPlanets = function() {
    for (var i=0; i<4; i++){
        space.planets.push(createRandomPlanet(40*i));
    }
};

// calls the necessary functions to start this engine.  vroom vroom
var setUpSpace = function(){
    setUpBackground();  // sets up space and stars
    createStars();      // dynamically creates and saves star objects
    createPlanets();    // dynamically creates and saves planet objects
};

// draws the stars onto the space background.  local vars are created to make
// the last two statements in the for loop easier on the eyes.
var populateStars = function() {
    for (var i=0; i<30; i++){
        var x = space.stars[i].theX;
        var y = space.stars[i].theY;
        var size = space.stars[i].theSize;
        var nextStarColor = space.stars[i].nextColor;
        fill(nextStarColor);
        ellipse(x,y,size,size);
    }
};

// draws the sun onto the space background
var populateSun = function() {
    image(space.sun.winston,space.sun.xPos,space.sun.yPos,
        space.sun.theSize,space.sun.theSize);
};

// draws canvas image with current attributes sans the planets 
var maintainBackground = function(){
    setUpBackground();
    populateStars();
    populateSun();
};

// makes calcs to determine, update, and draw planetary orbital positions.
// local vars are created to make the last 2 statements easier on the eyes.
var orbitPlanets = function(){
    for (var i=0; i<space.planets.length; i++){
        var theRadius = space.planets[i].radius;
        space.planets[i].angle += space.planets[i].angleOffset; // updates angles
        var theAngle = space.planets[i].angle; 
        // the next two calculate the current planetary orbital positions
        space.planets[i].x = canvasMidpoint+theRadius*cos(theAngle);
        space.planets[i].y = canvasMidpoint+theRadius*sin(theAngle);
        var theX = space.planets[i].x;
        var theY = space.planets[i].y;
        var theSize = space.planets[i].size;
        var nextColor = space.planets[i].theColor;
        fill(nextColor);    
        ellipse(theX,theY,theSize,theSize);
    }
};

// calling this creates everything needed for the draw function
setUpSpace();

draw = function() {
    maintainBackground();   
    orbitPlanets();
};