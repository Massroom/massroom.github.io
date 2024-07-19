const xanoClient = new XanoClient({
  instanceBaseUrl: "https://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

function generateRandomUsername() {
  const adjectives = ['Awesome', 'Bold', 'Crazy', 'Daring', 'Energetic', 'Stealthy', 'Quick', 'Fierce'];
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon', 'Fox', 'Serpent', 'Elephant'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
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
  mainChannel.message(username + ': ' + message);
  messageInput.value = ''; // Clear input field
});

function displayMessage(message) {
  console.log('Displaying message:', message);
  const messageHTML = `
    <!--<p style="font-size: small; color: #e6e6e6;">${username}</p>-->
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}




// Check if signed in via Xano
let auth = localStorage.get("auth");

if (auth == 1) {
  document.getElementById("auth0").style.display = "none";
  document.getElementById("auth1").style.display = "block";
} 
else if (auth != 1) {
  document.getElementById("auth0").style.display = "block";
  document.getElementById("auth1").style.display = "none";
}
