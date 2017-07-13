function PageHandler(main, myDelay, myTremolo, myOscilloscope, myAudio){

  function turnOn(button){
    button.className = 'on';
    button.innerHTML = 'ON';
  }

  function turnOff(button){
    button.className = 'off';
    button.innerHTML = 'OFF';
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
  this.handleSamplePlay = function(button, audioBuffer) {
    if (button.className.includes('fa-play')){
      if (sample){
        sample.disconnect(main.sampleNode);
        let array = Array.from(document.querySelectorAll('.sample-item'));
        array.forEach((item) => {
          item.className = 'sample-item fa fa-play';
        });
      }
      button.className = 'sample-item fa fa-pause';
      sample = main.audioContext.createBufferSource();
      sample.buffer = audioBuffer;
      sample.loop = true;
      sample.connect(main.sampleNode);
      sample.start();
    } else if (button.className.includes('fa-pause')){
      button.className = 'sample-item fa fa-play';
      sample.stop();
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

export default PageHandler;
