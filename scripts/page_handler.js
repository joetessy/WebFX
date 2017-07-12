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

export default PageHandler;
