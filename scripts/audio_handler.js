import { audioContext, mixNode, delayOnOff, myDelay,
volumeNode, onOff, delayEffect, bypassNode} from './main.js';

let streamSource;
function AudioHandler(){
  this.initAudio = function(){
    navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, gotStream, didntGetStream);
  };

  function gotStream(stream){
    streamSource = audioContext.createMediaStreamSource(stream);
    streamSource.connect(mixNode);
    myDelay.createDelay(streamSource);
  }

  function addDelay(){
    myDelay.createDelay(streamSource);
  }

  function didntGetStream(){
    console.log('No stream :(');
  }

  this.setVolume = function(volume){
    volumeNode.gain.value = volume;
  };

  this.cancelAudio = function(){
    if (streamSource && onOff.className ==='audio-on'){
      streamSource.disconnect(mixNode);
      if (delayOnOff.className === 'delay-on'){
        streamSource.disconnect(delayEffect);
      }
    }
  };
}

export default AudioHandler;
