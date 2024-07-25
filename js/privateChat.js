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
displayChatId();

// Display the chat ID on the page
function displayChatId() {
  document.getElementById('chat-id').innerHTML = 'Chat id: ' + privateChatId;
};

var privateChannel = xanoClient.channel('private/' + privateChatId);
console.log('Connected to: ' + privateChatId);

const joinModal = document.getElementById('join-modal');

const messageInput = document.getElementById('message-input');

const sendButton = document.getElementById('private-send-button');

/*privateChannel.on((message) => {
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
});*/

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
  privateChatId = chatId
  privateChannel.on((message) => {
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

// priv chat msg

const privateChatButton = document.getElementById('private-send-button');

//  privateChannel.on('message', (message) => {
//    displayMessage(message);
//  });

privateChannel.on((message) => {
  switch (message.action) {
    case 'message':
      displayMessage(message.payload);
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

privateChatButton.addEventListener('click', () => {
  const message = messageInput.value;
  console.log('Message input value:', message); // Log the input value
  console.log('Message:', message); // Log the message to the console
  let html = null;
    const role = await getUserRole();
    console.log('message handler recieved: ' + role);
    if (role === null) {
      html = `<p>${username}: ${message}</p>`;
    } else if (role === 'DevTeam') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Massroom Dev" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8 5h2v2H8V5zM6 7h2v2H6V7zM4 9h2v2H4V9zm-2 2h2v2H2v-2zm2 2h2v2H4v-2zm2 2h2v2H6v-2zm2 2h2v2H8v-2zm8-12h-2v2h2V5zm2 2h-2v2h2V7zm2 2h-2v2h2V9zm2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2z" />
        </svg>
      </div>
      <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Mod') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Moderator" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'BotDev') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Chatbot Creator" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Chatbot Dev" data-balloon-pos="up">
          <path d="M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Paid') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Premium Member" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Premium Member" data-balloon-pos="up">
          <path d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Stupid') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Make fun of this user NOW!" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Make fun of this user NOW!" data-balloon-pos="up">
          <path d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2h2z">
        </svg>
      </div>
        <p style="color: #ffb5a1;">${username}: ${message}</p>
      </div>
      `;
    };
    console.log(html);
    //const html = messageBuilder();
    mainChannel.message(html);
    messageInput.value = ''; // Clear input field
    messagesSent += 1;
    if (messagesSent > 10) {
      const user = checkIfSignedIn();
      if (user !== 'false') {
        console.log('changing user points');
        localStorage.setItem("points", paraseInt(localStorage.getItem("points")) =+ 1);
        messagesSent = 0;
      };
    }
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
