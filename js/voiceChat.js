const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const callButton = document.getElementById('call-button');
const remoteIdInput = document.getElementById('remote-id');
const peerIdDisplay = document.getElementById('peer-id');

// Create a PeerJS instance
const peer = new Peer({
    host: '0.peerjs.com',
    port: 443,
    path: '/'
});

// Display your peer ID
peer.on('open', id => {
    peerIdDisplay.textContent = id;
});

// Get local audio stream
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        localAudio.srcObject = stream;

        // Listen for incoming calls
        peer.on('call', call => {
            call.answer(stream); // Answer the call with our audio stream

            call.on('stream', remoteStream => {
                remoteAudio.srcObject = remoteStream;
            });
        });

        // Call the remote peer
        callButton.addEventListener('click', () => {
            const remoteId = remoteIdInput.value;
            if (remoteId) {
                const call = peer.call(remoteId, stream);

                call.on('stream', remoteStream => {
                    remoteAudio.srcObject = remoteStream;
                });
            }
        });
    })
    .catch(err => {
        console.error('Failed to get local stream', err);
    });
