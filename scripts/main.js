// everything is happening inside the AudioContext Interface
// Controls creation of AudioNodes and execution of Audio Processing

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let source = null,
    gainNode = null,
    inputPoint = null;
let analyser = audioContext.createAnalyser();
let drawVisual;

// Checks for input. If there is, start the stream

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({audio: true}, gotStream, didntGetStream);

// Creates media stream
function gotStream(stream){
  source = audioContext.createMediaStreamSource(stream);
  console.log('Hooray, audio is connected!');
}

function didntGetStream(){
  alert('Audio Did not Connect');
}

const onOff = document.querySelector('#on-off');
const audioOn = document.querySelector('.audio-on');
const audioOff = document.querySelector('.audio-off');
onOff.onclick = startStopAudio;

// Handles starting / stopping audio.
function startStopAudio(){
  onOff.classList.toggle('audio-off');
  if (gainNode === null || gainNode.gain.value === 0) {
    gainNode = audioContext.createGain();
    gainNode.gain.value = .5;
    source.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioContext.destination);
    onOff.innerHTML='ON';
    visualize();
  } else {
    gainNode.disconnect(analyser);
    gainNode.gain.value = 0;
    onOff.innerHTML='OFF';
    gainNode = null;
  }
}

function setVolume(volume){
  gainNode.gain.value = volume;
}

$('#volume').slider({
  orientation: 'vertical',
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (gainNode)
    setVolume((ui.value) / 100);
  }
});


let canvas = document.querySelector('.waveform');
let canvasCtx = canvas.getContext('2d');

function visualize(){
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  analyser.fftSize = 2048;
  let bufferLength = analyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw(){
    drawVisual = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);
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
}
