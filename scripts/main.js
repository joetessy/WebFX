import Delay from './delay_effect.js';
import Oscilloscope from './oscilloscope_effect.js';
import AudioHandler from './audio_handler.js';
import AudioRecorder from './audio_recorder.js';
import PageHandler from './page_handler.js';
import Tremolo from './tremolo_effect.js';

window.AudioContext = window.AudioContext || window.webkitAudioContext;
export const audioContext = new AudioContext();
export const mixNode = audioContext.createGain();
export const volumeNode = audioContext.createGain();
export const sampleNode = audioContext.createGain();
export const volumeAnalyser = audioContext.createAnalyser();
export const tremoloNode = audioContext.createGain();
export const delayEffect = audioContext.createDelay(0.5);
export const feedback = audioContext.createGain();
export const bypassNode = audioContext.createGain();
export const filter = audioContext.createBiquadFilter();

export const myDelay = new Delay();
export const myOscilloscope = new Oscilloscope();
export const myTremolo = new Tremolo();
export const myPageHandler = new PageHandler();
export const myAudio = new AudioHandler();
export const myRecorder = new AudioRecorder();

volumeNode.gain.value = 0;
delayEffect.delayTime.value = 0.25;
feedback.gain.value = 0;
filter.frequency.value = 10000;
bypassNode.gain.value = 0.5;
tremoloNode.gain.value = 1;

export var streamSource = null;
let audioRecorder = null;
let url1 = 'https://s3.amazonaws.com/webfx/sample1.mp3';
let url2 = 'https://s3.amazonaws.com/webfx/sample2.mp3';
let url3 = 'https://s3.amazonaws.com/webfx/sample3.mp3';
let audio1Buffer;
let audio2Buffer;
let audio3Buffer;
window.fetch('https://s3.amazonaws.com/webfx/sample1.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio1Buffer = audioBuffer; });

window.fetch('https://s3.amazonaws.com/webfx/sample2.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio2Buffer = audioBuffer; });

window.fetch('https://s3.amazonaws.com/webfx/sample3.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio3Buffer = audioBuffer; });

export const onOff = document.querySelector('#on-off');
export const delayOnOff = document.querySelector('#delay-on-off');
export const tremoloOnOff = document.querySelector('#tremolo-on-off');
const play1Button = document.querySelector('#play1');
const play2Button = document.querySelector('#play2');
const play3Button = document.querySelector('#play3');


onOff.onclick = myPageHandler.startStopAudio;
delayOnOff.onclick = myPageHandler.handleDelay;
tremoloOnOff.onclick = myPageHandler.handleTremolo;
play1Button.onclick = () => myPageHandler.handleSamplePlay(play1Button, audio1Buffer);
play2Button.onclick = () => myPageHandler.handleSamplePlay(play2Button, audio2Buffer);
play3Button.onclick = () => myPageHandler.handleSamplePlay(play3Button, audio3Buffer);
$('input')[0].onclick = () => myAudio.initAudio();
$('input')[1].onclick = () => myAudio.cancelAudio();
$('.recorder')[0].onclick = () => myRecorder.handleRecord();


$('#volume').slider({
  orientation: 'vertical',
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    myAudio.setVolume((ui.value) / 100);
  }
});

$('#delay-time').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (volumeNode)
    myDelay.setDelayTime((ui.value) / 100 * .5);
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
    myDelay.setDelayIntensity((ui.value) / 100 * .8);
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
    myDelay.setDelayFilter(ui.value * 100);
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
    myDelay.setDelayBypass(ui.value / 100);
  }
});

$('#tremolo-depth').slider({
  range: 'min',
  min: 0,
  max: 100,
  value: 0,
  animate: true,
  slide: function(event, ui){
    myTremolo.setTremolo((ui.value / 100), $('#tremolo-speed').slider('option', 'value'));
  }
});

$('#tremolo-speed').slider({
  range: 'min',
  min: 0.5,
  max: 20,
  value: 10,
  animate: true,
  slide: function(event, ui){
    myTremolo.setTremolo( ($('#tremolo-depth').slider('option', 'value') / 100), ui.value);
  }
});
