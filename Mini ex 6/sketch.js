var sound1, img1;
var numSegments = 24, //number of joints
  x = [],
  y = [],
  angle = [],
  segLength = 20, //lenght of tentacle
  targetX, targetY,
  ballX = 340, //Invisible ball's starting point on X axis
  ballY = 150, //Invibisle ball's starting point on Y axis
  ballXDirection = 1,
  ballYDirection = -1;

function preload() {
sound1 = loadSound("assets/Interference.mp3"); //Loads the music
img1 = loadImage("assets/Skin.png"); //Loads the filter
}

for (var i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup() {
  sound1.setVolume(1); //Music volume
  sound1.play(); // Plays the music
  createCanvas(710, 400);
  strokeWeight(20);
  stroke(179, 61, 59);
  noFill();
  frameRate(12);

  x[x.length-1] = width/2; // Set base x-coordinate
  y[x.length-1] = height;  // Set base y-coordinate
}

function draw() {
  background(0);

  strokeWeight(); //Turns the ball invisible
  ballX = ballX += random(-24, 24) * ballXDirection; //Makes invisible ball jitter on X axis
  ballY = ballY += random(-24, 24) * ballYDirection; //Makes invisible ball jitter on Y axis

  ellipse(ballX, ballY, 30, 30);

  reachSegment(0, ballX, ballY);
  for(var i=1; i<numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for(var j=x.length-1; j>=1; j--) {
    positionSegment(j, j-1);
  }
  for(var k=0; k<x.length; k++) {
    segment(x[k], y[k], angle[k], (k+1)*2);
  }
  image(img1, 0,0);
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin) {
  var dx = xin - x[i];
  var dy = yin - y[i];
  angle[i] = atan2(dy, dx);
  targetX = xin - cos(angle[i]) * segLength;
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a, sw) {
  strokeWeight(sw);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}