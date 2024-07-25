function iFrameBot() {
  const message = messageInput.value;
  if (message.startsWith('/embed')) {
    if (role == 'Member') {
      displayMessage(`<p style="color: #ff0000;">@${username} this is a paid feature. Use premium to be able to /embed!</p>`);
    } else {
      const url = message.slice('/embed'.length).trim();;
      const html = `
      <iframe width="99%" height="240" src="${url}" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
      `;
      mainChannel.message(html);
    };
  };
};
