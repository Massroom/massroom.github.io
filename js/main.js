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
  const adjectives = ['Awesome', 'Bold', 'Crazy', 'Daring', 'Energetic', 'Stealthy', 'Quick', 'Fierce', 'Brave'];
  const nouns = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Dragon', 'Fox', 'Serpent', 'Elephant'];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
}
var username
var messagesSent = 0;
if (localStorage.getItem("points" !== 'undefined')) {
  console.log('user points found');
  localStorage.getItem("points");
} else {
  console.log('user points not found');
  localStorage.setItem("points", 0);
}

function checkIfSignedIn() {
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
        return {
          "username": data.name,
          "email": data.email,
          "created_at": data.created_at,
          "points": data.massroom_points,
          "role": data.massroom_role
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    console.log('user is not signed in');
    return false;
  }
};
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
      username = data.name;
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  username = generateRandomUsername();
}
const mainChannel = xanoClient.channel("main", {
  presence: true,
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
    <p>${message}</p>
  `;
  messageList.insertAdjacentHTML('beforeend', messageHTML);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
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
sendButton.addEventListener('click', () => {
  setTimeout(async function() {
    const message = messageInput.value;
    checkForSpam(message);
    let html = null;
    const role = await getUserRole();
    console.log('message handler recieved: ' + role);
    if (role === null) {
      html = `<p>${username}: ${message}</p>`;
    } else if (role === 'DevTeam') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
        <svg width="12" height="12" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path d="M8 5h2v2H8V5zM6 7h2v2H6V7zM4 9h2v2H4V9zm-2 2h2v2H2v-2zm2 2h2v2H4v-2zm2 2h2v2H6v-2zm2 2h2v2H8v-2zm8-12h-2v2h2V5zm2 2h-2v2h2V7zm2 2h-2v2h2V9zm2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2z" />
        </svg>
      <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Mod') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
        <svg width="12" height="12" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path d="M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z">
        </svg>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'BotDev') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
        <svg width="12" height="12" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path d="M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z">
        </svg>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Stupid') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
        <svg width="12" height="12" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
          <path d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2h2z">
        </svg>
        <p style="color: #852e17;">${username}: ${message}</p>
      </div>
      `;
    };
    console.log(html);
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
}
// Call updateAuthStatus() when the page loads
updateAuthStatus();
