//init ably

const ably = new Ably.Realtime({ key: 'x44j9Q.0J9W1Q:fF7ThTZMPZrHy88z2RUe0TCAc3Qr94Ccn5Bs8GPfl64', clientId: '<clientId>'});
const chatClient = new ChatClient(ably, {logHandler: logWriteFunc, logLevel: 'debug' });


const connectionStatus = chatClient.connection.status.current;
console.log(connectionStatus);


const { off } = chatClient.connection.status.onStatusChange((change) => console.log(change));

// terminate connection off();

// terminate all connections chatClient.connection.status.offAll();

// get main room
const room = chatClient.rooms.get('main');

// attatch this user
await room.attach();

// subscribe to main room messages

const {unsubscribe} = room.messages.subscribe(message) => {
  console.log(message);
}

