const passport=require("passport")
const LocalStrategy =require("passport-local").Strategy
let bcrypt=require("bcrypt")
const User=require("../models/user")



const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallback =async (username, password, done) => {

    User.findOne({ email: username })
        .then(async(user) => {
           

            if (!user) {
               
                return done(null, false) }
            
            const isValid =await bcrypt.compare(password,user.password);
            
            if (isValid) { 
                return done(null, user);
            } else {
                const error=new Error('invalid email or password')
                 error.statusCode=401
                 throw error
            }
        })
        .catch((err) => {   
            done(err);
        });

}

const strategy  = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

 passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
  
}); 