function gameBot() {
  const message = messageInput.value;
  if (message.startsWith('/game')) {
    if (role == 'Member') {
      displayMessage(`<p style="color: #ff0000;">@${username} this is a paid feature. Use premium to be able to /game!</p>`);
    } else if (role != null) {
      if (message === '/game pacman') {
        const url = message.slice('/embed'.length).trim();;
        const html = `
        <iframe width="99%" height="240" src="https://massroom.js.org/exe/pacman" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
        `;
        mainChannel.message(html);
      } else if (message === '/game flappybird') {
        const html = `
        <iframe width="99%" height="240" src="https://scriptorite.proj.sbs/interactives/flappybird4.html" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
        `;
        mainChannel.message(html);
      } else if (message === '/game platformer') {
        const html = `
        <iframe width="99%" height="240" src="https://massroom.js.org/exe/platformer" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
        `;
        mainChannel.message(html);
      } else if (message === '/game cubersurge') {
        const html = `
        <iframe width="99%" height="240" src="https://cubersurge.github.io/play/builds/CubersurgeAlpha1-2.html" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
        `;
        mainChannel.message(html);
      } else if (message === '/game 3d') {
        const html = `
        <iframe width="99%" height="240" src="https://massroom.js.org/exe/3d" frameborder="0" allowfullscreen style="padding-top: 10px; border-radius: 12px;"></iframe>
        `;
        mainChannel.message(html);
      };
    } else {
      displayMessage(`<p style="color: #ff0000;">@${username} error fetching your role. Try the command again.</p>`);
    };
  };
};
