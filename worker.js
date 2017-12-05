importScripts('board.js');

let board = null;

// let setRandom = (board, params) => {
// 	board.setRandom(params.density, params.fullness);
// }

// let nextStep = (board, params) => {
// 	board.nextStep(params.rule);
// }


onmessage = function(e) {
  let command = e.data.command;
  let params = e.data.params;
  let result = null;
	board = board || new Board(params.width, params.height, params.step);


  switch(command) {
  	// case "create":
  	// 	// result = createBoard(params);
  	case "next":
			result = board.nextStep();
  		// result = nextStep(params);
  	// case "random":
  	// 	result = setRandom(params);
  }

  console.log(result);
  console.log("ПРивет")

  postMessage(result);
};
