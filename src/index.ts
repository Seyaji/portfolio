import * as PIXI from "pixi.js";
import { Orb } from "./shapes/orb";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";

import "./img/logo.svg";
import "./css/styles.css";

const app = new PIXI.Application({
    view: document.querySelector(".orb-canvas"),
    resizeTo: window,
    backgroundAlpha: 0,
});

app.stage.filters = [new KawaseBlurFilter(30, 10, true)];
const orbs: Orb[] = [];

for (let i = 0; i < 5; i++) {
    const colors = [
        0x8C0343,
        0xF20587,
        0x5F1BBF,
        0x6649A6,
        0x04D939,
        0xF20587,
        0x0006E6,
        0x5F1BBF,
        0x6649A6,
    ];
    const orb = new Orb(colors[i]);
    app.stage.addChild(orb.graphics);

    orbs.push(orb);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    app.ticker.add(() => {
        orbs.forEach((orb) => {
            orb.update();
            orb.render();
        });
    });
} else {
    orbs.forEach((orb) => {
        orb.update();
        orb.render();
    });
}




const home = document.getElementById("home")
const homeLocation = home.offsetTop

const skills = document.getElementById("skills")
const skillsLocation = skills.offsetTop

const offsetValue = (source: number, target: number, percentage: number): number => {
    return (target / 100) * percentage;
}

const navIcon = document.getElementById("nav-logo")
const skillsOffset = offsetValue(homeLocation, skillsLocation, 25)


document.addEventListener("scroll", (e) => {
    if (document.documentElement.scrollTop > skillsLocation - skillsOffset 
        && !navIcon.classList.contains("show")) {
        navIcon.classList.toggle('show')
    }

    if (document.documentElement.scrollTop < skillsLocation 
        && navIcon.classList.contains("show")) {
        navIcon.classList.toggle('show')
    }

})
