// for chatbot(s)
sendButton.addEventListener('click', () => {
  console.log('bot ready');
  const message = messageInput.value;
  if (message === '/help') {
    console.log('bot detected help');
    displayMessage(`
    <p style="color: #af9cff;">System Bot: Hi there! How may I help you?</p>
    <ul style="color: #af9cff; font-family: "VT323";">
    <li>/help about ---> What is Massroom?</li>
    <li>/help account ---> Info about your account (WILL NOT BE SHOWN PUBLICLY)</li>
    <li>/help faq ---> Common questions about Massroom</li>
    <li>/help html ---> How to send SVGs, clickable links, and even styled text!</li>
    </ul>
    `);
  };
  //mainChannel.message();
});
