module.exports = function isLoggedin(session) {
    let username = 'none';
    if (session.loggedin) {
        username = session.username;
    }
    return username;
}