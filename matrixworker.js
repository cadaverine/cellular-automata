importScripts('https://cadaverine.github.io/cellular_automata/board.js');

let board = null;

onmessage = (e) => {  
  let command = e.data.command;
  let params = e.data.params;

  switch(command) {
    case "construct":
      board = new Board(params.width, params.height, params.step);
      break;

    case "next":
      if (board) {
        let matrix = board.nextStep(params.rule);
        self.postMessage(matrix);
      }
      break;

    case "random":
      if (board) {
        board.setRandom(params.density, params.fullness);
        let matrix = board.currentMatrix
        self.postMessage(matrix);
      }
      break;
  }
};