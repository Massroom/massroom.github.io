function iFrameBot() {
  const message = messageInput.value;
  if (message.startsWith('/embed')) {
    const url = message.slice('/embed'.length).trim();;
    const html = `
    <iframe width="95%" height="220" src="${url}" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 5px;"></iframe>
    `;
    mainChannel.message(html);
  };
};
