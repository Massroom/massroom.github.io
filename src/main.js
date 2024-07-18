const xanoClient = new XanoClient({
  instanceBaseUrl: "http://x8ki-letl-twmt.n7.xano.io/",
  realtimeConnectionHash: "9Xy9Tb4aWRCeJNyVSeK8QFBGn60",
});

const mainChannel = this.xanoClient.channel("main");

marvelChannel.on((message) => {
  switch (message.action) {
    case 'message':
      messageReceived(message.payload);
      break;
    default:
      console.info(message);
  }
  mainChannel.on((message) => {
    // ... your existing code ...
  }, (error) => {
    console.error("Error receiving message:", error);
  });
});
