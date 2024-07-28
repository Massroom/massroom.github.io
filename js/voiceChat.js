const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const callButton = document.getElementById('call-button');
const remoteIdInput = document.getElementById('remote-id');
const peerIdDisplay = document.getElementById('peer-id');
const userList = document.getElementById('user-list');
const transcriptionDiv = document.getElementById('transcription');

let peer;
let connections = {};

// Create a PeerJS instance
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

            // Initialize speech recognition
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                transcriptionDiv.innerHTML = `<p>${transcript}</p>`;
            };

            recognition.start();

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

                    // Add the remote peer to the connections list
                    connections[remoteId] = call;
                    updateUserList();
                }
            });
        })
        .catch(err => {
            console.error('Failed to get local stream', err);
        });

    // Listen for data connections
    peer.on('connection', conn => {
        conn.on('data', data => {
            if (data.type === 'update-user-list') {
                updateUserList();
            }
        });
    });
}

// Update the list of users
function updateUserList() {
    userList.innerHTML = '';
    Object.keys(connections).forEach(userId => {
        const userItem = document.createElement('div');
        userItem.textContent = userId;
        userList.appendChild(userItem);
    });

    // Notify all connected peers to update their user lists
    Object.values(connections).forEach(conn => {
        conn.send({ type: 'update-user-list' });
    });
}

// Initialize PeerJS
initializePeer();
