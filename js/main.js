let auth = localStorage.getItem("auth");

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

const mainChannel = xanoClient.channel("main", {
	presence:  true,
});

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');

// on join channel
//mainChannel.message(username + 'has joined the chatroom!');

mainChannel.on((message) => {
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
    case 'pressence_full':
      const users = message.payload
      const userCount = users.pressence.length
      document.getElementById('user-count').innerHTML = `Users: ${userCount}`;
      break;
    default:
      console.info(message);
  }
});

mainChannel.on((join) => {
	console.log('event join');
  switch (join.action) {
    case 'join':
      displayJoinMessage();
      break;
    default:
      console.info(join);
  }
});

mainChannel.on((pressence_full) => {
	console.log('event pressencefull');
  switch (pressence_full.action) {
    case 'pressence_full':
      const users = pressence_full.payload
      const userCount = users.pressence.length
      document.getElementById('user-count').innerHTML = `Users: ${userCount}`;
      break;
    default:
      console.info(pressence_full);
  }
});

mainChannel.on((leave) => {
	console.log('event leave');
  switch (leave.action) {
    case 'leave':
      displayLeaveMessage();
      break;
    default:
      console.info(leave);
  }
});

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
    <!--<p style="font-size: small; color: #e6e6e6;">${username}</p>-->
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}

/*const users = mainChannel.getPresence();
setTimeout(() => {
  const userList = users.payload;
  const userCount = users.length;
  console.log(userCount);
  document.getElementById('user-count').innerHTML = `Users: ${userCount}`;
}, 100); // adjust the timeout value as needed */

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  mainChannel.message(username + ': ' + message);
  messageInput.value = ''; // Clear input field
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
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();
