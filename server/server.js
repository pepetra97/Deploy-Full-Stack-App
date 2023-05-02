require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const recordRoutes = require('./routes/recordRouter');
const equipmentRoutes = require('./routes/equipmentRouter');
const rewardRoutes = require('./routes/rewardRoutes');
const locationRouter = require('./routes/locationRouter');

const cors = require('cors');

// express app
const app = express();

cors;
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/', recordRoutes);
app.use('/', equipmentRoutes);
app.use('/', rewardRoutes);
app.use('/', locationRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
