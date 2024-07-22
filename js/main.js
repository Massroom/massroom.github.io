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
const messageListEmpty = document.getElementById('messageListEmpty');

function isEmpty(element) { 
  return element.innerHTML.trim() === '' 
} 

if (isEmpty(messageListEmpty)) {
	messageListEmpty.insertAdjacentHTML('beforeend', '<p style="color: #af9cff;">Info: Start of chat. It may appear empty for you but not for others.</p>');
}

// on join channel
//mainChannel.message(username + 'has joined the chatroom!');

mainChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
      break;
    default:
      console.info(message);
  }
});

var userCount = null;

mainChannel.on((presence_full) => {
  const payload = presence_full.payload;
  const presenceArray = payload.presence;
  const currentUserCount = presenceArray.length;
  userCount = currentUserCount;
  console.log(userCount);
  document.getElementById('user-count').innerHTML = `Users: ${userCount}`;
});

mainChannel.on((presence_update) => {
  userCount = (userCount === null) ? 1 : userCount + 1;
  console.log(userCount);
  document.getElementById('user-count').innerHTML = `Users: ${userCount}`;
});

userCount -= 1

mainChannel.on((join) => {
  if (join.payload.user.username !== username) {
    console.log('event join');
    displayJoinMessage();
  }
});

mainChannel.on((leave) => {
  if (leave.payload.user.username !== username) {
    console.log('event leave');
    displayLeaveMessage();
  }
});

function displayJoinMessage() {
  console.log('Displaying Join');
  const messageHTML = `<p>${username} joined the chatroom</p>`;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  messageList.scrollTop = messageList.scrollHeight;
}

function displayLeaveMessage() {
  console.log('Displaying Leave');
  const messageHTML = `<p>${username} left the chatroom</p>`;
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

var message;

sendButton.addEventListener('click', () => {
	setTimeout(function(){
		message = messageInput.value;
		checkForSpam(message); // Execute spam detection
		mainChannel.message(username + ': ' + message);
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
}

// Call updateAuthStatus() when the page loads
updateAuthStatus();
