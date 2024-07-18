const realtime = new Ably.Realtime({
  key: 'x44j9Q.0J9W1Q:fF7ThTZMPZrHy88z2RUe0TCAc3Qr94Ccn5Bs8GPfl64'
});

realtime.connection.once('connected', () => {
  console.log(realtime.clientId); // Output: A unique client ID assigned by Ably
});

const chatClient = new ChatClient(realtime, { logHandler: logWriteFunc, logLevel: 'debug' });

const room = chatClient.rooms.get('main');

room.attach().then(() => {
  room.messages.subscribe((message) => {
    const messageHTML = `<p>${message.data}</p>`;
    messageList.insertAdjacentHTML('beforeend', messageHTML);
  });
});
