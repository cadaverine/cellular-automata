importScripts('board.js');

let board = null;

onmessage = (e) => {
  let command = e.data.command;
  let params = e.data.params;

  switch(command) {
  	case "construct":
  		board = new Board(params.width, params.height, params.step);

  	case "next":
  		if (board) {
				let matrix = board.nextStep(params.rule);
				self.postMessage(matrix);
  		}

		case "random":
  		if (board) {
				let matrix = board.setRandom(params.density, params.fullness);
				self.postMessage(matrix);
  		}
  }
};