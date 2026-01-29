export default async function handler(req, res) {
  const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
  const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { code, provider } = req.query;

  // If no code, redirect to GitHub OAuth
  if (!code) {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo,user`;
    return res.redirect(authUrl);
  }

  // Exchange code for token
  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).json(data);
    }

    // Return the success page that communicates with the CMS
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Authorizing...</title>
      </head>
      <body>
        <h1>Authorization successful!</h1>
        <p>This window should close automatically...</p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage", e);
              if (!e.origin.match(/localhost|vercel\\.app$/)) {
                console.log("Invalid origin: " + e.origin);
                return;
              }
              
              window.opener.postMessage(
                'authorization:github:success:' + JSON.stringify(${JSON.stringify(data)}),
                e.origin
              );
              
              window.removeEventListener("message", receiveMessage, false);
            }
            
            window.addEventListener("message", receiveMessage, false);
            
            console.log("Sending message to opener");
            window.opener.postMessage("authorizing:github", "*");
            
            // Auto-close after 3 seconds
            setTimeout(function() {
              window.close();
            }, 3000);
          })();
        </script>
      </body>
      </html>
    `;
    
    return res.status(200).send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: error.message });
  }
}
