import * as PIXI from 'pixi.js';

const orbitTimes = new Map<string, number>;
orbitTimes.set('mercury', 88);
orbitTimes.set('venus', 225);
orbitTimes.set('earth', 365);
orbitTimes.set('mars', 687);
orbitTimes.set('jupiter', 4333);
orbitTimes.set('saturn', 10759);
orbitTimes.set('uranus', 30687);
orbitTimes.set('neptune', 60190);

//window width and height
let width = window.innerWidth;
let height = window.innerHeight;
//constant radius
const CENTER_X = width/2;
const CENTER_Y = height/2
//document setup
const app = new PIXI.Application<HTMLCanvasElement>({width: width, height: height});
document.body.appendChild(app.view);

app.ticker.add() => {

}
