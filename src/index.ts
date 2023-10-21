import * as PIXI from 'pixi.js';

let width = window.innerWidth;
let height = window.innerHeight;
const app = new PIXI.Application<HTMLCanvasElement>({width: width, height: height});
document.body.appendChild(app.view);

let sprite = PIXI.Sprite.from('../src/circles_PFP.png');
sprite.anchor.set(0.5);
sprite.scale.set(0.5, 0.5);
sprite.position.set(width/2, height/2);
app.stage.addChild(sprite);

console.log(sprite.width);
// Add a variable to count up the seconds our demo has been running
