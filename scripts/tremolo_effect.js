import { mixNode, tremoloNode, volumeNode } from './main.js';

function Tremolo(){
  this.createTremolo = function(){
    if (mixNode){
      mixNode.disconnect(volumeNode);
      mixNode.connect(tremoloNode);
      tremoloNode.connect(volumeNode);
      this.setTremolo(0, 20);
    }
  };
  var tremoloInterval;
  this.setTremolo = function(minGain, speed = 20){
    if (tremoloInterval) clearInterval(tremoloInterval);
    let maxGain = 1;
    let val = 0;
    let direction;
    tremoloInterval = setInterval(function(){
      if (val >= maxGain){
        direction = 'down';
      } else if (val <= minGain){
        direction = 'up';
      }
      if (direction === 'down'){
        val -= .1;
        tremoloNode.gain.value = val;
      } else if (direction === 'up'){
        val += .1;
        tremoloNode.gain.value = val;
      }
    }, speed);
  };
}

export default Tremolo;
