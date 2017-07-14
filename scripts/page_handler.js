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
      myDelay.createDelay(main.streamSource);
    } else {
      turnOff(button);
      myDelay.removeDelay(main.streamSource);
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

export default PageHandler;
