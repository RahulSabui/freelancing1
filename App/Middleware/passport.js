const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"508292887383-e9ec8v0bmo8v0bdssdtvosj1ootmbqv4.apps.googleusercontent.com", // Your Credentials here.
	clientSecret:"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", // Your Credentials here.
	callbackURL:"http://localhost:4000/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));