// Get the audio element
const remoteAudio = document.getElementById('remote-audio');

// Create a new Peer instance with your PeerJS cloud hosting credentials
const peer = new Peer();

// Call a peer, providing our mediaStream
  var call = peer.call('massroom',
	mediaStream);

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer(mediaStream);
  });

peer.on('call', function(call) {
	// Answer the call, providing our mediaStream
	call.answer(mediaStream);
  });

// Request access to the user's audio stream
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    // When the call button is clicked, create a new peer connection
    document.getElementById('call-button').addEventListener('click', () => {
      const conn = peer.connect('remote-peer-id');
      conn.on('stream', remoteStream => {
        // Set the remote audio stream
        remoteAudio.srcObject = remoteStream;
      });
      conn.on('close', () => {
        // Handle the connection closing
      });
    });
  })
  .catch(error => {
    // Handle the error
  });
