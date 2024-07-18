const xanoClient = new XanoClient({
  instanceBaseUrl: "http://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

const mainChannel = xanoClient.channel("main");
const messageHistory = [];
mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      messageReceived(message.payload);
      messageHistory.push(message.payload); // add message to history
      displayMessage(message.payload);
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
  mainChannel.message(message);
  messageInput.value = ''; // Clear input field
});

function displayMessage(message) {
  const maxMessages = 10; // limit the number of messages displayed
  const messagesToDisplay = messageHistory.slice(-maxMessages);
  messageList.innerHTML = ''; // clear the list
  messagesToDisplay.forEach((message) => {
    const messageHTML = `<p>${message}</p>`;
    messageList.insertAdjacentHTML('beforeend', messageHTML);
  });
  messageList.scrollTop = messageList.scrollHeight; // scroll to bottom
}
