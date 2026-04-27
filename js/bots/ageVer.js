function ageVerificationBot() {
  const message = messageInput.value;
  if (message.includes('/av check')) {
    var age
    age = Math.round(Math.random()*100)
    if (age > 17) {
       mainChannel.message(`<p style="color: #00ff66; font-family: "VT323";">You are ${age} years old. Welcome.</p>`);
    }
    if (age < 18) {
       mainChannel.message(`<p style="color: #ff0000; font-family: "VT323";">You are ${age} years old and cannot use the site! Please get out of here.</p>`);
    }
  };
};
