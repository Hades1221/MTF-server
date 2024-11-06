
import express from 'express';
import SwaggerUI from 'swagger-ui-express';
import Route from './routes/Route';
import cors from 'cors';
import { connect } from './util/Mongo'; // Import the MongoDB connection function
import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
const swagger = require('../swagger.json');

const app = express();
const port = process.env.PORT || 3000;


app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use(Route);
app.use('/swagger', SwaggerUI.serve, SwaggerUI.setup(swagger));

// Connect to MongoDB once when the server starts
connect().then(() => {
  console.log('MongoDB connected successfully');

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
});