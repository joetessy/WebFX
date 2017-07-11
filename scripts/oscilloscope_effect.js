

function Oscilloscope(main){
  this.main = main;
  let drawVisual;
  let canvas = document.querySelector('.waveform');
  let canvasCtx = canvas.getContext('2d');

  this.visualize = function(){
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    this.main.volumeAnalyser.fftSize = 2048;
    let bufferLength = this.main.volumeAnalyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    let that = this;
    function draw(){
      drawVisual = requestAnimationFrame(draw);
      that.main.volumeAnalyser.getByteTimeDomainData(dataArray);
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 1;
      canvasCtx.strokeStyle = 'rgb(255, 255, 255)';
      canvasCtx.beginPath();

      let sliceWidth = Number(WIDTH) * 1 / bufferLength;
      let x = 0;
      for (var i = 0; i < bufferLength; i++) {
        let v = dataArray[i] / 128.0;
        var y = v * HEIGHT / 2 ;
        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      canvasCtx.lineTo(canvas.width, canvas.height/100);
      canvasCtx.stroke();
    }
    draw();
  };
}

export default Oscilloscope;
