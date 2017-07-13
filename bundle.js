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
function AudioHandler(main, myDelay){
  this.main = main;
  this.myDelay = myDelay;
  this.initAudio = function(){
    navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, this.gotStream, didntGetStream);
  };

  let that = this;
  this.gotStream = function(stream){
    that.main.streamSource = that.main.audioContext.createMediaStreamSource(stream);
    that.main.streamSource.connect(that.main.mixNode);
    that.myDelay.createDelay(that.main.streamSource);
    that.main.bypassNode.gain.value = 0.5;
  };

  function didntGetStream(){
    document.querySelector('.content').className = 'content-fade content';
    document.querySelector('.audio-fail').className = 'audio-fail show-fail';
    setTimeout(function(){
      document.querySelector('.audio-fail').className ='audio-fail';
      document.querySelector('.content').className = 'content';
    }, 2000);
  }

  this.setVolume = function(volume){
    this.main.volumeNode.gain.value = volume;
  };

  this.cancelAudio = function(onOff, delayOnOff){
    if (that.main.streamSource && onOff.className ==='audio-on'){
      that.main.streamSource.disconnect(this.main.mixNode);
      if (delayOnOff.className === 'delay-on'){
        that.main.bypassNode.gain.value = 0;
      }
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (AudioHandler);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function AudioRecorder(main){
  this.main = main;
  const recorder = document.querySelector('.recorder');
  var rec = new Recorder(this.main.volumeNode);

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
  this.main = main;
  this.createDelay = function(streamSource){
    this.main.sampleNode.connect(this.main.delayEffect);
    this.main.delayEffect.connect(this.main.feedback);
    this.main.feedback.connect(this.main.delayEffect);
    this.main.delayEffect.connect(this.main.filter);
    this.main.filter.connect(this.main.bypassNode);
    this.main.bypassNode.connect(this.main.mixNode);
  };

  this.setDelayTime = function(interval){
    this.main.delayEffect.delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    this.main.feedback.gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    this.main.bypassNode.gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    this.main.filter.frequency.value = intensity;
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
  this.tremoloNode = this.audioContext.createGain();
  this.delayEffect = this.audioContext.createDelay(0.5);
  this.feedback = this.audioContext.createGain();
  this.bypassNode = this.audioContext.createGain();
  this.filter = this.audioContext.createBiquadFilter();
  this.streamSource = null;
  this.volumeNode.gain.value = 0;
  this.delayEffect.delayTime.value = 0.25;
  this.feedback.gain.value = 0;
  this.filter.frequency.value = 10000;
  this.bypassNode.gain.value = 0.5;
  this.tremoloNode.gain.value = 1;
}

/* harmony default export */ __webpack_exports__["a"] = (MasterClass);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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

/* harmony default export */ __webpack_exports__["a"] = (Oscilloscope);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function PageHandler(main, myDelay, myTremolo, myOscilloscope){
  this.main = main;
  this.myDelay = myDelay;
  this.myTremolo = myTremolo;
  this.myOscilloscope = myOscilloscope;

  let sample;
  this.handleSamplePlay = function(button, audioBuffer) {
    if (button.children[0].className.includes('fa-play')){
      if (sample){
        sample.disconnect(this.main.sampleNode);
        let array = Array.from(document.querySelectorAll('.sample-item'));
        array.forEach((item) => {
          item.children[0].className = 'fa fa-play';
        });
      }
      button.children[0].className = 'fa fa-pause';
      sample = main.audioContext.createBufferSource();
      sample.buffer = audioBuffer;
      sample.loop = true;
      sample.connect(main.sampleNode);
      sample.start();
    } else if (button.children[0].className.includes('fa-pause')){
      button.children[0].className = 'fa fa-play';
      sample.stop();
    }
  };

  this.startStopAudio = function(button){
    if (button.className ==='audio-off') {
      button.className = 'audio-on';
      main.volumeNode.connect(main.volumeAnalyser);
      main.mixNode.connect(main.volumeNode);
      main.mixNode.gain.value = 1;
      main.volumeNode.gain.value = .5;
      main.sampleNode.connect(main.mixNode);
      main.volumeAnalyser.connect(main.audioContext.destination);
      button.innerHTML='ON';
      myOscilloscope.visualize();
    } else {
      button.className = 'audio-off';
      main.volumeNode.disconnect(main.volumeAnalyser);
      main.volumeNode.gain.value = 0;
      button.innerHTML='OFF';
    }
  };

  this.handleDelay = function(button){
    if (button.className === 'delay-off'){
      button.className = 'delay-on';
      button.innerHTML = 'ON';
      myDelay.createDelay();
      main.bypassNode.gain.value = 0.5;
      if (main.streamSource){
        main.streamSource.connect(main.delayEffect);
      }
    } else {
      button.className = 'delay-off';
      button.innerHTML = 'OFF';
      main.bypassNode.gain.value = 0;
    }
  };

  this.handleTremolo = function(button){
    if (button.className === 'tremolo-off'){
      button.className = 'tremolo-on';
      button.innerHTML = 'ON';
      myTremolo.createTremolo();
    } else {
      button.className = 'tremolo-off';
      button.innerHTML = 'OFF';
      main.mixNode.disconnect(main.tremoloNode);
      main.mixNode.connect(main.volumeNode);
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (PageHandler);


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Tremolo(main){
  this.main = main;
  this.createTremolo = function(){
    if (this.main.mixNode){
      this.main.mixNode.disconnect(this.main.volumeNode);
      this.main.mixNode.connect(this.main.tremoloNode);
      this.main.tremoloNode.connect(this.main.volumeNode);
      this.setTremolo(0, 20);
    }
  };
  var tremoloInterval;
  this.setTremolo = function(minGain, speed = 20){
    if (tremoloInterval) clearInterval(tremoloInterval);
    let maxGain = 1;
    let val = 0;
    let direction;
    let that = this;
    tremoloInterval = setInterval(function(){
      if (val >= maxGain){
        direction = 'down';
      } else if (val <= minGain){
        direction = 'up';
      }
      if (direction === 'down'){
        val -= .1;
        that.main.tremoloNode.gain.value = val;
      } else if (direction === 'up'){
        val += .1;
        that.main.tremoloNode.gain.value = val;
      }
    }, speed);
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








let main = new __WEBPACK_IMPORTED_MODULE_5__master_class_js__["a" /* default */]();

let myDelay = new __WEBPACK_IMPORTED_MODULE_0__delay_effect_js__["a" /* default */](main);
let myOscilloscope = new __WEBPACK_IMPORTED_MODULE_1__oscilloscope_effect_js__["a" /* default */](main);
let myTremolo = new __WEBPACK_IMPORTED_MODULE_4__tremolo_effect_js__["a" /* default */](main);
let myAudio = new __WEBPACK_IMPORTED_MODULE_2__audio_handler_js__["a" /* default */](main, myDelay);
let myRecorder = new __WEBPACK_IMPORTED_MODULE_3__audio_recorder_js__["a" /* default */](main);
let myPageHandler = new __WEBPACK_IMPORTED_MODULE_6__page_handler_js__["a" /* default */](main, myDelay, myTremolo, myOscilloscope);

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


/***/ })
/******/ ]);