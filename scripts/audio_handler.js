function AudioHandler(main){
  this.main = main;
  this.initAudioStream = function(){
    navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia;
    navigator.getUserMedia({audio: true}, this.gotStream, didntGetStream);
  };

  let that = this;
  this.gotStream = function(stream){
    that.main.streamSource = that.main.audioContext.createMediaStreamSource(stream);
    that.main.streamSource.connect(that.main.mixNode);
    if (document.querySelector('#delay-on-off').className === 'on'){
      that.main.streamSource.connect(that.main.delayEffect);
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
    if (that.main.streamSource &&
      document.querySelector('#on-off').className ==='on'){
        that.main.streamSource.disconnect(this.main.mixNode);
        that.main.streamSource.disconnect(this.main.delayEffect);
      }
    };

  this.setVolume = function(volume){
    this.main.volumeNode.gain.value = volume;
  };

  this.startAudio = function(){
    this.main.volumeNode.connect(this.main.volumeAnalyser);
    this.main.mixNode.connect(this.main.volumeNode);
    this.main.sampleNode.connect(this.main.mixNode);
    this.main.volumeAnalyser.connect(this.main.audioContext.destination);
  };

  this.stopAudio = function(){
    this.main.volumeNode.disconnect(this.main.volumeAnalyser);
  };

}

export default AudioHandler;
