import {sampleNode, audioContext, volumeAnalyser, onOff, volumeNode,
  mixNode, myOscilloscope, streamSource, delayOnOff, myDelay, myAudio,
bypassNode, tremoloOnOff, tremoloNode, myTremolo, delayEffect} from './main.js';

function PageHandler(){
  let sample;
  this.handleSamplePlay = function(button, audioBuffer) {
    if (button.children[0].className.includes('fa-play')){
      if (sample){
        sample.disconnect(sampleNode);
        let array = Array.from(document.querySelectorAll('.sample-item'));
        array.forEach((item) => {
          item.children[0].className = 'fa fa-play';
        });
      }
      button.children[0].className = 'fa fa-pause';
      sample = audioContext.createBufferSource();
      sample.connect(sampleNode);
      sample.buffer = audioBuffer;
      sample.loop = true;
      sample.start();
    } else if (button.children[0].className.includes('fa-pause')){
      button.children[0].className = 'fa fa-play';
      sample.stop();
    }
  };

  this.startStopAudio = function(){
    if (onOff.className ==='audio-off') {
      onOff.className = 'audio-on';
      volumeNode.connect(volumeAnalyser);
      mixNode.connect(volumeNode);
      mixNode.gain.value = 1;
      volumeNode.gain.value = .5;
      sampleNode.connect(mixNode);
      volumeAnalyser.connect(audioContext.destination);
      onOff.innerHTML='ON';
      myOscilloscope.visualize();
    } else {
      onOff.className = 'audio-off';
      volumeNode.disconnect(volumeAnalyser);
      volumeNode.gain.value = 0;
      onOff.innerHTML='OFF';
    }
  };

  this.handleDelay = function(){
    if (delayOnOff.className === 'delay-off'){
      delayOnOff.className = 'delay-on';
      delayOnOff.innerHTML = 'ON';
      bypassNode.gain.value = 0.5;
      if (document.querySelectorAll('input')[1].checked && streamSource){
        // streamSource.disconnect(delayEffect);
      }
    } else {
      delayOnOff.className = 'delay-off';
      delayOnOff.innerHTML = 'OFF';
      bypassNode.gain.value = 0;
    }
  };

  this.handleTremolo = function(){
    if (tremoloOnOff.className === 'tremolo-off'){
      tremoloOnOff.className = 'tremolo-on';
      tremoloOnOff.innerHTML = 'ON';
      myTremolo.createTremolo();
    } else {
      tremoloOnOff.className = 'tremolo-off';
      tremoloOnOff.innerHTML = 'OFF';
      mixNode.disconnect(tremoloNode);
      mixNode.connect(volumeNode);
    }
  };
}

export default PageHandler;
