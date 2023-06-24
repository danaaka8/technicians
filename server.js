require("dotenv").config();
require("./utils/mongodbConnection");
const reservationRoutes = require('./routes/reservationRouter');
const statisticsRoutes = require('./routes/statisticsRouter');



const cors = require('cors')


const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
  origin:'*',
}))
// const path = require("path");

const userRouter = require('./routes/usersRouter');
const technicianRouter = require('./routes/technicianRouter');


// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.set("view engine", "ejs");
// app.use(express.static(path.resolve(__dirname, "public")));

// app.use((req, res, next) => {
//   if ((req.cookies["logged"] === "false" || req.cookies['logged'] == undefined) && req.url != "/auth/login") {
//     res.redirect("/auth/login");
//   } else {
//     next();
//   }
// });

// app.get("/", (req, res) => res.render('pages/home'));
const categoryRouter = require('./routes/categoryRouter')
const otpRouter = require('./routes/otpRouter')

app.use(userRouter,technicianRouter,reservationRoutes,categoryRouter,otpRouter);
app.use('/statistics',statisticsRoutes)
// app.use('/api', technicianRouter);


// app.get('/auth/login',(req,res) =>{
//     return res.render('pages/login')
// })

// app.post('/auth/login',(req,res) =>{
//     const {email,password} = req.body
//     if(email == process.env.ADMIN_SECRET_EMAIL && password == process.env.ADMIN_SECRET_PASSWORD){
//       res.cookie('logged',true)
//       res.redirect('/')
//     }else{
//       res.redirect('/auth/login')
//     }
//   }
// )
// app.get('/users',(req,res) =>{
//   return res.render('pages/usersLayout')
// })
//
// app.get('/users/create',(req,res) =>{
//   return res.render('pages/createUserLayout')
// })
//
// app.get('/settings',(req,res) =>{
//   return res.render('pages/settingsLayout')
// })

app.get('*',(req,res) =>{
  res.json({
    message:'unknown route'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
