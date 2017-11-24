const width = 800;
const height = 400;

let canvas = document.createElement("canvas");

let buttonContainer = document.createElement("div");
let startButton = document.createElement("button");
let stopButton = document.createElement("button");
let clearButton = document.createElement("button");
let startButtonText = document.createTextNode("Start");
let stopButtonText = document.createTextNode("Stop");
let clearButtonText= document.createTextNode("Clear");

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});
Object.assign(stopButton, { className: "button stop-button"});
Object.assign(buttonContainer, { className: "container button-container" });

startButton.appendChild(startButtonText);
stopButton.appendChild(stopButtonText);
clearButton.appendChild(clearButtonText);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(stopButton);
buttonContainer.appendChild(clearButton);
document.body.appendChild(canvas);
document.body.appendChild(buttonContainer);

let imageData = new ImageData(10, 10);

let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;


// let interval = setInterval(() => {
// 	for (var i = 0; i < length; i++) {
// 		output.data[i] = Math.round(255 * Math.random());
// 	}
// 	ctx.putImageData(output, 0, 0);
// }, 60);

let interval;

startButton.onclick = (interval) => {
	interval = setInterval(() => {
		for (var i = 0; i < length; i++) {
			output.data[i] = Math.round(255 * Math.random());
		}
		ctx.putImageData(output, 0, 0);
	}, 60);
}


stopButton.onclick = (interval) => {
	clearInterval(interval.id); // не работает (undefined)
}


console.log(imageData);
console.log(ctx);


















