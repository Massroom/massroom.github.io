function iFrameBot() {
  const message = messageInput.value;
  if (role == 'Member') {
    displayMessage(`<p style="color: #ff0000;">@${username} this is a paid feature. Use premium to be able to /play!</p>`);
  } else if (role != null) {
    if (message === '/game pacman') {
      const url = message.slice('/embed'.length).trim();;
      const html = `
      <iframe width="99%" height="240" src="https://massroom.js.org/exe/pacman/" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
      `;
      mainChannel.message(html);
    };  
  } else {
    displayMessage(`<p style="color: #ff0000;">@${username} error fetching your role. Try the command again.</p>`);
  };
};
