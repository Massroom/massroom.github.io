const realtime = new Ably.Realtime({
  key: 'x44j9Q.0J9W1Q:fF7ThTZMPZrHy88z2RUe0TCAc3Qr94Ccn5Bs8GPfl64',
});

// Authenticate and retrieve client ID
realtime.auth.authenticate((tokenParams) => {
  return realtime.auth.requestToken(tokenParams);
}).then((authResult) => {
  const clientId = authResult.clientId;
  console.log('Authenticated client ID:', clientId);

  // Use the client ID to create a ChatClient instance
  const chatClient = new ChatClient(realtime, {
    logHandler: (level, message) => {
      console.log(`ChatClient ${level}: ${message}`);
    },
    logLevel: 'debug',
    clientId: clientId, // Use the retrieved client ID
  });

  // Proceed with attaching to the room and subscribing to messages
  const room = chatClient.rooms.get('main');
  room.attach().then(() => {
    console.log('Attached to room');

    // Send message functionality
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', () => {
      const message = messageInput.value;
      room.messages.publish({ data: message });
      messageInput.value = ''; // Clear input field
    });

    room.messages.subscribe((message) => {
      console.log('Received message:', message);
      const messageHTML = `<p>${message.data}</p>`;
      messageList.insertAdjacentHTML('beforeend', messageHTML);
    });
  });
});
