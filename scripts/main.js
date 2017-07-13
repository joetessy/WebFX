import Delay from './delay_effect.js';
import Oscilloscope from './oscilloscope_effect.js';
import AudioHandler from './audio_handler.js';
import AudioRecorder from './audio_recorder.js';
import Tremolo from './tremolo_effect.js';
import MasterClass from './master_class.js';
import PageHandler from './page_handler.js';
import Sliders from './sliders.js';

const main = new MasterClass();
const myAudio = new AudioHandler(main);
const myDelay = new Delay(main);
const myTremolo = new Tremolo(main);
const myOscilloscope = new Oscilloscope(main);
// const myRecorder = new AudioRecorder(main);
const myPageHandler = new PageHandler(main, myDelay, myTremolo, myOscilloscope, myAudio);
const mySliders = new Sliders(main, myAudio, myDelay, myTremolo);

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
let inputOnOff = document.querySelector('#input-on-off');
let play1Button = document.querySelector('#play1');
let play2Button = document.querySelector('#play2');
let play3Button = document.querySelector('#play3');

inputOnOff.onclick = () => myPageHandler.handleInput(inputOnOff);
onOff.onclick = () => myPageHandler.startStopAudio(onOff);
delayOnOff.onclick = () => myPageHandler.handleDelay(delayOnOff);
tremoloOnOff.onclick = () => myPageHandler.handleTremolo(tremoloOnOff);

play1Button.onclick = () => myPageHandler.handleSample(play1Button, audio1Buffer);
play2Button.onclick = () => myPageHandler.handleSample(play2Button, audio2Buffer);
play3Button.onclick = () => myPageHandler.handleSample(play3Button, audio3Buffer);
// $('.recorder')[0].onclick = () => myRecorder.handleRecord();
