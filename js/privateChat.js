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


const privateChatId = generatePrivateChatId();
// Add an input field for the chat ID
const chatIdInput = document.getElementById('chat-id-input');
// Display the chat ID on the page
document.getElementById('chat-id').innerHTML = 'Chat id: ' + privateChatId;


const privateChannel = xanoClient.channel('private/' + privateChatId);


const joinModal = document.getElementById('join-modal');

const messageInput = document.getElementById('message-input');


// Add a button to join the chat
const joinButton = document.getElementById('join-button');

// Handle the join button click event
joinButton.addEventListener('click', () => {
  const inputChatId = chatIdInput.value;
  if (inputChatId === privateChatId) {
    joinPrivateChat(privateChatId);
    // Close the modal
    const closeLink = document.createElement('a');
    closeLink.href = '#join-modal';
    closeLink.rel = 'modal:close';
    closeLink.click();
  } else {
    alert('Invalid chat ID');
  }
});

// priv chat msg

const privateChatButton = document.getElementById('private-send-button');
  privateChatButton.addEventListener('click', () => {
    const message = messageInput.value;
    privateChannel.message(username + ': ' + message);
    messageInput.value = '';
    joinPrivateChat(privateChatId);
  });

  privateChannel.on('message', (message) => {
    displayMessage(message);
  });
