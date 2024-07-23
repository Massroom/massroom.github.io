const emojis = ["🏠", "🚀", "🤖", "🎉", "👻", "🤔", "🚗", "📚", "🎊", "👺"];
  const randomEmojis = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    randomEmojis.push(emojis[randomIndex]);
  }
  return randomEmojis;
}

function funBot() {
  const message = messageInput.value;
  if (message === '/fun emoji') {
    const text = `
    <p style="color: #ff0073;">${randomEmojis}</p>
    `;
    mainChannel.message(text);
  };
};
