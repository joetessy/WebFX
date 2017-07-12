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

export default AudioHandler;
