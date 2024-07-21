// for enforcer moderator
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.includes('fuck' || 'nigger' || 'shit')) {
    console.log('enforcer activated');
    displayMessage(`<h2 style="color: #af9cff;">Warning: @${username}We do not encourage swearing in Massroom. Please stop that.</h2>`);
  };
  if (message.includes('suicide' || 'kys' || 'kill yourself')) {
    console.log('enforcer activated');
    displayMessage(`<h2 style="color: #af9cff;">Warning: @${username}We do not encourage sensitive topics in Massroom. Please stop that.</h2>`);
  };
  //mainChannel.message();
});
