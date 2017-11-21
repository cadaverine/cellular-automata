const width = 800;
const height = 400;

let canvas = document.createElement("canvas");
let button = document.createElement("button");

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(button, { className: "button start-button"});

document.body.appendChild(canvas);
document.body.appendChild(button);


