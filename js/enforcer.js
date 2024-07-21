// for enforcer moderator
sendButton.addEventListener('click', () => {
  console.log('enforcer ready');
  const swearWords = ['fuck', 'kys', 'shit', 'nigger', 'suicide', 'kys', 'kill yourself','slit your throat'];
  const message = messageInput.value.toLowerCase(); // Convert to lowercase

  for (const word of swearWords) {
    if (message.includes(word.toLowerCase())) { // Convert swear word to lowercase
    console.log('enforcer activated');
    displayMessage(`<p style="color: #ff0000;">Warning: Please refrain from using inappropriate language.</p>`);
    break;
    }
  }
});


// spam detection
let messageCount = 0;
let lastMessageTime = 0;

function checkForSpam() {
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastMessageTime;

  if (timeDiff < 30000) { // 30 seconds
    messageCount++;
  } else {
    messageCount = 1;
  }

  lastMessageTime = currentTime;

  if (messageCount > 5) { // Adjust this threshold as needed
    console.log('Enforcer Spam detected!');
    displayMessage(`<p style="color: #ff0000;">Warning: Spam detected!</p>`);
  }
}
