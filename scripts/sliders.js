function Sliders(main, myAudio, myDelay, myTremolo){
  $('#volume').slider({
    orientation: 'vertical',
    range: 'min',
    min: 0,
    max: 100,
    value: 50,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myAudio.setVolume((ui.value) / 100);
    }
  });

  $('#delay-time').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 50,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myDelay.setDelayTime((ui.value) / 100 * .5);
    }
  });

  $('#delay-intensity').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 0,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myDelay.setDelayIntensity((ui.value) / 100 * .8);
    }
  });

  $('#delay-filter').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 100,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myDelay.setDelayFilter(ui.value * 100);
    }
  });

  $('#delay-bypass').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 50,
    animate: true,
    slide: function(event, ui){
      if (main.volumeNode)
      myDelay.setDelayBypass(ui.value / 100);
    }
  });

  $('#tremolo-depth').slider({
    range: 'min',
    min: 0,
    max: 100,
    value: 0,
    animate: true,
    slide: function(event, ui){
      myTremolo.setTremolo((ui.value / 100), $('#tremolo-speed').slider('option', 'value'));
    }
  });

  $('#tremolo-speed').slider({
    range: 'min',
    min: 0.5,
    max: 20,
    value: 10,
    animate: true,
    slide: function(event, ui){
      myTremolo.setTremolo( ($('#tremolo-depth').slider('option', 'value') / 100), ui.value);
    }
  });
}

export default Sliders;
