import { saveAs } from 'file-saver';

class ScreenRecorder {
  public stream: MediaStream;
  public recorder: MediaRecorder;
  public recordedBlobs: Blob[];
  public mediaOptions = {
    mimeType: 'video/webm'
  };

  public videoBuffer: Blob;

  constructor() {
    this.init()
      .then()
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }

  public async init() {
    this.stream = await navigator.mediaDevices.getDisplayMedia();
  }

  public startRecording() {
    this.recordedBlobs = [];

    this.recorder = new MediaRecorder(this.stream, this.mediaOptions);
    this.recorder.addEventListener('dataavailable', (e) => {
      return this.onData(e);
    });
    this.recorder.start(100);
  }

  public stopRecording() {
    this.recorder.stop();

    this.videoBuffer = new Blob(
      this.recordedBlobs,
      // eslint-disable-next-line no-undef
      this.mediaOptions as BlobPropertyBag
    );
  }

  public onData(e: BlobEvent) {
    if (e.data.size > 0) {
      this.recordedBlobs.push(e.data);
    }
  }

  public saveVideo(filename = 'saveFile.webm') {
    return saveAs(this.videoBuffer, filename);
  }
}

export default ScreenRecorder;
