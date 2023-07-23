const request = require('request-promise');

async function getUser(accessToken) {
    const requestOptions = {
        uri: 'https://api.pipedrive.com/v1/users/me',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        json: true
    };
    const userInfo = await request(requestOptions);

    return userInfo;
}
module.exports = {
    getUser
};