import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoute from './routes/authRoute';
import eventRoute from './routes/eventRoute';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', authRoute);
app.use('/api/', eventRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));