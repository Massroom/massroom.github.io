auth = localStorage.getItem("auth");

if (auth != 1) {
      window.location.replace("/authuser");
 }

// private chat

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
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}`
}



const xanoClient = new XanoClient({
  instanceBaseUrl: "https://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "yHjeFpItI_ivBM9KL-tjZSYQAwM",
});

if (auth === 1) {
  const setAuth = localStorage.getItem("authToken");
  xano.setRealtimeAuthToken(authToken);
}

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

var privateChatId = generatePrivateChatId();

// Display the chat ID on the page
document.getElementById('chat-id').innerHTML = 'Chat id: ' + privateChatId;


var privateChannel = xanoClient.channel('private/' + privateChatId);
console.log('Connected to: ' + privateChatId);

const joinModal = document.getElementById('join-modal');

const messageInput = document.getElementById('message-input');

const sendButton = document.getElementById('private-send-button');

privateChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    case 'join':
      displayJoinMessage();
      break;
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(message);
  }
});

privateChannel.on((join) => {
  switch (join.action) {
    case 'join':
      displayJoinMessage();
      break;
    default:
      console.info(join);
  }
});

privateChannel.on((leave) => {
  switch (leave.action) {
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(leave);
  }
});

// Get the chat ID input field
const chatIdInput = document.getElementById('chat-id-input');

// Get the join button
const joinButton = document.getElementById('join-button');

// Add an event listener to the join button
joinButton.addEventListener('click', async () => {
  // Get the chat ID from the input field
  const chatId = chatIdInput.value;
  privateChannel = xanoClient.channel('private/' + chatId);
  console.log('Joined private chat:', chatId);
});

// priv chat msg

const privateChatButton = document.getElementById('private-send-button');

  privateChannel.on('message', (message) => {
    displayMessage(message);
  });

privateChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    case 'join':
      displayJoinMessage();
      break;
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(message);
  }
});

privateChannel.on((join) => {
  switch (join.action) {
    case 'join':
      displayJoinMessage();
      break;
    default:
      console.info(join);
  }
});

privateChannel.on((leave) => {
  switch (leave.action) {
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(leave);
  }
});

const messageList = document.getElementById('private-messageList');
function displayJoinMessage() {
  console.log('Displaying Join');
  const messageHTML = `<p>Someone joined the chatroom</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  messageList.scrollTop = messageList.scrollHeight;
}

function displayLeaveMessage() {
  console.log('Displaying Leave');
  const messageHTML = `<p>Someone left the chatroom</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  messageList.scrollTop = messageList.scrollHeight;
}

function displayMessage(message) {
  console.log('Displaying message:', message);
  const messageHTML = `
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}

const users = privateChannel.getPresence();
const userCount = users.length;
console.log(users);
//document.getElementById('user-count').innerHTML = `Users: ${userCount}`;

privateChatButton.addEventListener('click', () => {
  const message = messageInput.value;
  console.log('Message input value:', message); // Log the input value
  console.log('Message:', message); // Log the message to the console
  privateChannel.message(username + ': ' + message);
  //displayMessage(username + ': ' + message);
  setTimeout(() => {
    messageInput.value = ''; // Clear input field after a short delay
  }, 100); // Delay for 100 milliseconds
});

// Check if signed in via Xano

function updateAuthStatus() {
  auth = localStorage.getItem("auth");
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();
