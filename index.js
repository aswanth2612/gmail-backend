import express from 'express';
import Connection from './database/db.js';
import routes from './routes/route.js';
import landingPageRoutes from './routes/landingPageRouter.js';
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
    origin: [process.env.FRONT_PATH],
    credentials: true
}))

app.use('/login', cors({
    origin: process.env.FRONT_PATH,
}), landingPageRoutes);
app.use('/signup', cors({
    origin: process.env.FRONT_PATH,
}), landingPageRoutes);
app.use('/forgot-password', cors({
    origin: process.env.FRONT_PATH,
}), landingPageRoutes);

const corsOptions = {
    origin: process.env.FRONT_PATH,
    credentials: true
};
app.use('/logout', cors(corsOptions), landingPageRoutes);
app.use('/verify', cors(corsOptions), landingPageRoutes);
app.use('/', cors(corsOptions), routes);



const PORT = 8000;

Connection();

app.listen(PORT, () => {});