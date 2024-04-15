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
    origin: process.env.FRONT_PATH,
    credentials: true
}))

let allowlist = process.env.FRONT_PATH.split(",");
const corsOptions = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = {
            origin: true
        }
    } else {
        corsOptions = {
            origin: false
        }
    }
    callback(null, corsOptions)
}

app.use(cors(corsOptions));
app.use('/', routes);
app.use('/auth', landingPageRoutes);

Connection();
const PORT = 8000;
app.listen(PORT, () => {});