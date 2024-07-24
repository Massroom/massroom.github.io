function getUserRole() {
  if (auth == 1) {
    var userRole;
    const response = await fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken') // Use the stored JWT
        }
      });
      const data = await response.json();
      userRole = data.massroom_role;
      console.log('auth/me obtained:' + userRole);
      return userRole;
  } else {
    console.log('user is not signed in, cannot get role');
    return null;
  }
};

function messageBuilder() {
    let html = null;
    const role = getUserRole();
    console.log('message handler recieved: ' + role);
    if (role === null) {
      html = `<p>${username}: ${message}</p>`;
    } else if (role === 'DevTeam') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Massroom Dev" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8 5h2v2H8V5zM6 7h2v2H6V7zM4 9h2v2H4V9zm-2 2h2v2H2v-2zm2 2h2v2H4v-2zm2 2h2v2H6v-2zm2 2h2v2H8v-2zm8-12h-2v2h2V5zm2 2h-2v2h2V7zm2 2h-2v2h2V9zm2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2zm-2 2h-2v2h2v-2z" />
        </svg>
      </div>
      <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Mod') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Moderator" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M22 2H2v12h2V4h16v10h2V2zM6 14H4v2h2v-2zm0 2h2v2h2v2H8v-2H6v-2zm4 4v2h4v-2h2v-2h-2v2h-4zm10-6h-2v2h-2v2h2v-2h2v-2z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'BotDev') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Chatbot Creator" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Chatbot Dev" data-balloon-pos="up">
          <path d="M12 1h2v8h8v4h-2v-2h-8V5h-2V3h2V1zM8 7V5h2v2H8zM6 9V7h2v2H6zm-2 2V9h2v2H4zm10 8v2h-2v2h-2v-8H2v-4h2v2h8v6h2zm2-2v2h-2v-2h2zm2-2v2h-2v-2h2zm0 0h2v-2h-2v2z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Paid') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Premium Member" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Premium Member" data-balloon-pos="up">
          <path d="M9 2H5v2H3v2H1v6h2v2h2v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h2v-2h2V6h-2V4h-2V2h-4v2h-2v2h-2V4H9V2zm0 2v2h2v2h2V6h2V4h4v2h2v6h-2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2H3V6h2V4h4z">
        </svg>
      </div>
        <p>${username}: ${message}</p>
      </div>
      `;
    } else if (role === 'Stupid') {
      html = `
      <div style="display: flex; align-items: center; gap: 3px;">
      <div aria-label="Make fun of this user NOW!" data-balloon-pos="up">
        <svg width="16" height="16" style="fill: #00f52d;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Make fun of this user NOW!" data-balloon-pos="up">
          <path d="M5 3h14v2H5V3zm0 16H3V5h2v14zm14 0v2H5v-2h14zm0 0h2V5h-2v14zM10 8H8v2h2V8zm4 0h2v2h-2V8zm-5 8v-2h6v2h2v-2h-2v-2H9v2H7v2h2z">
        </svg>
      </div>
        <p style="color: #ffb5a1;">${username}: ${message}</p>
      </div>
      `;
    };
    console.log(html);
  return html;
};
