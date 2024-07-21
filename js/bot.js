// for chatbot(s)
sendButton.addEventListener('click', () => {
  console.log('bot ready');
  const message = messageInput.value;
  console.log('bot read: ' + message);
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
  if (message === '/help about') {
    console.log('bot detected help');
    displayMessage(`
    <p style="color: #af9cff;">System Bot: Massroom is a chatroom app made for large groups of people on a public chat! Its conpletely free to use (and we built it 100% free too), its also open source and on GitHub!</p>
    <a href="https://github.com/massroom/">View it here!</a>
    `);
  };
  //mainChannel.message();
});
