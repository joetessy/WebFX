function Tremolo(main){
  main.lfo.start();

  this.createTremolo = function(){
    if (main.mixNode){
      main.lfo.connect(main.lfoAmp);
      main.lfoAmp.connect(main.volumeNode.gain);
      this.setTremolo($('#tremolo-depth').slider('option', 'value') / 200,
        $('#tremolo-speed').slider('option', 'value'));
    }
  };

  this.removeTremolo = function(){
    main.lfo.amplitude = 0;
    main.lfoAmp.disconnect(main.volumeNode.gain);
    main.lfo.disconnect(main.lfoAmp);
  };

  this.setTremolo = function(amplitude, frequency){
    main.lfoAmp.gain.value = amplitude;
    main.lfo.frequency.value = frequency;
  };
}

export default Tremolo;
