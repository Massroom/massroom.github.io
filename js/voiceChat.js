const peer = new Peer('massroom-user');

peer.on('connection', (conn) => {
  console.log('Connected to peer!');
  // Handle voice chat data here
});

conn.on('data', (data) => {
  console.log('Received voice chat data:', data);
  // Play the received audio data here
});

const audioData = // Get audio data from user's microphone
conn.send(audioData);

navigator.mediaDevices.getUserMedia({ audio: true })
  .then((stream) => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(1024, 1, 1);
    source.connect(processor);
    processor.connect(audioContext.destination);
    processor.onaudioprocess = (event) => {
      const audioData = event.inputBuffer.getChannelData(0);
      // Send audioData to peer using conn.send(audioData)
    };
  })
  .catch((error) => console.error('Error getting user media:', error));
