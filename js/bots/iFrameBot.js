function iFrameBot() {
  const message = messageInput.value;
  if (message.startsWith('/embed')) {
    const url = message.slice('/embed'.length).trim();;
    const html = `
    <iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>
    `;
    mainChannel.message(html);
  };
};
