function iFrameBot() {
  const message = messageInput.value;
  if (message.startsWith('/embed')) {
    const url = message.slice('/embed'.length).trim();;
    const html = `
    <iframe width="85%" height="200" src="${url}" frameborder="0" allowfullscreen></iframe>
    `;
    mainChannel.message(html);
  };
};
