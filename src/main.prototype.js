const xanoClient = new XanoClient({
  instanceBaseUrl: "https://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

function generateRandomUsername() {
  // ... (same as before)
}

const username = generateRandomUsername();
const mainChannel = xanoClient.channel("main");

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

mainChannel.on((message) => {
  console.log('Received message:', message);
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    default:
      console.log('log:' + message);
  }
}, (error) => {
  console.error("Error receiving message:", error);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.message(message);
  messageInput.value = ''; // Clear input field
});

function displayMessage(message) {
  console.log('Displaying message:', message);
  const messageHTML = `
    <p style="font-size: small; color: #e6e6e6;">${username}</p>
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}
