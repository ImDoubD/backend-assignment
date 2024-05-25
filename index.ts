import express from 'express';
import mongoose from 'mongoose';
import router from './routes'; // Import the router from your controller.ts

const app = express();
const port = 6969; // Use your preferred port

// Connect to MongoDB
const mongoDBUri = 'mongodb://localhost:27017/assignment';
mongoose.connect(mongoDBUri)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use('/api/data/', router); // Use the router for your API routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




// import express, { Express, Request, Response } from "express";
// import routes from "./routes";
// import cors from "cors";
// import dotenv from "dotenv";
// import * as controller from "./controller";
// import bodyParser from "body-parser";
// import path from "path";

// const app = express();
// const port = 6969;

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/data/', routes);

// app.get('/', (req, res) => {
//     res.send('Successful response.');
//   });

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });