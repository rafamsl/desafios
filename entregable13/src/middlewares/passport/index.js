import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github";
import { UsuariosDao } from "../../dao/index.js";
import { BCRYPT_UTILS } from "../../utils/bcryp-utils.js";
import { DATE_UTILS, LOGGER_UTILS } from "../../utils/index.js";



const init = () => {
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UsuariosDao.getById(id)
        done(null, user);
    });
    
    passport.use(
        "login",
        new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, login)
    );
    // passport.use(
    //     "register",
    //     new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, register)
    // );
    passport.use(
        "github",
        new GithubStrategy({
            clientID: "Iv1.b1b0cc5a3203c034",
            clientSecret: "36b7b06cbf4904571737c76031002af1b9418b42",
            callbackURL: "http://localhost:8080/api/auth/github",
            scope: ["user:email"]
        },github_login)
    )
}

const github_login = async function(accessToken, refreshToken, profile, done){
    try {
        const gitmail = profile.emails?.[0].value

        if(!gitmail){
            return done(null, false)
        }

        let user = await UsuariosDao.getOne({email:gitmail})
        if(!user){
            user = {
                email: gitmail,
                timestamp: DATE_UTILS.getTimestamp()
            }
            console.log(user)
            const createdUser = await UsuariosDao.save(user)
            user = createdUser
        }

        const userResponse = {
            id: user.id,
            email: user.email,
            carrito: user.carrito
        }

        done(null,userResponse)
    } catch (error) {
        console.log(error)
        done(error)
    }
}

// const register = async function(req,res,done){
//     try {
//         console.log("agregando usuario")
//         const { email, password } = req.body;
//         let user = await UsuariosDao.getOne({email:email})
    
//         if (user){
//             return done(null, false, { error: ERRORS_UTILS.MESSAGES.EXISTING_USER})
//         }

//         user = await JOI_VALIDATOR.user.validateAsync({
//         email,
//         password,
//         timestamp: DATE_UTILS.getTimestamp(),
//         })
//         user.password = BCRYPT_UTILS.createHash(user.password)
//         const createdUser = await UsuariosDao.save(user);

//         const userResponse = {
//             id: createdUser.id,
//             email: createdUser.email,
//             carrito: createdUser.carrito
//         }

//         return done(null, userResponse);
    
//     } catch (error) {
//         await LOGGER_UTILS.addLog(error);
//         return done(null, false, error)
//     }
// }



const login = async function (req,email,password,done){
    try {

        if (!email || !password){
            return done(null,false, {error: "Invalid Email or Password"})
        }
        
        const userId = await UsuariosDao.getOne({ email: email });
        if (!userId) {
            return done(null, false, { error: "User not found" });
        }

        
        const user = await UsuariosDao.getById(userId);
        if (!user) {
            return done(null, false, { error: "User not found" });
        }

        if (!BCRYPT_UTILS.validatePassword(user, password)) {
            return done(null, false, {error: "Invalid Password"});
        }

        const userResponse = {
            id: user.id,
            email: user.email,
            carrito: user.carrito
        }
        
        return done(null, userResponse);

    } catch (error) {
        console.log(error)
        return done(error)
    }
}


export const PassportAuth = {init}
