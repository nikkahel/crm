const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

app.use(cookieParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1']
}));
const PORT = 3000;

const pipedrive = require('pipedrive');

const apiClient = new pipedrive.ApiClient();

let oauth2 = apiClient.authentications.oauth2;
oauth2.clientId = '663dd012fd741888'; // OAuth 2 Client ID
oauth2.clientSecret = '946482e2a0387ef16c1b7ed5186fbb458778c7cb'; // OAuth 2 Client Secret
oauth2.redirectUri = 'https://crm-sxtt.onrender.com/callback'; // OAuth 2 Redirection endpoint or Callback Uri

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', async (req, res) => {
    if (req.session.accessToken !== null && req.session.accessToken !== undefined) {
        // token is already set in the session
        // now make API calls as required
        // client will automatically refresh the token when it expires and call the token update callback
        const api = new pipedrive.DealsApi(apiClient);
        const deals = await api.getDeals();

        res.send(deals);
    } else {
        const authUrl = apiClient.buildAuthorizationUrl();

        res.redirect(authUrl);
    }
});

app.get('/callback', (req, res) => {
    const authCode = req.query.code;
    const promise = defaultClient.authorize(authCode);

    promise.then(() => {
        req.session.accessToken = defaultClient.authentications.oauth2.accessToken;
        res.redirect('/');
    }).catch((error) => {
        console.error('Error during authorization:', error);
        // Handle the error here (e.g., redirect to an error page or show an error message)
        res.status(500).json({ error: 'Authorization failed' });
    });
});
