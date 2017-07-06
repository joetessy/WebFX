// everything is happening inside the AudioContext Interface
// Controls creation of AudioNodes and execution of Audio Processing

window.AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let source = null,
    mixNode = null,
    volumeNode = null,
    tremoloNode = null;
let volumeAnalyser = audioContext.createAnalyser();
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
  if (volumeNode === null || volumeNode.gain.value === 0) {
    onOff.className = 'audio-on';
    mixNode = audioContext.createGain();
    mixNode.gain.value = 1;
    volumeNode = audioContext.createGain();
    volumeNode.gain.value = .5;
    source.connect(mixNode);
    mixNode.connect(volumeNode);
    volumeNode.connect(volumeAnalyser);
    volumeAnalyser.connect(audioContext.destination);
    onOff.innerHTML='ON';
    visualize();
  } else {
    onOff.className = 'audio-off';
    volumeNode.disconnect(volumeAnalyser);
    volumeNode.gain.value = 0;
    onOff.innerHTML='OFF';
    volumeNode = null;
  }
}

// Volume

function setVolume(volume){
  volumeNode.gain.value = volume;
}

$('#volume').slider({
  orientation: 'vertical',
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    setVolume((ui.value) / 100);
  }
});

// Oscilloscope

let canvas = document.querySelector('.waveform');
let canvasCtx = canvas.getContext('2d');

function visualize(){
  let WIDTH = canvas.width;
  let HEIGHT = canvas.height;
  volumeAnalyser.fftSize = 2048;
  let bufferLength = volumeAnalyser.frequencyBinCount;
  let dataArray = new Uint8Array(bufferLength);
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

  function draw(){
    drawVisual = requestAnimationFrame(draw);
    volumeAnalyser.getByteTimeDomainData(dataArray);
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

// DELAY

const delayOnOff = document.querySelector('#delay-on-off');
delayOnOff.onclick = handleDelay;


let delayEffect = audioContext.createDelay(0.5);
delayEffect.delayTime.value = 0.25;
let feedback = audioContext.createGain();
feedback.gain.value = 0;
var filter = audioContext.createBiquadFilter();
filter.frequency.value = 10000;
let bypassNode = audioContext.createGain();
bypassNode.gain.value = 0.5;

function handleDelay(){
  if (delayOnOff.className === 'delay-off' && source){
    delayOnOff.className = 'delay-on';
    delayOnOff.innerHTML = 'ON';
    createDelay();

  } else {
    delayOnOff.className = 'delay-off';
    delayOnOff.innerHTML = 'OFF';
    bypassNode.disconnect(mixNode);
  }
}

function createDelay(){
  source.connect(delayEffect);
  delayEffect.connect(feedback);
  feedback.connect(delayEffect);
  delayEffect.connect(filter);
  filter.connect(bypassNode);
  bypassNode.connect(mixNode);
}

function setDelayTime(interval){
  delayEffect.delayTime.value = interval;
}

function setDelayIntensity(intensity){
  feedback.gain.value = intensity;
}
function setDelayBypass(intensity){
  bypassNode.gain.value = intensity;
}

function setDelayFilter(intensity){
  filter.frequency.value = intensity;
}

$('#delay-time').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    setDelayTime((ui.value) / 100 * .5);
  }
});

$('#delay-intensity').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 0,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    setDelayIntensity((ui.value) / 100 * .8);
  }
});

$('#delay-filter').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 100,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    setDelayFilter(ui.value * 100);
  }
});

$('#delay-bypass').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    setDelayBypass(ui.value / 100);
  }
});

const tremoloOnOff = document.querySelector('#tremolo-on-off');
tremoloOnOff.onclick = handleTremolo;

tremoloNode = audioContext.createGain();

function handleTremolo(){
  if (tremoloOnOff.className === 'tremolo-off' && source){
    tremoloOnOff.className = 'tremolo-on';
    tremoloOnOff.innerHTML = 'ON';
    createTremolo();

  } else {
    tremoloOnOff.className = 'tremolo-off';
    tremoloOnOff.innerHTML = 'OFF';

  }
}

function createTremolo(){
  if (mixNode){
    mixNode.disconnect(volumeNode);
    mixNode.connect(tremoloNode);
    tremoloNode.connect(volumeNode);
  }
}


function tremey(minGain){
  let maxGain = 1;
  let val = 0;
  let direction;
  var tremoloInterval = setInterval(function(){
    if (val >= maxGain){
      direction = 'down';
    } else if (val <= minGain){
      direction = 'up';
    }
    if (direction === 'down'){
      val -= .1;
      tremoloNode.gain.value = val;
    } else if (direction === 'up'){
      val += .1;
      tremoloNode.gain.value = val;
    }
  }, 10);
  console.log(tremoloNode.gain.value);
}


$('#tremolo-depth').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    console.log(ui.value / 100);
    tremey((ui.value) / 100);
  }
});

$('#tremolo-speed').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 0,
  animate: true,
  slide: function(event, ui){
    // if (volumeNode)
    // setDelayIntensity((ui.value) / 100 * .8);
  }
});
