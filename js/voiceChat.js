const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const callButton = document.getElementById('call-button');
const remoteIdInput = document.getElementById('remote-id');
const peerIdDisplay = document.getElementById('peer-id');
const userList = document.getElementById('user-list');
const transcriptionDiv = document.getElementById('transcription');

function generatePrivateChatId() {
  n1 = Math.floor((Math.random() * 9) + 1);
  n2 = Math.floor((Math.random() * 9) + 1);
  n3 = Math.floor((Math.random() * 9) + 1);
  n4 = Math.floor((Math.random() * 9) + 1);
  n5 = Math.floor((Math.random() * 9) + 1);
  n6 = Math.floor((Math.random() * 9) + 1);
  n7 = Math.floor((Math.random() * 9) + 1);
  n8 = Math.floor((Math.random() * 9) + 1);
  n9 = Math.floor((Math.random() * 9) + 1);
  return `massroom-${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}`
}

let peer;
let connections = {};
let genId = generatePrivateChatId();

// Create a PeerJS instance
function initializePeer() {
    peer = new Peer(genId);

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
    /*Object.values(connections).forEach(conn => {
        conn.send({ type: 'update-user-list' });
    });*/
}

// Initialize PeerJS
initializePeer();
