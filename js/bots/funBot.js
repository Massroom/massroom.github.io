function getRandomEmojis(count) {
  const emojis = ["\u{1F3E0}", "\u{1F680}", "\u{1F916}", "\u{1F389}", "\u{1F47B}", "\u{1F914}", "\u{1F697}", "\u{1F4D6}", "\u{1F38A}", "\u{1F47A}"];
  const randomEmojis = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    randomEmojis.push(emojis[randomIndex]);
  }
  return randomEmojis;
}

// Define an array containing your jokes
const jokes = [
  "Why was the morgue employee always in a good mood? Because he was always dying to get to work.",
  "I told my wife she was drawing her eyebrows too high. She looked surprised.",
  "Why do cannibals prefer eating politicians? Because they're always hungry for power.",
  "What did the gravestone say to the other gravestone? 'You're always so down.'",
  "Why did the suicide bomber get kicked out of the bar? Because he was making too many fateful requests.",
  "Why did the coffin go to therapy? Because it was feeling boxed in.",
  "What do you call a fake noodle? An impasta.",
  "Why did the scarecrow win an award? Because he was outstanding in his field of expertise – scaring away crows and ambition.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "Why did the coffee file a police report? It got mugged.",
  "Why did the astronaut break up with his girlfriend? He needed space.",
  "What do you call a group of cows playing instruments? A moo-sical band.",
  "Why did the bicycle fall over? Because it was two-tired.",
  "Why did the baker go to the bank? He needed dough.",
  "Why did the mushroom go to the party? Because he was a fun-gi.",
  "Why did the cat join a band? Because he wanted to be the purr-cussionist."
];

// Define a function that generates a random joke
function generateJoke() {
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];
  return randomJoke;
}

// Call the function to generate a random joke
console.log(generateJoke());

function funBot() {
  const message = messageInput.value;
  if (message === ('/joke')) {
    const joke = generateJoke();
    const text = `
    <p style="color: #ff0073;">Fun Bot: ${joke}</p>
    `;
    mainChannel.message(text);
  } else if (message.startsWith('/emoji random')) {
    const count = message.slice('/emoji random'.length).trim();
    const randomEmojis = getRandomEmojis(count);
    const text = `
    <p style="color: #ff0073;">Fun Bot: ${randomEmojis}</p>
    `;
    mainChannel.message(text);
  };
};
