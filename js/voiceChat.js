const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const callButton = document.getElementById('call-button');
const remoteIdInput = document.getElementById('remote-id');
const peerIdDisplay = document.getElementById('peer-id');
const transcriptionsDiv = document.getElementById('transcriptions');

let peer;
let localStream;

// Initialize PeerJS
function initializePeer() {
    peer = new Peer({
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
            localStream = stream;

            // Listen for incoming calls
            peer.on('call', call => {
                call.answer(stream); // Answer the call with our audio stream

                call.on('stream', remoteStream => {
                    remoteAudio.srcObject = remoteStream;
                    startTranscription(remoteStream, 'Remote');
                });
            });

            // Call the remote peer
            callButton.addEventListener('click', () => {
                const remoteId = remoteIdInput.value;
                if (remoteId) {
                    const call = peer.call(remoteId, stream);

                    call.on('stream', remoteStream => {
                        remoteAudio.srcObject = remoteStream;
                        startTranscription(remoteStream, 'Remote');
                    });
                }
            });

            // Start transcription for local stream
            startTranscription(stream, 'Local');
        })
        .catch(err => {
            console.error('Failed to get local stream', err);
        });
}

// Start transcription
function startTranscription(stream, user) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);

    source.connect(processor);
    processor.connect(audioContext.destination);

    processor.onaudioprocess = function(event) {
        const input = event.inputBuffer.getChannelData(0);
        const buffer = new Float32Array(input.length);
        buffer.set(input);
        recognition.onresult = function(event) {
            const result = event.results[event.resultIndex];
            if (result.isFinal) {
                displayTranscription(user, result[0].transcript);
            }
        };
        recognition.start();
    };
}

// Display transcription
function displayTranscription(user, text) {
    const transcriptionDiv = document.createElement('div');
    transcriptionDiv.className = 'transcription';
    transcriptionDiv.textContent = `${user}: ${text}`;
    transcriptionsDiv.appendChild(transcriptionDiv);
}

// Initialize PeerJS
initializePeer();
