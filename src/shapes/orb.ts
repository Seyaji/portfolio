import * as PIXI from "pixi.js";
import { OrbLike } from "../types";
import SimplexNoise from "simplex-noise";
import debounce from "debounce";

import { random, map } from "../uitls/math"

const simplex = new SimplexNoise


// Orb class
export class Orb extends OrbLike {

    constructor(fill = 0x000000) {
        super();
        this.bounds = this.setBounds();
        this.x = random(this.bounds["x"].min, this.bounds["x"].max);
        this.y = random(this.bounds["y"].min, this.bounds["y"].max);

        this.scale = 10;
        this.fill = fill;

        this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

        this.xOff = random(0, 1000);
        this.yOff = random(0, 1000);
        this.inc = 0.0002;

        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 0.825;

        window.addEventListener(
            "resize",
            debounce(() => {
                this.bounds = this.setBounds();
            }, 250)
        );
    }
    setBounds() {
        const maxDist = window.innerWidth < 1000 ? window.innerWidth / 2 : window.innerWidth / 3;
        const originX = window.innerWidth / 2
        const originY = window.innerWidth / 3

        return {
            x: {
                min: originX - maxDist,
                max: originX + maxDist,
            },
            y: {
                min: originY - maxDist,
                max: originY + maxDist,
            },
        };
    }

    update() {
        const xNoise = simplex.noise2D(this.xOff, this.xOff);
        const yNoise = simplex.noise2D(this.yOff, this.yOff);
        const scaleNoise = simplex.noise2D(this.xOff, this.yOff);
      
        this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
        this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
        this.scale = map(scaleNoise, -1, 1, 0.5, 1);
      
        this.xOff += this.inc;
        this.yOff += this.inc;
      }

      render() {
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.scale.set(this.scale);
      
        this.graphics.clear();
      
        this.graphics.beginFill(this.fill);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();
      }
}
