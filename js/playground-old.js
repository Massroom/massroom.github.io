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

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');
const messageListEmpty = document.getElementById('messageListEmpty');

function isEmpty(element) { 
  return element.innerHTML.trim() === '' 
} 

if (isEmpty(messageListEmpty)) {
	messageListEmpty.insertAdjacentHTML('beforeend', '<p style="color: #af9cff;">Info: Start of console.</p>');
}

function displayMessage(message) {
  console.log('Displaying message:', message);
  messageList.insertAdjacentHTML('beforeend', message);
  // Scroll to the bottom
  messageList.scrollTop = messageList.scrollHeight;
}


sendButton.addEventListener('click', () => {
	setTimeout(function(){
		const message = messageInput.value;
		checkForSpam(message); // Execute spam detection
		displayMessage(`
    <!--<p style="font-size: small; color: #e6e6e6;">${username}</p>-->
    <p>${message}</p>
  `);
		messageInput.value = ''; // Clear input field
	}, 200);
});


// Check if signed in via Xano

function updateAuthStatus() {
  auth = localStorage.getItem("auth");
};

// Call updateAuthStatus() when the page loads
updateAuthStatus();




// playground Bot

// for chatbot(s)
sendButton.addEventListener('click', () => {
  console.log('bot ready');
  const message = messageInput.value;
  console.log('bot read: ' + message);
  if (message.startsWith('/run js')) {
    const question = message.slice('/run js'.length).trim();
    var code;
    console.log('Ran: ' + code);
    displayMessage(`
    <p style="color: #fff45c;">Code Runner: Your JS code is below this line, if it doesn't work, try debugging using <code>console.log();</code></p>
    <script>${code}</script>
    `);
  } else if (message.startsWith('/run css')) {
    const question = message.slice('/run css'.length).trim();
    var code;
    console.log('Ran: ' + code);
    displayMessage(`
    <p style="color: #fff45c;">Code Runner: Your CSS code is below this line.</p>
    <script>${code}</style>
    `);
  } else if (message.startsWith('/run html')) {
    const question = message.slice('/run html'.length).trim();
    var code;
    console.log('Ran: ' + code);
    displayMessage(`
    <p style="color: #fff45c;">Code Runner: Your HTML code is below this line.</p>
    <div>${code}</div>
    `);
  };
});
