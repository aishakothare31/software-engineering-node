/**
 * @file Implements an Express Node HTTP server.
 */
import express, {Request, Response} from 'express';
import mongoose from "mongoose";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import UserDao from "./daos/UserDao";
import TuitDao from "./daos/TuitDao";
import FollowsController from "./controllers/FollowsController";
import LikesController from "./controllers/LikesController";
import DislikesController from "./controllers/DislikesController"
import MessagesController from './controllers/MessagesController';
import BookmarksController from './controllers/BookmarksController';
import AuthenticationController from './controllers/auth-controller';
import FollowsDao from "./daos/FollowsDao";
import LikesDao from "./daos/LikesDao";
import MessagesDao from "./daos/MessagesDao"
import User from './models/User';
import session from "express-session";


// mongoose.connect('mongodb://localhost:27017/Tuiter');
const userName = 'aishak31';
const password = 'aishak31!';
const url = `mongodb+srv://${userName}:${password}@cluster0.f6urgn7.mongodb.net/Tuiter?retryWrites=true&w=majority`;
mongoose.connect(url)
const cors = require('cors')
const app = express();
console.log("my pass",process.env.PASSWORD)
//app.use(cors());
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

// app.use(express.json());
let sess = {
    secret: 'process.env.SECRET',
    cookie: {
        secure: false
    }
 }
 if (process.env.ENV === 'PRODUCTION') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
 }

 app.use(cors(corsOptions));
 app.use(session(sess));
 app.use(express.json());
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
AuthenticationController(app);
FollowsController.getInstance(app);
LikesController.getInstance(app);
DislikesController.getInstance(app);
BookmarksController.getInstance(app);
MessagesController.getInstance(app);
app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));
// let sess = {
//     secret: 'process.env.EXPRESS_SESSION_SECRET',
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//       sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax',
//       secure: process.env.NODE_ENV === "production",
//       // secure: false
//     }
//   }


// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
