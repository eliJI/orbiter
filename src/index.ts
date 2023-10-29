import * as PIXI from 'pixi.js';

//orbital body data
const planetaryData: planetData[] = [
    {
        name: 'mercury',
        days:  88,
        color: 0x63615e,
    },
    {
        name: 'venus',
        days: 225,
        color: 0xe6939b
    },
    {
        name: 'earth',
        days: 365,
        color: 0xa0e39f
    },
    {
        name: 'mars',
        days: 687,
        color: 0x7a1806
    },
    {
        name: 'jupiter',
        days: 4333,
        color: 0x857d63
    },
    {
        name: 'saturn',
        days: 10759,
        color: 0xffe07d
    },
    {
        name: 'uranus',
        days: 30687,
        color: 0x8dd1e0
    },
    {
        name: 'neptune',
        days: 60190,
        color: 0x4d60bf
    }

]
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
    theta = 0;
    radius: number;
    color: number
    circle: PIXI.Graphics;
    path: PIXI.Graphics;
    satellites: Planet[] = [];


    constructor(degreesPerTick: number, radius: number, color: number) {
        this.degreesPerTick = degreesPerTick;
        this.radius = radius;
        this.circle = new PIXI.Graphics();
        this.path = new PIXI.Graphics();
        this.color = color;
    }

    init(relative_center_x: number, relative_center_y: number) {
        //orbit path
        this.path.lineStyle(2,this.color,0.4,0.5);
        this.path.drawCircle(relative_center_x, relative_center_y, this.radius);
        this.path.endFill();
        app.stage.addChild(this.path);

        //planet drawing
        this.circle.beginFill(this.color);
        this.circle.drawCircle(0, 0, 10);
        this.circle.endFill();

        //satellite orbit path
        this.satellites.forEach(satellite => {
            this.circle.lineStyle(1,satellite.color,0.4,0.5);
            this.circle.drawCircle(0,0,satellite.radius)
            this.circle.endFill();
        });

        app.stage.addChild(this.circle);    
        //move to default position
        this.circle.x = relative_center_x + this.radius * Math.cos(0)
        this.circle.y = relative_center_y + this.radius * Math.sin(0);

    }

    draw(relative_center_x: number, relative_center_y: number) {
        this.circle.x = relative_center_x + this.radius * Math.cos(this.theta)
        this.circle.y = relative_center_y + this.radius * Math.sin(this.theta);
        this.theta = this.theta + this.degreesPerTick;

        this.satellites.forEach(satellite => {
            satellite.draw(this.circle.x, this.circle.y);
        });
    }
}

class Satellite extends Planet {
    constructor(degreesPerTick: number, radius: number, color: number) {
        super(degreesPerTick,radius,color);
    }
    init(relative_center_x: number, relative_center_y: number) {
   
        //planet drawing
        this.circle.beginFill(this.color);
        this.circle.drawCircle(0, 0, 5);
        this.circle.endFill();
        app.stage.addChild(this.circle);    
        //move to default position
        this.circle.x = relative_center_x + this.radius * Math.cos(0)
        this.circle.y = relative_center_y + this.radius * Math.sin(0);

    }

}

interface planetData {
    name: string,
    days: number,
    color: number,
}

//generates planets with a varaible scale and radius
function generatePlanets(planets: planetData[], scale: number, radius: number): Planet[] {
    let scaledPlanets: Planet[] = [];
    let distancemod = 0;
    let distance = 10 + radius;
    planets.forEach(planet =>{
        let degreesPerTick = (360 / planet.days) * scale;
        scaledPlanets.push(new Planet(degreesPerTick, distance, planet.color));
        distance += radius + distancemod;
        distancemod += 10;

    });
    console.log(scaledPlanets);
    return scaledPlanets;
}

//sun from texture 
let sun = new PIXI.Graphics();
sun.beginFill(0xffb300);
sun.drawCircle(0,0,30);
sun.position.set(CENTER_X, CENTER_Y);
app.stage.addChild(sun);

//generating planets objects
let planets = generatePlanets(planetaryData,.01,50);

let test_satellite = new Satellite(0.13, 30, 0xffc0cb);
planets[2].satellites.push(test_satellite);
//initializing the planet
planets.forEach((planet) => {
    planet.init(CENTER_X, CENTER_Y);
    planet.satellites.forEach(satellite => {
        satellite.init(planet.circle.x, planet.circle.y);
    });
})

//main render loop
app.ticker.add(() => {
    planets.forEach((planet) => {
        planet.draw(CENTER_X, CENTER_Y);
        //planet.satellites.forEach(satellite => {
            //satellite.draw(planet.circle.x, planet.circle.y);
        //});
    })
});
