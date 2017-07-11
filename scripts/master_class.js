function MasterClass(){
  this.audioContext = new AudioContext();
  this.mixNode = this.audioContext.createGain();
  this.volumeNode = this.audioContext.createGain();
  this.sampleNode = this.audioContext.createGain();
  this.volumeAnalyser = this.audioContext.createAnalyser();
  this.tremoloNode = this.audioContext.createGain();
  this.delayEffect = this.audioContext.createDelay(0.5);
  this.feedback = this.audioContext.createGain();
  this.bypassNode = this.audioContext.createGain();
  this.filter = this.audioContext.createBiquadFilter();
  this.streamSource = null;
  this.volumeNode.gain.value = 0;
  this.delayEffect.delayTime.value = 0.25;
  this.feedback.gain.value = 0;
  this.filter.frequency.value = 10000;
  this.bypassNode.gain.value = 0.5;
  this.tremoloNode.gain.value = 1;
}

export default MasterClass;
