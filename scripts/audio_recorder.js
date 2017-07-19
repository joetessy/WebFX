function AudioRecorder(main){
  const recorder = document.querySelector('.recorder');
  var rec = new Recorder(main.volumeNode);

    this.handleRecord = function(){
      if (recorder.className.includes('record-off')){
        recorder.className = 'recorder record-on';
        rec.clear();
        rec.record();
      } else {
        recorder.className = 'recorder record-off';
        rec.stop();
        rec.getBuffers( this.gotBuffers );
      }
    };

    function doneEncoding( blob ) {
      Recorder.setupDownload( blob, "myRecording.wav" );
    }

    this.gotBuffers = function ( buffers ) {
      rec.exportWAV(doneEncoding );
    };
}

export default AudioRecorder;
