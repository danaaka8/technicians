require("dotenv").config();
require("./utils/mongodbConnection");
const reservationRoutes = require('./routes/reservationRouter');
const statisticsRoutes = require('./routes/statisticsRouter');
const managerRoute = require('./routes/managersRoute')

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


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const categoryRouter = require('./routes/categoryRouter')
const otpRouter = require('./routes/otpRouter')
const popularTechnician = require('./routes/popularTechnicianRouter')

app.use(userRouter,technicianRouter,reservationRoutes,categoryRouter,otpRouter,popularTechnician);
app.use('/statistics',statisticsRoutes)
app.use('/managers',managerRoute)

const completedReservationRouter = require('./routes/completedReservationRouter');

app.use('/completedReservations', completedReservationRouter);

app.get('*',(req,res) =>{
  res.json({
    message:'unknown route'
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
