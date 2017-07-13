function Delay(main){
  this.main = main;
  this.createDelay = function(streamSource){
    this.main.sampleNode.connect(this.main.delayEffect);
    this.main.delayEffect.connect(this.main.feedback);
    this.main.feedback.connect(this.main.delayEffect);
    this.main.delayEffect.connect(this.main.filter);
    this.main.filter.connect(this.main.bypassNode);
    this.main.bypassNode.connect(this.main.mixNode);
    this.main.bypassNode.gain.value = 0.5;
    if (streamSource){
      streamSource.connect(this.main.delayEffect);
    }
  };

  this.removeDelay = function(){
    this.main.bypassNode.gain.value = 0;
  };

  this.setDelayTime = function(interval){
    this.main.delayEffect.delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    this.main.feedback.gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    this.main.bypassNode.gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    this.main.filter.frequency.value = intensity;
  };
}

export default Delay;
