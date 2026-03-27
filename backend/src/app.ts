import express from 'express';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(cors({
    origin: 'http://localhost:4200', 
    credentials: true,
}));

app.use(express.json());
app.use('/api', routes);

export default app;