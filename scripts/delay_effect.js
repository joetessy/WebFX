import {sampleNode, delayEffect, feedBack, filter, bypassNode,
mixNode, feedback, delayOnOff } from './main.js';

function Delay(){
  this.createDelay = function(streamSource){
    sampleNode.connect(delayEffect);
    if (streamSource){
      streamSource.connect(delayEffect);
    }
    delayEffect.connect(feedback);
    feedback.connect(delayEffect);
    delayEffect.connect(filter);
    filter.connect(bypassNode);
    bypassNode.connect(mixNode);
    if (delayOnOff.className === 'delay-off'){
      bypassNode.gain.value = (0);
    }
  };

  this.setDelayTime = function(interval){
    delayEffect.delayTime.value = interval;
  };

  this.setDelayIntensity = function(intensity){
    feedback.gain.value = intensity;
  };

  this.setDelayBypass = function(intensity){
    bypassNode.gain.value = intensity;
  };

  this.setDelayFilter = function(intensity){
    filter.frequency.value = intensity;
  };
}

export default Delay;
