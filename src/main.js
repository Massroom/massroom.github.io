const xanoClient = new XanoClient({
  instanceBaseUrl: "http://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

function generateRandomUsername() {
  const adjectives = ['Awesome', 'Bold', 'Crazy', 'Daring', 'Energetic', 'Stealthy', 'Quick', 'Fierce'];
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon', 'Fox', 'Serpent', 'Elephant'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
}

const username = generateRandomUsername()

function generateRandomUsername() {
  const adjectives = ['Awesome', 'Bold', 'Crazy', 'Daring', 'Energetic'];
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
}

const username = generateRandomUsername()

const mainChannel = xanoClient.channel("main");
const messageHistory = [];

// Receive message
mainChannel.on((message) => {
  console.log('Received message:', message);
  switch (message.action) {
    case 'message':
      messageReceived(message.payload);
      messageHistory.push(message.payload); // Add message to history
      //displayMessage(message.payload);
      break;
    default:
      console.log('log:' + message);
  }
}, (error) => {
  console.error("Error receiving message:", error);
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

// Send message
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.message(message);
  messageInput.value = ''; // Clear input field
});

function messageReceived(message) {
  // You might have some other logic here, but make sure to call displayMessage!
  displayMessage(message);
}

function displayMessage(message) {
  console.log('Displaying message:', message);
  while (messageList.firstChild) {
    messageList.removeChild(messageList.firstChild);
  }
  const maxMessages = 100; // Limit the number of messages displayed
  const messagesToDisplay = messageHistory.slice(-maxMessages);
  
  messagesToDisplay.forEach((message) => {
    const messageHTML = `
    <p style="font-size: small; color: #e6e6e6;">${username}</p>
    <p>${message}</p>
    `;
    messageList.insertAdjacentHTML('beforeend', messageHTML);
  });

  // Check if the user is scrolled to the bottom
  const isScrolledToBottom = messageList.scrollTop + messageList.offsetHeight >= messageList.scrollHeight;

  // Scroll to the bottom if the user was scrolled to the bottom before
  if (isScrolledToBottom) {
    messageList.scrollTop = messageList.scrollHeight;
  }
}
