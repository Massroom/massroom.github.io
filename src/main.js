const xanoClient = new XanoClient({
  instanceBaseUrl: "http://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

const mainChannel = xanoClient.channel("main");

mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      messageReceived(message.payload);
      break;
    default:
      console.info(message);
  }
}, (error) => {
  console.error("Error receiving message:", error);
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.sendMessage({ action: 'message', payload: message });
  messageInput.value = ''; // Clear input field
});

mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    default:
      console.info(message);
  }
});

function displayMessage(message) {
  const messageHTML = `<p>${message}</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
}
