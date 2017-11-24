const width = 600;
const height = 400;

let mainContainer = document.createElement("div");

let canvas = document.createElement("canvas");

let buttonContainer = document.createElement("div");
let startButton = document.createElement("button");
let stopButton = document.createElement("button");
let clearButton = document.createElement("button");
let startButtonText = document.createTextNode("Start");
let stopButtonText = document.createTextNode("Stop");
let clearButtonText = document.createTextNode("Clear");

let colorRange = document.createElement("input")

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});
Object.assign(stopButton, { className: "button stop-button"});
Object.assign(clearButton, { className: "button clear-button"});
Object.assign(colorRange, {
	className: "range color-range",
	type: "range",
	min: "0",
	max: "255",
	step: "10",
	value: "255"
});

Object.assign(mainContainer, { className: "container main-container" });
Object.assign(buttonContainer, { className: "container button-container" });

startButton.appendChild(startButtonText);
stopButton.appendChild(stopButtonText);
clearButton.appendChild(clearButtonText);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(stopButton);
buttonContainer.appendChild(clearButton);
buttonContainer.appendChild(colorRange);

mainContainer.appendChild(canvas);
mainContainer.appendChild(buttonContainer);

document.body.appendChild(mainContainer);

let imageData = new ImageData(10, 10);

let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;

let range = colorRange.value;

let interval = null;

startButton.onclick = () => {
	if (!interval) {
		interval = setInterval(() => {
			for (var i = 0; i < length; i++) {
				output.data[i] = Math.round(255 - range * Math.random());
			}
			ctx.putImageData(output, 0, 0);
		}, 60);
	}
}


stopButton.onclick = () => {
	clearInterval(interval);
	interval = null;
}


clearButton.onclick = () => {
	clearInterval(interval);
	interval = null;
	for (var i = 0; i < length; i++) {
		output.data[i] = 255;
	}
	ctx.putImageData(output, 0, 0);
}

colorRange.oninput = () => {
	range = colorRange.value;
}


console.log(imageData);
console.log(ctx);


















