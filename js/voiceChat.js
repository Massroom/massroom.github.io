const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const callButton = document.getElementById('call-button');
const remoteIdInput = document.getElementById('remote-id');
const peerIdDisplay = document.getElementById('peer-id');
const userList = document.getElementById('user-list');

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



// Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

import AssemblyAI from 'assemblyai';

const client = new AssemblyAI({
  apiKey: '83c9fd0fabe646e2b706f1b28b26066f',
});

const FILE_URL =
  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
// const FILE_URL = './path/to/file.mp3';

// Request parameters 
const data = {
  audio_url: FILE_URL
}

const run = async () => {
  const transcript = await client.transcripts.transcribe(data);
  console.log(transcript.text);
};

run();

// Initialize PeerJS
initializePeer();
