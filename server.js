if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const cors = require("cors")
var corsOptions = {
    origin: "http://localhost:8081"
};

const express = require("express")
const app = express()
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")
const methodOverride = require("method-override")


const db = require("./app/models");
const path = require("path");

db.sequelize.sync()
    .then(() => {
        console.log("Synced the database");
    })
    .catch((err) => {
        console.log("Failed to sync the database: " + err.message);
    });
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view engine', 'ejs');
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: "garland",
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, 'public')));

// Configuring the register post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/pacientprofile",
    failureRedirect: "/login",
    failureFlash: true
}))

// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashedPassword,
            creation_date: req.body.creation_date,
            stage: req.body.stage,
            psychiatrist: req.body.psychiatrist,
            sex: req.body.sex
        })
        console.log(users); // Display newly registered in the console
        res.redirect("/login")

    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// ------------------------------------------------------------
// ------------------------ routes ----------------------------
// ------------------------------------------------------------
app.get('/', /*checkAuthenticated*/ (req, res) => {
    res.render("home2.ejs")
})

app.get("/pacientprofile", (req, res) => {
    res.render("pacientprofile.ejs")
})
app.get("/doctorprofile", (req, res) => {
    res.render("doctorprofile.ejs")
})

app.get("/home", (req, res) => {
    res.render("home2.ejs")
})


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

app.get("/registerspecial", checkNotAuthenticatedSpecial, (req, res) => {
    res.render("registerspecial.ejs")
})
// End Routes

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
//   })

app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

// ------------------------------------------------------------
// -------- functions for checking authentication -------------
// ------------------------------------------------------------
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticatedSpecial(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/pacientprofile")
    }
    next()
}

require("./app/routes/tutorial.routes")(app);

app.listen(3000)

