function Delay(main){

  this.createDelay = function(streamSource){
    main.sampleNode.connect(main.delayEffect);
    main.delayEffect.connect(main.feedback);
    main.feedback.connect(main.delayEffect);
    main.delayEffect.connect(main.filter);
    main.filter.connect(main.bypassNode);
    main.bypassNode.connect(main.mixNode);
    main.bypassNode.gain.value = 0.5;
    if (main.streamSource && document.querySelector('#input-on-off').className === 'on'){
      main.streamSource.connect(main.delayEffect);
    }
  };

  this.removeDelay = function(){
    if (document.querySelector('#input-on-off').className === 'on'){
      main.streamSource.disconnect(main.delayEffect);
    }
    main.sampleNode.disconnect(main.delayEffect);
  };

  this.setDelayTime = function(interval){
    main.delayEffect.delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    main.feedback.gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    main.bypassNode.gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    main.filter.frequency.value = intensity;
  };
}

export default Delay;
