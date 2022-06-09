export class OrbLike {
    bounds: { x: { min: number; max: number }; y: { min: number; max: number } };
    x: number;
    y: number;
    scale: number;
    fill: number;
    radius: number;
    xOff: number;
    yOff: number;
    inc: number;
    // @ts-ignore
    graphics: PIXI.Graphics;
}

