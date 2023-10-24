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
const CENTER_Y = height/2;
//document setup
const app = new PIXI.Application<HTMLCanvasElement>({antialias: true, width: width, height: height});
document.body.appendChild(app.view);

class Planet {
    degreesPerTick: number;
    theta: number = 0;
    radius: number;
    circle: PIXI.Graphics;
    path: PIXI.Graphics;


    constructor(degreesPerTick: number, radius: number) {
        this.degreesPerTick = degreesPerTick;
        this.radius = radius;
        this.circle = new PIXI.Graphics();
        this.path = new PIXI.Graphics();
    }

    init() {
        //the path
        this.path.lineStyle(2,0xffffff,0.5,0.5);
        this.path.drawCircle(CENTER_X, CENTER_Y, this.radius);
        this.path.endFill();
        app.stage.addChild(this.path);

        //planet drawing
        this.circle.beginFill(0x4287f5);
        this.circle.drawCircle(0, 0, 10);
        this.circle.endFill();
        app.stage.addChild(this.circle);
        
      
        
    }

    draw() {
        this.circle.x = CENTER_X + this.radius * Math.cos(this.theta)
        this.circle.y = CENTER_Y + this.radius * Math.sin(this.theta);
        this.theta = this.theta + this.degreesPerTick;
    }
}

//generates planets with a varaible scale and radius
function generatePlanets(planets: Map<string, number>, scale: number, radius: number): Planet[] {
    let scaledPlanets: Planet[] = [];
    let distancemod = 0;
    let distance = 10 + radius;
    planets.forEach((value, key) =>{
        let degreesPerTick = (360 / value) * scale;
        scaledPlanets.push(new Planet(degreesPerTick, distance));
        distance += radius + distancemod;
        distancemod += 10;

    });
    console.log(scaledPlanets);
    return scaledPlanets;
}

//sun from texture 
let sun = PIXI.Sprite.from("textures/suntexture.png");
sun.anchor.set(0.5,0.5);
sun.scale.set(0.5);
sun.position.set(CENTER_X, CENTER_Y);
app.stage.addChild(sun);

//generating planets objects
let planets = generatePlanets(orbitTimes,.01,50);

//initializing the planet
planets.forEach((planet) => {
    planet.init();
})

//main render loop
app.ticker.add(() => {
    planets.forEach((planet) => {
        planet.draw()
    })
});
