import express from 'express';
import Connection from './database/db.js';
import routes from './routes/route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    extended: true
}));
app.use(cookieParser({
    orgin: ["http://localhost:5173"],
    credentials: true
}))
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};
app.use(cors(corsOptions));

app.use('/', routes);


const PORT = 8000;

Connection();

app.listen(PORT, () => {});