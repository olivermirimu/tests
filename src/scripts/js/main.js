/*jslint white: true */
/*jslint es6 */

'use strict';
// GLOBAL VARIABLES AND CONSTANTS
const audioStreamConstraints = true;
const videoStreamConstraints = true;
// Dom Element selection
const localVideo = document.getElementById('video');
const localAudio = document.getElementById('audio');
const videoButton = document.getElementById('videoButton');
const audioButton = document.getElementById('audioButton');
const start = document.getElementById('start');
const snap = document.getElementById('snap');
const photo = document.getElementById('photo');

let localStream;
let recording = false;
// facingMode = 'user';

// GLOBAL FUNCTIONS
function switchCameras(track, camera) {
  // let constraints = track.getConstraints();
  // constraints.facingMode = camera;
  // track.applyConstraints(constraints);
}
// Error Handling
function handleError(err) {
  console.log(`Sorry, an error occured: ${err}`);
}

// VIDEO FUNCTIONS
function localVideoStream(mediaStream) {
  localStream = mediaStream;
  localVideo.srcObject = mediaStream;
}

function startVideoRecording() {
  navigator.mediaDevices.getUserMedia({
      video: videoStreamConstraints,
      audio: audioStreamConstraints
    })
    .then(localVideoStream)
    .catch(handleError);
  videoButton.innerHTML = 'Stop';
  recording = true;
}

function stopVideoRecording() {
  localStream.getVideoTracks()[0].stop();
  localStream.getAudioTracks()[0].stop();
  videoButton.innerHTML = 'Start';
  recording = false;
}

videoButton.addEventListener('click', () => {
  (recording) ? stopVideoRecording(): startVideoRecording();
});

//AUDIO FUNCTIONS
function localAudioStream(mediaStream) {
  localStream = mediaStream;
  localAudio.srcObject = mediaStream;
}

function startAudioRecording() {
  navigator.mediaDevices.getUserMedia({
      audio: audioStreamConstraints
    })
    .then(localAudioStream)
    .catch(handleError);
  audioButton.innerHTML = 'Stop';
  recording = true;
}

function stopAudioRecording() {
  localStream.getAudioTracks()[0].stop();
  audioButton.innerHTML = 'Start';
  recording = false;
}

audioButton.addEventListener('click', () => {
  (recording) ? stopAudioRecording(): startAudioRecording();
});

// RECORDING FUNCTIONS
// const recordedVideo = document.getElementById('recordedVideo');

// let mediaRecorder = new mediaRecorder(localStream);
// let RecordedChunks = [];

// mediaRecorder.ondataavailable = (event) => {
//   recordedChunks.push(event.data);
// };
// mediaRecorder.onstop = (event) => {
//   let recordedBlob = new Blob(recordedChunks, {
//     'type': 'video/mp4'
//   });
//   recordedVideo.srcObject = recordedBlob;
// };

// PHOTO FUNCTIONS
start.addEventListener('click', () => {
  // triger media streamallow access to camera
  navigator.mediaDevices.getUserMedia({
      video: videoStreamConstraints
    })
    .then(localVideoStream)
    .catch(handleError);
  start.innerHTML = 'Ready';
  recording = true;
});

snap.addEventListener('click', () => {
  // capture snapshot of the current frame on video stream
  let capturedImage = new ImageCapture(localStream.getVideoTracks()[0]);
  // place the captured image in the photo element on page
  capturedImage.takePhoto().then((blob) => {
    photo.src = URL.createObjectURL(blob);
  }).catch(handleError);
});

//***UPLOADS***//
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileUpload');
const endpoint = 'http://localhost:3000/upload';

uploadButton.addEventListener('click', () => {
  const formData = new FormData();

  // console.log(fileInput.files[0]);
  for (let file of fileInput.files) {
    formData.append(file.name, file);
  }
  fetch(endpoint, {
    method: 'post',
    body: formData
  }).catch(handleError);
});