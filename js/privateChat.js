class checkAuth {
     // setup the class and hide the body by default
    constructor() {
        document.querySelector("body").style.display = "none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }
    // check to see if the localStorage item passed to the function is valid and set
    validateAuth(auth) {
        if (auth != 1) {
            window.location.replace("/authuser");
        } else {
            document.querySelector("body").style.display = "block";
        }
    }
}

const auth = new checkAuth();



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

const privateChatId = generatePrivateChatId();
const privateChannel = createPrivateChatChannel(privateChatId);

// Display the chat ID on the page
document.getElementById('chat-id').innerHTML = privateChatId;

const joinModal = document.getElementById('join-modal');

// Add an input field for the chat ID
const chatIdInput = document.getElementById('chat-id-input');

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
