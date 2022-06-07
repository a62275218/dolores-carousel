import Particle from './firework'
import 'p5'
let firework;

function setup (){
  let canvas = createCanvas(200, 200);
  canvas.parent('back-canvas');
  stroke(255);
  strokeWeight(4);
  firework = new Particle(100,100)
}
function draw() {
  background(0);
  firework.update();
  firework.show()
}
