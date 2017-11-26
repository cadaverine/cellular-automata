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
let intervalRange = document.createElement("input")

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});
Object.assign(stopButton, { className: "button stop-button"});
Object.assign(clearButton, { className: "button clear-button"});
Object.assign(mainContainer, { className: "container main-container" });
Object.assign(buttonContainer, { className: "container button-container" });
Object.assign(colorRange, {
	className: "range color-range",
	type: "range",
	min: "0",
	max: "255",
	step: "10",
	value: "255"
});
Object.assign(intervalRange, {
	className: "range interval-range",
	type: "range",
	min: "20",
	max: "600",
	step: "10",
	value: "70"
});

startButton.appendChild(startButtonText);
stopButton.appendChild(stopButtonText);
clearButton.appendChild(clearButtonText);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(stopButton);
buttonContainer.appendChild(clearButton);
buttonContainer.appendChild(colorRange);
buttonContainer.appendChild(intervalRange);
mainContainer.appendChild(canvas);
mainContainer.appendChild(buttonContainer);
document.body.appendChild(mainContainer);


let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;

let range = colorRange.value;

let intervalID = null;
let interval = 60;


startButton.onclick = () => {
	if (!intervalID) {
		intervalID = setInterval(() => {
			for (var i = 0; i < length; i++) {
				output.data[i] = Math.round(255 - range * Math.random());
			}
			ctx.putImageData(output, 0, 0);
		}, interval);
	}
}


stopButton.onclick = () => {
	clearInterval(intervalID);
	intervalID = null;
}


clearButton.onclick = () => {
	clearInterval(intervalID);
	intervalID = null;
	for (var i = 0; i < length; i++) {
		output.data[i] = 255;
	}
	ctx.putImageData(output, 0, 0);
}


colorRange.oninput = () => {
	range = colorRange.value;
}


intervalRange.oninput = () => {
	interval = intervalRange.value;
	clearInterval(intervalID);
	intervalID = setInterval(() => {
		for (var i = 0; i < length; i++) {
			output.data[i] = Math.round(255 - range * Math.random());
		}
		ctx.putImageData(output, 0, 0);
	}, interval);
}

console.log(ctx);


let worker = new Worker("board.js");


board = new Board(canvas, 50);
// console.log(board.currentMatrix);

board.setRandom(0.6);

console.log(JSON.parse(JSON.stringify(board.currentMatrix)));
// console.log(board.currentMatrix);
console.time();
board.nextStep();
console.timeEnd()
console.log(JSON.parse(JSON.stringify(board.currentMatrix)));
// console.time();
// board.nextStep();
// console.timeEnd()
// console.log(JSON.parse(JSON.stringify(board.currentMatrix)));













