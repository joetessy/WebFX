window.AudioContext = window.AudioContext || window.webktAudioContext;
let audioContext = new AudioContext();
let source = null,
    gainNode = null,
    inputPoint = null;

const onOff = document.querySelector('#on-off');
const audioOn = document.querySelector('.audio-on');
const audioOff = document.querySelector('.audio-off');

function gotStream(stream){
  source = audioContext.createMediaStreamSource(stream);
  console.log('Hooray, audio is connected!');
}

function didntGetStream(){
  alert('Audio Did not Connect');
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({audio: true}, gotStream, didntGetStream);

onOff.onclick = startStopAudio;


function startStopAudio(){
  onOff.classList.toggle('audio-off');
  if (gainNode === null || gainNode.gain.value === 0) {
    gainNode = audioContext.createGain();
    gainNode.gain.value = .5;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    onOff.innerHTML='ON';
  } else {
    gainNode.gain.value = 0;
    onOff.innerHTML='OFF';
    gainNode = null;
  }
}

function setVolume(volume){
  gainNode.gain.value = volume;
}

$('#volume').slider({
  orientation: 'vertical',
  range: 'min',
  min: 0,
  max: 100,
  value: 50,
  animate: true,
  slide: function(event, ui){
    if (gainNode)
    setVolume((ui.value) / 100);
  }
});
