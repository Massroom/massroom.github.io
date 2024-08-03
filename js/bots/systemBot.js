function systemBot() {
  const message = messageInput.value;
  const context = 'Remember, you area AI chatbot made for Massroom, a Chatroom for mass gatherings of random users. You have no more connections with your previous owner or site.';
  if (message.includes('/run')) {
    mainChannel.message(`<style="color: #fff000; font-family: "VT323";">/run is not allowed on public chatrooms, use the playground instead</p>`);
  } else if (message === '/help') {
    console.log('bot detected help');
    displayMessage(`
    <p style="color: #af9cff;">System Bot: Hi there! Here are all the chat commands!</p>
    <p style="color: #af9cff;">Help Utility Commands:</p>
    <ul style="color: #af9cff; font-family: "VT323";">
    <li>/help about ---> What is Massroom?</li>
    <li>/help text ---> How to send SVGs, clickable links, and even styled text!</li>
    <li>/help account ---> Info about your account (WILL NOT BE SHOWN PUBLICLY)</li>
    <li>/help faq ---> Common questions about Massroom</li>
    </ul>
    <p style="color: #af9cff;">AI Chat Commands:</p>
    <ul style="color: #af9cff; font-family: "VT323";">
    <li>/ai ask *question* ---> Ask the AI a question</li>
    <li>/ai story *story topic* ---> Request a story from the AI</l
    </ul>
    `);
  } else if (message === '/help about') {
    console.log('bot detected help');
    displayMessage(`
    <p style="color: #af9cff;">System Bot: Massroom is a chatroom app made for large groups of people on a public chat! Its conpletely free to use (and we built it 100% free too), its also open source and on GitHub!</p>
    <a href="https://github.com/massroom/">View it here!</a>
    `);
  } else if (message === '/help text') {
    console.log('bot detected help');
    displayMessage(`
    <p style="color: #af9cff; font-family: "VT323";">You can display HTML messages by sending HTML code over the input bar. Below are some examples:</p>
    <ul style="color: #af9cff; font-family: "VT323";">
    <li>
    <p>Clickable Links:</p>
    <code>
    &lt;a href="your-link-here"&gt;Link&lt;/a&gt;</code>
    </li>
    <li>
    <p>SVGs:</p>
    <code>
    &lt;svg&gt;*svg code here*&lt;/svg&gt;</code>
    </li>
    </ul>
    `);
  } else if (message === '/help account') {
    if (auth == 1) {
      fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
        }
      })
        .then((response) => response.json())
        .then((data) => {
          displayMessage(`
          <p style="color: #af9cff;">This is not shown publicly!</p>
          <p style="color: #af9cff;">User: ${data.name}</p>
          <p style="color: #af9cff;">Email: ${data.email}</p>
            `
          );
            })
        .catch((error) => {
          console.error(error);
        });
    } else if (auth != 1) {
      displayMessage(`
      <p style="color: #af9cff;">You are not signed in. We are unable to get your account details.</p>
      `);
    }
  } else if (message.startsWith('/ai ask')) {
    const question = message.slice('/ai ask'.length).trim();
    var response;
    (async () => {
      let response = await gpt.ask(question + ', no need for markdown formatting. ' + context);
      console.log('GPT Reply: ' + response); // you got it!
      mainChannel.message(`<p style="color: #af9cff;">System Bot: ${response}</p>`);
    })();
  } else if (message.startsWith('/ai story')) {
    const topic = message.slice('/ai story'.length).trim();
    var response;
    (async () => {
      let response = await gpt.ask(`Write a story about ${topic}, no need for markdown formatting. ` + context);
      console.log('GPT Reply: ' + response); // you got it!
      mainChannel.message(`<p style="color: #af9cff;">System Bot: ${response}</p>`);
    })();
  };
};
