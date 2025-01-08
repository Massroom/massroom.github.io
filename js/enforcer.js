// for enforcer moderator
sendButton.addEventListener('click', () => {
  console.log('enforcer ready');
  const swearWords = ['fuck', 'kys', 'shit', 'cunt', 'nigger', 'suicide', 'KYS', 'kill yourself','slit your throat', 'nigg', 'pea neas', 'pedophile', 'bitch'];
  const message = messageInput.value.toLowerCase(); // Convert to lowercase

  for (const word of swearWords) {
    if (message.includes(word.toLowerCase())) { // Convert swear word to lowercase
    console.log('enforcer activated');
    mainChannel.message(`<p style="color: #ff0000;">Warning: @${username} please refrain from using inappropriate language.</p>`);
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

  if (messageCount > 30) { // Adjust this threshold as needed
    console.log('Enforcer Spam detected!');
    displayMessage(`<p style="color: #ff0000;">Warning: @${username} please stop spamming.</p>`);
  }
}
