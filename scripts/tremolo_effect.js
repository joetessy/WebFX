function Tremolo(main){
  this.main = main;
  this.createTremolo = function(){
    if (this.main.mixNode){
      this.main.mixNode.disconnect(this.main.volumeNode);
      this.main.mixNode.connect(this.main.tremoloNode);
      this.main.tremoloNode.connect(this.main.volumeNode);
      this.setTremolo(0, 20);
    }
  };
  var tremoloInterval;
  this.setTremolo = function(minGain, speed = 20){
    if (tremoloInterval) clearInterval(tremoloInterval);
    let maxGain = 1;
    let val = 0;
    let direction;
    let that = this;
    tremoloInterval = setInterval(function(){
      if (val >= maxGain){
        direction = 'down';
      } else if (val <= minGain){
        direction = 'up';
      }
      if (direction === 'down'){
        val -= .1;
        that.main.tremoloNode.gain.value = val;
      } else if (direction === 'up'){
        val += .1;
        that.main.tremoloNode.gain.value = val;
      }
    }, speed);
  };
}

export default Tremolo;
