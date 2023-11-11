const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

function initialize(passport) {
    const registerUser = async (req, email, password, done) => {
        const { username } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return done(null, false, { message: "Email already in use" });
        }

        try {
            // Remove the hashing step here 
            const user = new User({ username, email, password });
            await user.save();
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    };


    const authenticateUser = async (email, password, done) => {
        console.log('Inside authenticateUser function');

        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: "Invalid email or password" });
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log('Stored hashed password:', user.password);
            console.log('Entered password:', password);
            console.log('Is passwords match:', isMatch);
            if (isMatch) {
                console.log('Password matched');

                return done(null, user);

            } else {
                console.log('Password mismatched');

                return done(null, false, { message: "Invalid email or password" });
            }
        } catch (error) {
            return done(error);
        }
    };


    passport.use("local-register", new LocalStrategy({ usernameField: "email", passReqToCallback: true }, registerUser));
    passport.use("local-login", new LocalStrategy({ usernameField: "email" }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
}

module.exports = initialize;
