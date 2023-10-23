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

class Planet {
    degreesPerTick: number;
    theta: number = 0;
    radius: number;
    circle: PIXI.Graphics;


    constructor(degreesPerTick: number, radius: number) {
        this.degreesPerTick = degreesPerTick;
        this.radius = radius;
        this.circle = new PIXI.Graphics();
    }

    init() {
        this.circle.beginFill(0x4287f5);
        this.circle.drawCircle(0, 0, 10);
        app.stage.addChild(this.circle);
    }

    draw() {
        this.circle.x = CENTER_X + this.radius * Math.cos(this.theta)
        this.circle.y = CENTER_Y + this.radius * Math.sin(this.theta);
        this.theta = this.theta + this.degreesPerTick;
    }
}

let center = new PIXI.Graphics()
center.beginFill(0x4287f5);
center.drawCircle(CENTER_X, CENTER_Y, 20)
app.stage.addChild(center);

let planet = new Planet(.05, 80);
planet.init();
app.ticker.add(() => {
    planet.draw();
});
