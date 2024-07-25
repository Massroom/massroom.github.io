function iFrameBot() {
  const message = messageInput.value;
  if (message.startsWith('/embed') && role != null) {
    const url = message.slice('/embed'.length).trim();;
    const html = `
    <iframe width="99%" height="240" src="${url}" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
    `;
    mainChannel.message(html);
  };
};
