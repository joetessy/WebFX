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
        main.streamSource.disconnect(main.delayEffect);
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

export default AudioHandler;
