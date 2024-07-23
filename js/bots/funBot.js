function getRandomEmojis(count) {
  const emojis = ["\u{1F3E0}", "\u{1F680}", "\u{1F916}", "\u{1F389}", "\u{1F47B}", "\u{1F914}", "\u{1F697}", "\u{1F4D6}", "\u{1F38A}", "\u{1F47A}"];
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
