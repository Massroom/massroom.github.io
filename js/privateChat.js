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

async function getUserRole() {
  if (auth == 1) {
    var userRole;
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
        }
      });
      const data = await response.json();
      userRole = data.massroom_role;
      console.log('auth/me obtained:' + userRole);
      return userRole;
  } else {
    console.log('user is not signed in, cannot get role');
    return null;
  }
};

var role

setTimeout(async function() {
  role = await getUserRole();
}, 100);
      
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
    }) 
} else {
  username = generateRandomUsername();
}

var privateChatId = generatePrivateChatId();
displayChatId();

// Display the chat ID on the page
function displayChatId() {
  document.getElementById('chat-id').innerHTML = 'Chat id: ' + privateChatId;
};

var mainChannel = xanoClient.channel('private/' + privateChatId);
console.log('Connected to: ' + privateChatId);

const joinModal = document.getElementById('join-modal');

const messageInput = document.getElementById('message-input');

const sendButton = document.getElementById('private-send-button');

// Get the chat ID input field
const chatIdInput = document.getElementById('chat-id-input');

// Get the join button
const joinButton = document.getElementById('join-button');

// Add an event listener to the join button
joinButton.addEventListener('click', async () => {
  // Get the chat ID from the input field
  const chatId = chatIdInput.value;
  mainChannel = xanoClient.channel('private/' + chatId);
  privateChatId = chatId
  mainChannel.on((message) => {
        switch (message.action) {
              case 'message':
                    displayMessage(message.payload);
                    break;
              default:
                    console.info(message);
        }
  });
  displayChatId();
  console.log('Joined private chat:', chatId);
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

const messageList = document.getElementById('private-messageList');

function displayMessage(message) {
  console.log('Displaying message:', message);
  const messageHTML = `
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}

const users = mainChannel.getPresence();
const userCount = users.length;
console.log(users);
//document.getElementById('user-count').innerHTML = `Users: ${userCount}`;



sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  console.log('Message input value:', message); // Log the input value
  console.log('Message:', message); // Log the message to the console
  mainChannel.message(username + ': ' + message);
  setTimeout(() => {
    messageInput.value = ''; // Clear input field
  }, 100);
});

// Check if signed in via Xano
function updateAuthStatus() {
  auth = localStorage.getItem("auth");
  if (auth === '1') {
    document.getElementById("auth0").style.display = "none";
    document.getElementById("auth1").style.display = "block";
  } else {
    document.getElementById("auth0").style.display = "block";
    document.getElementById("auth1").style.display = "none";
  }
};

// Check if signed in via Xano

function updateAuthStatus() {
  auth = localStorage.getItem("auth");
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();
