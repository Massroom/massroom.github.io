const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageList = document.getElementById('messageList');
const messageListEmpty = document.getElementById('messageListEmpty');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message === '/help') {
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
