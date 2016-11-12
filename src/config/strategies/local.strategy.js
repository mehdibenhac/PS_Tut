var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use(new localStrategy({
            usernameField: 'SU_email',
            passwordField: 'SU_password'
        },
        function (username, password, done) {
            var user = {
                username: username,
                password: password
            };
            done(null, user);
        }));
};