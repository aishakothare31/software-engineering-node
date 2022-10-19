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
import MessagesController from './controllers/MessagesController';
import BookmarksController from './controllers/BookmarksController';
import FollowsDao from "./daos/FollowsDao";
import LikesDao from "./daos/LikesDao";
import MessagesDao from "./daos/MessagesDao"


mongoose.connect('mongodb://localhost:27017/Tuiter');
// const userName = process.env.USERNAME;
// const password = process.env.PASSWORD;
// const url = `mongodb+srv://${userName}:${password}@cluster0.f6urgn7.mongodb.net/Tuiter?retryWrites=true&w=majority`;
// mongoose.connect(url)
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
const userController = new UserController(app, new UserDao());
const tuitController = new TuitController(app, new TuitDao());
FollowsController.getInstance(app);
LikesController.getInstance(app);
BookmarksController.getInstance(app);
MessagesController.getInstance(app);
app.get('/', (req: Request, res: Response) =>
    res.send('Welcome to Foundation of Software Engineering!!!!'));

// app.get('/hello', (req: Request, res: Response) =>
//     res.send('Welcome to Foundation of Software Engineering!'));

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
