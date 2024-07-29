fetch('https://x8ki-letl-twmt.n7.xano.io/api:iGbUspz7/auth/getuser', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username: username,
  })
})
  .then((response) => {
    if (!response.ok) { // Check if the response status is not ok (200-299)
      throw new Error('Failed: ' + response.status);
    }
    return response.json();
  })
