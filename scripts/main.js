import Delay from './delay_effect.js';
import Oscilloscope from './oscilloscope_effect.js';
import AudioHandler from './audio_handler.js';
import AudioRecorder from './audio_recorder.js';
import Tremolo from './tremolo_effect.js';
import MasterClass from './master_class.js';
import PageHandler from './page_handler.js';

let main = new MasterClass();

let myDelay = new Delay(main);
let myOscilloscope = new Oscilloscope(main);
let myTremolo = new Tremolo(main);
let myPageHandler = new PageHandler(main, myDelay, myTremolo, myOscilloscope);
let myAudio = new AudioHandler(main, myDelay);
let myRecorder = new AudioRecorder(main);

let url1 = 'https://s3.amazonaws.com/webfx/sample1.mp3';
let url2 = 'https://s3.amazonaws.com/webfx/sample2.mp3';
let url3 = 'https://s3.amazonaws.com/webfx/sample3.mp3';
let audio1Buffer;
let audio2Buffer;
let audio3Buffer;

window.fetch('https://s3.amazonaws.com/webfx/sample1.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => main.audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio1Buffer = audioBuffer; });

window.fetch('https://s3.amazonaws.com/webfx/sample2.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => main.audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio2Buffer = audioBuffer; });

window.fetch('https://s3.amazonaws.com/webfx/sample3.mp3')
.then(response => response.arrayBuffer())
.then(arrayBuffer => main.audioContext.decodeAudioData(arrayBuffer))
.then(audioBuffer => { audio3Buffer = audioBuffer; });

let onOff = document.querySelector('#on-off');
let delayOnOff = document.querySelector('#delay-on-off');
let tremoloOnOff = document.querySelector('#tremolo-on-off');
let play1Button = document.querySelector('#play1');
let play2Button = document.querySelector('#play2');
let play3Button = document.querySelector('#play3');

onOff.onclick = () => myPageHandler.startStopAudio(onOff);
delayOnOff.onclick = () => myPageHandler.handleDelay(delayOnOff);
tremoloOnOff.onclick = () => myPageHandler.handleTremolo(tremoloOnOff);
play1Button.onclick = () => myPageHandler.handleSamplePlay(play1Button, audio1Buffer);
play2Button.onclick = () => myPageHandler.handleSamplePlay(play2Button, audio2Buffer);
play3Button.onclick = () => myPageHandler.handleSamplePlay(play3Button, audio3Buffer);
$('input')[0].onclick = () => myAudio.initAudio();
$('input')[1].onclick = () => myAudio.cancelAudio(onOff, delayOnOff);
$('.recorder')[0].onclick = () => myRecorder.handleRecord();

$('#volume').slider({
  orientation: 'vertical',
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (main.volumeNode)
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
    if (main.volumeNode)
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
    if (main.volumeNode)
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
    if (main.volumeNode)
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
    if (main.volumeNode)
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
