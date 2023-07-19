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
const informationsRoute = require('./routes/informationsRouter')
const subCategoriesRouter = require('./routes/subCategoryRouter')
const NotificationRouter = require('./routes/notificationRouter')

app.use(userRouter,technicianRouter,reservationRoutes,categoryRouter,NotificationRouter,otpRouter,popularTechnician,subCategoriesRouter);
app.use('/statistics',statisticsRoutes)
app.use('/managers',managerRoute)
app.use('/informations',informationsRoute)

const completedReservationRouter = require('./routes/completedReservationRouter');

app.use('/completedReservations', completedReservationRouter);

app.get('*',(req,res) =>{
  res.json({
    message:'unknown route'
  })
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));
