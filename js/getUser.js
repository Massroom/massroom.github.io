function getUser(user) {
  fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/getuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: user,
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed: ' + response.status);
      };
      console.log(response.name + ', ' + response.massroom_role);
      const data = response.json();
      console.log(data.name + ', ' + data.massroom_role);
      document.getElementById('username-display').innerHTML = data.name;
      document.getElementById('role-display').innerHTML = data.massroom_role;
    });
};
