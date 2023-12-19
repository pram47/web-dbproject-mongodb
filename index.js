const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')

const bodyParser = require('body-parser'); // Add this line




// MongoDB Connection
mongoose.connect('mongodb+srv://pram47:19052547@cluster0.jc4zrsn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


global.loggedIn = null

// Controllers
const indexController = require('./controllers/indexController')
const loginController = require('./controllers/loginController')
const signupController = require('./controllers/signupController')
const storeUserController = require('./controllers/storeUserController')
const loginUserController = require('./controllers/loginUserController')
const logoutController = require('./controllers/logoutController')
const profileController = require('./controllers/profileController')
const editController = require('./controllers/editController')
const updateprofileController = require('./controllers/updateprofileController')

//middleware
const redirectIfAuth = require('./middleware/redirectIfAuth')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({
    secret: "node secret"
}))

app.use("*", async (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});
app.set('view engine', 'ejs')


app.get('/', indexController)
app.get('/login',redirectIfAuth, loginController)
app.get('/signup',redirectIfAuth, signupController)
app.post('/user/signup',redirectIfAuth, storeUserController)
app.post('/user/login',redirectIfAuth, loginUserController)
app.get('/logout', logoutController)
app.get('/profile',authMiddleware, profileController)
app.get('/edit',authMiddleware, editController)
// app.post('/updateprofile/:id/:username',authMiddleware, updateprofileController)
app.post('/updateprofile/:id/:username', authMiddleware, updateprofileController);


app.listen(4000, () => {
    console.log("App listening on port 4000")
})