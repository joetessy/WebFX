let audioContext = null;

function gotStream(stream){
  window.AudioContext = window.AudioContext || window.webktAudioContext;
  audioContext = new AudioContext();

  let mediaStreamSource = audioContext.createMediaStreamSource(stream);
  let gainNode = audioContext.createGain();
  mediaStreamSource.connect(audioContext.destination);

  console.log('Hooray, audio is connected!');
}

function didntGetStream(){
  alert('Audio Did not Connect');
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({audio: true}, gotStream, didntGetStream);


function soundOff(){

}

function soundOn(){


}
