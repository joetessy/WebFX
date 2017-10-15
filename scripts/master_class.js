function MasterClass(){
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  this.audioContext = new AudioContext();
  this.mixNode = this.audioContext.createGain();
  this.volumeNode = this.audioContext.createGain();
  this.sampleNode = this.audioContext.createGain();
  this.volumeAnalyser = this.audioContext.createAnalyser();
  this.delayEffect = this.audioContext.createDelay(0.5);
  this.feedback = this.audioContext.createGain();
  this.bypassNode = this.audioContext.createGain();
  this.filter = this.audioContext.createBiquadFilter();
  this.lfo = this.audioContext.createOscillator();
  this.lfoAmp = this.audioContext.createGain();

  this.streamSource = null;
  this.mixNode.gain.value = 1;
  this.volumeNode.gain.value = .5;
  this.delayEffect.delayTime.value = 0.25;
  this.feedback.gain.value = 0;
  this.filter.frequency.value = 10000;
}

export default MasterClass;
