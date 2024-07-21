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
