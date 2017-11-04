/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function AudioHandler(main){
  this.initAudioStream = function(){
    navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, this.gotStream, didntGetStream);
  };

  this.gotStream = function(stream){
    main.streamSource = main.audioContext.createMediaStreamSource(stream);
    main.streamSource.connect(main.mixNode);
    if (document.querySelector('#delay-on-off').className === 'on'){
      main.streamSource.connect(main.delayEffect);
    }
  };

  function didntGetStream(){
    document.querySelector('.content').className = 'content-fade content';
    document.querySelector('.audio-fail').className = 'audio-fail show-fail';
    setTimeout(function(){
      document.querySelector('.audio-fail').className ='audio-fail';
      document.querySelector('.content').className = 'content';
    }, 2000);
    document.querySelector('#input-on-off').className = 'off';
    document.querySelector('#input-on-off').innerHTML = 'OFF';
  }

  this.cancelAudioStream = function(){
    if (main.streamSource &&
      document.querySelector('#on-off').className ==='on'){
        main.streamSource.disconnect(main.mixNode);
        if (document.querySelector('#delay-on-off').className === 'on' ){
          main.streamSource.disconnect(main.delayEffect);
        }
      }
    };

  this.setVolume = function(volume){
    main.volumeNode.gain.value = volume;
  };

  this.startAudio = function(){
    main.volumeNode.connect(main.volumeAnalyser);
    main.mixNode.connect(main.volumeNode);
    main.sampleNode.connect(main.mixNode);
    main.volumeAnalyser.connect(main.audioContext.destination);
  };

  this.stopAudio = function(){
    main.volumeNode.disconnect(main.volumeAnalyser);
  };

}

/* harmony default export */ __webpack_exports__["a"] = (AudioHandler);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function AudioRecorder(main){
  const recorder = document.querySelector('.recorder');
  var rec = new Recorder(main.volumeNode);

    this.handleRecord = function(){
      if (recorder.className.includes('record-off')){
        recorder.className = 'recorder record-on';
        rec.clear();
        rec.record();
      } else {
        recorder.className = 'recorder record-off';
        rec.stop();
        rec.getBuffers( this.gotBuffers );
      }
    };

    function doneEncoding( blob ) {
      Recorder.setupDownload( blob, "myRecording.wav" );
    }

    this.gotBuffers = function ( buffers ) {
      rec.exportWAV(doneEncoding );
    };
}

/* harmony default export */ __webpack_exports__["a"] = (AudioRecorder);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Delay(main){

  this.createDelay = function(streamSource){
    main.sampleNode.connect(main.delayEffect);
    main.delayEffect.connect(main.feedback);
    main.feedback.connect(main.delayEffect);
    main.delayEffect.connect(main.filter);
    main.filter.connect(main.bypassNode);
    main.bypassNode.connect(main.mixNode);
    main.bypassNode.gain.value = 0.5;
    if (main.streamSource && document.querySelector('#input-on-off').className === 'on'){
      main.streamSource.connect(main.delayEffect);
    }
  };

  this.removeDelay = function(){
    if (document.querySelector('#input-on-off').className === 'on'){
      main.streamSource.disconnect(main.delayEffect);
    }
    main.sampleNode.disconnect(main.delayEffect);
  };

  this.setDelayTime = function(interval){
    main.delayEffect.delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    main.feedback.gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    main.bypassNode.gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    main.filter.frequency.value = intensity;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Delay);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function MasterClass(){
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioContext = new AudioContext();
  this.mixNode = this.audioContext.createGain();
  this.volumeNode = this.audioContext.createGain();
  this.sampleNode = this.audioContext.createGain();
  this.volumeAnalyser = this.audioContext.createAnalyser();
  this.delayEffect = this.audioContext.createDelay(0.5);
  this.feedback = this.audioContext.createGain();
  this.bypassNode = this.audioContext.createGain();
  this.filter = this.audioContext.createBiquadFilter();
  this.lfo = this.audioContext.createOscillator();
  this.lfoAmp = this.audioContext.createGain();

  this.streamSource = null;
  this.mixNode.gain.value = 1;
  this.volumeNode.gain.value = .5;
  this.delayEffect.delayTime.value = 0.25;
  this.feedback.gain.value = 0;
  this.filter.frequency.value = 10000;
}

/* harmony default export */ __webpack_exports__["a"] = (MasterClass);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Oscilloscope(main){
  let drawVisual;
  let canvas = document.querySelector('.waveform');
  let canvasCtx = canvas.getContext('2d');

  this.visualize = function(){
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    main.volumeAnalyser.fftSize = 2048;
    let bufferLength = main.volumeAnalyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    function draw(){
      drawVisual = requestAnimationFrame(draw);
      main.volumeAnalyser.getByteTimeDomainData(dataArray);
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

/* harmony default export */ __webpack_exports__["a"] = (Oscilloscope);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function PageHandler(main, myDelay, myTremolo, myOscilloscope, myAudio){

  function turnOn(button){
    button.className = 'on';
    button.innerHTML = 'ON';
  }

  function turnOff(button){
    button.className = 'off';
    button.innerHTML = 'OFF';
  }

  function disconnectSample(sample){
    sample.disconnect(main.sampleNode);
    Array.from(document.querySelectorAll('.sample-item'))
    .forEach((item) => {item.className = 'sample-item fa fa-play';});
  }

  function triggerSample(button, audioBuffer){
    button.className = 'sample-item fa fa-pause';
    sample = main.audioContext.createBufferSource();
    sample.buffer = audioBuffer;
    sample.loop = true;
    sample.connect(main.sampleNode);
    sample.start();
  }

  this.handleInput = function(button){
    if (button.className === ('off')){
      turnOn(button);
      myAudio.initAudioStream();
    } else {
      turnOff(button);
      myAudio.cancelAudioStream();
    }
  };

  let sample;
  this.handleSample = function(button, audioBuffer) {
    if (button.className.includes('fa-play')){
      if (sample){
        sample.connect(main.sampleNode);
        disconnectSample(sample);
      }
      triggerSample(button, audioBuffer);
    } else if (button.className.includes('fa-pause')){
      disconnectSample(sample);
    }
  };

  this.startStopAudio = function(button){
    if (button.className ==='off') {
      turnOn(button);
      myAudio.startAudio();
      myOscilloscope.visualize();
    } else {
      turnOff(button);
      myAudio.stopAudio();
    }
  };

  this.handleDelay = function(button){
    if (button.className === 'off'){
      turnOn(button);
      myDelay.createDelay();
    } else {
      turnOff(button);
      myDelay.removeDelay();
    }
  };

  this.handleTremolo = function(button){
    if (button.className === 'off'){
      turnOn(button);
      myTremolo.createTremolo();
    } else {
      turnOff(button);
      myTremolo.removeTremolo();
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (PageHandler);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Sliders(main, myAudio, myDelay, myTremolo){
  $('#volume').slider({
    orientation: 'vertical',
    range: 'min',
    min: 0,
    max: 100,
    value: 50,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myAudio.setVolume((ui.value) / 50);
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
    value: 50,
    animate: true,
    slide: function(event, ui){
      myTremolo.setTremolo((main.volumeNode.gain.value * ui.value / 100), $('#tremolo-speed').slider('option', 'value'));
    }
  });

  $('#tremolo-speed').slider({
    range: 'min',
    min: 0,
    max: 14,
    value: 7,
    animate: true,
    slide: function(event, ui){
      myTremolo.setTremolo( (main.volumeNode.gain.value * $('#tremolo-depth').slider('option', 'value') / 100), ui.value);
    }
  });
}

/* harmony default export */ __webpack_exports__["a"] = (Sliders);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Tremolo(main){
  main.lfo.start();

  this.createTremolo = function(){
    if (main.mixNode){
      main.lfo.connect(main.lfoAmp);
      main.lfoAmp.connect(main.volumeNode.gain);
      this.setTremolo(
        main.volumeNode.gain.value * $('#tremolo-depth').slider('option', 'value') / 100,
        $('#tremolo-speed').slider('option', 'value'));
    }
  };

  this.removeTremolo = function(){
    main.lfo.amplitude = 0;
    main.lfoAmp.disconnect(main.volumeNode.gain);
    main.lfo.disconnect(main.lfoAmp);
  };

  this.setTremolo = function(amplitude, frequency){
    main.lfoAmp.gain.value = amplitude;
    main.lfo.frequency.value = frequency;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Tremolo);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delay_effect_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oscilloscope_effect_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_handler_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_recorder_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tremolo_effect_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__master_class_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__page_handler_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sliders_js__ = __webpack_require__(6);










const main = new __WEBPACK_IMPORTED_MODULE_5__master_class_js__["a" /* default */]();
const myAudio = new __WEBPACK_IMPORTED_MODULE_2__audio_handler_js__["a" /* default */](main);
const myDelay = new __WEBPACK_IMPORTED_MODULE_0__delay_effect_js__["a" /* default */](main);
const myTremolo = new __WEBPACK_IMPORTED_MODULE_4__tremolo_effect_js__["a" /* default */](main);
const myOscilloscope = new __WEBPACK_IMPORTED_MODULE_1__oscilloscope_effect_js__["a" /* default */](main);
const myRecorder = new __WEBPACK_IMPORTED_MODULE_3__audio_recorder_js__["a" /* default */](main);
const myPageHandler = new __WEBPACK_IMPORTED_MODULE_6__page_handler_js__["a" /* default */](main, myDelay, myTremolo, myOscilloscope, myAudio);
const mySliders = new __WEBPACK_IMPORTED_MODULE_7__sliders_js__["a" /* default */](main, myAudio, myDelay, myTremolo);

window.main = main;

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
$('.recorder')[0].onclick = () => myRecorder.handleRecord();


/***/ })
/******/ ]);