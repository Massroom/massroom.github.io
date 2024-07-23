// for chatbot(s)
sendButton.addEventListener('click', () => {
  console.log('bot ready');
  const message = messageInput.value;
  console.log('bot read: ' + message);
  systemBot()
});
