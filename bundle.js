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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "streamSource", function() { return streamSource; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__delay_effect_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__oscilloscope_effect_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__audio_handler_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__audio_recorder_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__page_handler_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tremolo_effect_js__ = __webpack_require__(6);







window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
/* harmony export (immutable) */ __webpack_exports__["audioContext"] = audioContext;

const mixNode = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["mixNode"] = mixNode;

const volumeNode = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["volumeNode"] = volumeNode;

const sampleNode = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["sampleNode"] = sampleNode;

const volumeAnalyser = audioContext.createAnalyser();
/* harmony export (immutable) */ __webpack_exports__["volumeAnalyser"] = volumeAnalyser;

const tremoloNode = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["tremoloNode"] = tremoloNode;

const delayEffect = audioContext.createDelay(0.5);
/* harmony export (immutable) */ __webpack_exports__["delayEffect"] = delayEffect;

const feedback = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["feedback"] = feedback;

const bypassNode = audioContext.createGain();
/* harmony export (immutable) */ __webpack_exports__["bypassNode"] = bypassNode;

const filter = audioContext.createBiquadFilter();
/* harmony export (immutable) */ __webpack_exports__["filter"] = filter;


const myDelay = new __WEBPACK_IMPORTED_MODULE_0__delay_effect_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myDelay"] = myDelay;

const myOscilloscope = new __WEBPACK_IMPORTED_MODULE_1__oscilloscope_effect_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myOscilloscope"] = myOscilloscope;

const myTremolo = new __WEBPACK_IMPORTED_MODULE_5__tremolo_effect_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myTremolo"] = myTremolo;

const myPageHandler = new __WEBPACK_IMPORTED_MODULE_4__page_handler_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myPageHandler"] = myPageHandler;

const myAudio = new __WEBPACK_IMPORTED_MODULE_2__audio_handler_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myAudio"] = myAudio;

const myRecorder = new __WEBPACK_IMPORTED_MODULE_3__audio_recorder_js__["a" /* default */]();
/* harmony export (immutable) */ __webpack_exports__["myRecorder"] = myRecorder;


volumeNode.gain.value = 0;
delayEffect.delayTime.value = 0.25;
feedback.gain.value = 0;
filter.frequency.value = 10000;
bypassNode.gain.value = 0.5;
tremoloNode.gain.value = 1;

var streamSource = null;
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

const onOff = document.querySelector('#on-off');
/* harmony export (immutable) */ __webpack_exports__["onOff"] = onOff;

const delayOnOff = document.querySelector('#delay-on-off');
/* harmony export (immutable) */ __webpack_exports__["delayOnOff"] = delayOnOff;

const tremoloOnOff = document.querySelector('#tremolo-on-off');
/* harmony export (immutable) */ __webpack_exports__["tremoloOnOff"] = tremoloOnOff;

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


let streamSource;
function AudioHandler(){
  this.initAudio = function(){
    navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, gotStream, didntGetStream);
  };

  function gotStream(stream){
    streamSource = __WEBPACK_IMPORTED_MODULE_0__main_js__["audioContext"].createMediaStreamSource(stream);
    streamSource.connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"]);
    __WEBPACK_IMPORTED_MODULE_0__main_js__["myDelay"].createDelay(streamSource);
  }

  function addDelay(){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["myDelay"].createDelay(streamSource);
  }

  function didntGetStream(){
    console.log('No stream :(');
  }

  this.setVolume = function(volume){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"].gain.value = volume;
  };

  this.cancelAudio = function(){
    if (streamSource && __WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].className ==='audio-on'){
      streamSource.disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"]);
      if (__WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].className === 'delay-on'){
        streamSource.disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"]);
      }
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (AudioHandler);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


function AudioRecorder(){
  const recorder = document.querySelector('.recorder');
  var rec = new Recorder(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"]);

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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


function Delay(){
  this.createDelay = function(streamSource){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["sampleNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"]);
    if (streamSource){
      streamSource.connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"]);
    }
    __WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["feedback"]);
    __WEBPACK_IMPORTED_MODULE_0__main_js__["feedback"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"]);
    __WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["filter"]);
    __WEBPACK_IMPORTED_MODULE_0__main_js__["filter"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"]);
    __WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"]);
    if (__WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].className === 'delay-off'){
      __WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"].gain.value = (0);
    }
  };

  this.setDelayTime = function(interval){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["delayEffect"].delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["feedback"].gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"].gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    __WEBPACK_IMPORTED_MODULE_0__main_js__["filter"].frequency.value = intensity;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Delay);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


function Oscilloscope(){
  let drawVisual;
  let canvas = document.querySelector('.waveform');
  let canvasCtx = canvas.getContext('2d');

  this.visualize = function(){
    let WIDTH = canvas.width;
    let HEIGHT = canvas.height;
    __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"].fftSize = 2048;
    let bufferLength = __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"].frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw(){
      drawVisual = requestAnimationFrame(draw);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"].getByteTimeDomainData(dataArray);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


function PageHandler(){
  let sample;
  this.handleSamplePlay = function(button, audioBuffer) {
    if (button.children[0].className.includes('fa-play')){
      if (sample){
        sample.disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["sampleNode"]);
        let array = Array.from(document.querySelectorAll('.sample-item'));
        array.forEach((item) => {
          item.children[0].className = 'fa fa-play';
        });
      }
      button.children[0].className = 'fa fa-pause';
      sample = __WEBPACK_IMPORTED_MODULE_0__main_js__["audioContext"].createBufferSource();
      sample.connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["sampleNode"]);
      sample.buffer = audioBuffer;
      sample.loop = true;
      sample.start();
    } else if (button.children[0].className.includes('fa-pause')){
      button.children[0].className = 'fa fa-play';
      sample.stop();
    }
  };

  this.startStopAudio = function(){
    if (__WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].className ==='audio-off') {
      __WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].className = 'audio-on';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].gain.value = 1;
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"].gain.value = .5;
      __WEBPACK_IMPORTED_MODULE_0__main_js__["sampleNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["audioContext"].destination);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].innerHTML='ON';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["myOscilloscope"].visualize();
    } else {
      __WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].className = 'audio-off';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"].disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeAnalyser"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"].gain.value = 0;
      __WEBPACK_IMPORTED_MODULE_0__main_js__["onOff"].innerHTML='OFF';
    }
  };

  this.handleDelay = function(){
    if (__WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].className === 'delay-off'){
      __WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].className = 'delay-on';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].innerHTML = 'ON';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"].gain.value = 0.5;
      if (document.querySelectorAll('input')[1].checked && __WEBPACK_IMPORTED_MODULE_0__main_js__["streamSource"]){
        // streamSource.disconnect(delayEffect);
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].className = 'delay-off';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["delayOnOff"].innerHTML = 'OFF';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["bypassNode"].gain.value = 0;
    }
  };

  this.handleTremolo = function(){
    if (__WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloOnOff"].className === 'tremolo-off'){
      __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloOnOff"].className = 'tremolo-on';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloOnOff"].innerHTML = 'ON';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["myTremolo"].createTremolo();
    } else {
      __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloOnOff"].className = 'tremolo-off';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloOnOff"].innerHTML = 'OFF';
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloNode"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"]);
    }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (PageHandler);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(0);


function Tremolo(){
  this.createTremolo = function(){
    if (__WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"]){
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].disconnect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["mixNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloNode"]);
      __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloNode"].connect(__WEBPACK_IMPORTED_MODULE_0__main_js__["volumeNode"]);
      this.setTremolo(0, 20);
    }
  };
  var tremoloInterval;
  this.setTremolo = function(minGain, speed = 20){
    if (tremoloInterval) clearInterval(tremoloInterval);
    let maxGain = 1;
    let val = 0;
    let direction;
    tremoloInterval = setInterval(function(){
      if (val >= maxGain){
        direction = 'down';
      } else if (val <= minGain){
        direction = 'up';
      }
      if (direction === 'down'){
        val -= .1;
        __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloNode"].gain.value = val;
      } else if (direction === 'up'){
        val += .1;
        __WEBPACK_IMPORTED_MODULE_0__main_js__["tremoloNode"].gain.value = val;
      }
    }, speed);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (Tremolo);


/***/ })
/******/ ]);