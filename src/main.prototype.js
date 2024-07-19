let auth = localStorage.getItem("auth");



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

var username

if (auth == 1) {
  fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
      }
  })
    .then((response) => response.json())
    .then((data) => {
      username = data.name
      // Set the innerHTML of the created HTML elements
      //document.getElementById('username-display').innerHTML = data.name;
      //document.getElementById('password-display').innerHTML = data.email;
      //document.getElementById('timestamp').innerHTML = data.created_at; //'Account created at: ' + data.created_at;
    })
    .catch((error) => {
      console.error(error);
    });
}
else {
  username = generateRandomUsername();
}

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

// Function to update auth status
function updateAuthStatus() {
  auth = localStorage.getItem("auth");
  if (auth == 1) {
    document.getElementById("auth0").style.display = "none";
    document.getElementById("auth1").style.display = "block";
  } else {
    document.getElementById("auth0").style.display = "block";
    document.getElementById("auth1").style.display = "none";
  }
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();

// Call updateAuthStatus() every time the user signs in or out
xanoClient.on("auth:login", updateAuthStatus);
xanoClient.on("auth:logout", updateAuthStatus);
