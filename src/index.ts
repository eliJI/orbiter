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
    R: number;
    name: string;
    dps: number;
    angle: number;
    x: number;
    y: number;
    circle: PIXI.Graphics;

    constructor(name:string, dps:number, radius: number) {
        this.name = name;
        this.dps = dps;
        this.angle = 0;
        this.R = radius;
        this.x = this.R * Math.cos(this.angle);
        this.y = this.R * Math.sin(this.angle);
        this.circle = new PIXI.Graphics();
        this.init();
    }

    init(): void {
        this.circle.beginFill(0xF6F900);
        this.circle.drawCircle(this.x,this.y, 10);
        app.stage.addChild(this.circle);
    }

    draw(): void {
        this.angle = (this.angle + this.dps)%360;
        this.circle.x = CENTER_X + this.R * Math.cos(this.angle);
        this.circle.y = CENTER_Y + this.R * Math.sin(this.angle);
    }
}





let testCircle = new PIXI.Graphics();
testCircle.beginFill(0xF6F900);
testCircle.drawCircle(width/2,height/2,20);
app.stage.addChild(testCircle);


function degPerSec(days: number, scale: number): number {
    let scaledPeriod = days/scale;
    return 360/scaledPeriod;
}

function generatePlanets(baseOrbits: Map<string,number>, scale: number): Planet[] {
    let planets: Planet[] = []
    
    //radius modifier controls how far each planet is from each other 
    let radius_mod = 1;
    for (let [key, value] of baseOrbits) {
        planets.push(new Planet(key, degPerSec(value, scale),radius_mod*10));
        radius_mod += 5;
    }
    return planets
}

const planets = generatePlanets(orbitTimes, 0.07);
console.log(planets);

//360 degrees per revolution
// mecury: 8.8 seconds 
//  venus: 22.55 seconds
//  earth: 36.5 seconds
//   mars: 68.77 seconds
//jupiter: 433.3 seconds per orbit
// saturn: 1075.9 seconds 
// uranus: 3068.7
//neptune: 6019 seconds

//coordinate calculation
//sin(angle) -> Y/R => Y = Rsin(angle)
//cos(angle -> X/R => X = Rcos(angle))
//app.ticker.maxFPS = 60;
app.ticker.add(() => {
    planets.forEach((planet) => {
        planet.draw();
    })
})
