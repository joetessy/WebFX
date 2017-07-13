function Tremolo(main){

  this.createTremolo = function(){
    if (main.mixNode){
      main.mixNode.disconnect(main.volumeNode);
      main.mixNode.connect(main.tremoloNode);
      main.tremoloNode.connect(main.volumeNode);
      this.setTremolo(0, 20);
    }
  };

  this.removeTremolo = function(){
    main.mixNode.disconnect(main.tremoloNode);
    main.mixNode.connect(main.volumeNode);
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
        main.tremoloNode.gain.value = val;
      } else if (direction === 'up'){
        val += .1;
        main.tremoloNode.gain.value = val;
      }
    }, speed);
  };
}

export default Tremolo;
