console.log(window);


let dataMaker = null;

onmessage = (e) => {
  importScripts('/imagedatamaker.js');
  
  let command = e.data.command;
  let params = e.data.params;
  console.log(params);

  switch(command) {
  	case "construct":
  		dataMaker = new ImageDataMaker(params.width, params.height);

  	case "create data":
  		if (dataMaker) {
  			let data = dataMaker.createImageData(params.matrix, params.colors);
  			self.postMessage(data);
  		}
  }
}