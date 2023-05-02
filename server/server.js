require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const recordRoutes = require('./routes/recordRouter');
const equipmentRoutes = require('./routes/equipmentRouter');
const rewardRoutes = require('./routes/rewardRoutes');

const cors = require('cors');

// express app
const app = express();

cors;
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// add middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/', recordRoutes);
app.use('/', equipmentRoutes);
app.use('/', rewardRoutes);

// connect to db  
mongoose
  .connect("mongodb://mongo-db/EmlpoyeesData")
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
