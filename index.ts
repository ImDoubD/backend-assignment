import express from 'express';
import mongoose from 'mongoose';
import router from './routes'; // Import the router from your controller.ts

const app = express();
const port = 6969; // Use your preferred port

// Connect to MongoDB
const mongoDBUri = 'mongodb+srv://dd7059:Pa3TzpFZirr9IiLH@cluster0.jelg3pq.mongodb.net/assignment';
mongoose.connect(mongoDBUri)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(error => console.error('MongoDB connection error:', error));

app.use(express.json());
app.use('/api/data/', router); // Use the router for your API routes

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




