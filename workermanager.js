class WorkerManager {
	constructor(bufferLength, width, height, rule) {
		this.rule = rule;
		this.width = width;
		this.height = height;

		this.dataBuffer = [];
		this.matrixBuffer = [];

		this.bufferLength = bufferLength;

		this.matrixWorker = new Worker("matrixworker.js");
		this.dataWorker = new Worker("dataworker.js");

		this.matrixWorker.onmessage = (message) => {
			this.matrixBuffer.push(message.data);

			let message = {
				command: "create data",
				params: {
					matrix: this.matrixBuffer.shift()
				}
			}

			this.dataWorker.postMessage(message);
		}

		this.dataWorker.onmessage = (message) => {
			this.dataBuffer.push(message.data);
			if (this.dataBuffer.length < this.bufferLength) {

				let message = {
					command: "next",
					params: {
						rule: this.rule
					}
				}

				this.matrixBuffer.postMessage(message);
			}
		}

		let message = {
			command: "construct",
			params: {
				width: this.width,
				height: this.height
			}
		}

		this.matrixWorker.postMessage(message);
		this.dataWorker.postMessage(message);
	}


	nextStep(rule = this.rule) {
		this.rule = rule;

		let message = {
			command: "next",
			params: {
				rule: this.rule
			}
		}

		this.matrixBuffer.postMessage(message);
	}


	setRandomMatrix() {
		let message = {
			command: "random",
			params: {}
		}

		this.matrixWorker.postMessage(message);
	}


	getData() {
		if (this.dataBuffer.length) {
			data = this.dataBuffer.shift();
			this.nextStep()
			return data;
		}
		else {
			this.nextStep()
			return null;
		}
	}

}