import {Request, Response, Express} from "express";
import { Session } from "inspector";
import UserDao from "../daos/UserDao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

const AuthenticationController = (app: Express) => {

  const userDao: UserDao = UserDao.getInstance()

  const signup = async (req: Request, res: Response) => {
    const newUser = req.body;
    // console.log("new user body",newUser)
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    const existingUser = await userDao.findUsersByUsername(req.body.username);
    // console.log("exist user body",existingUser)
    if (existingUser) {
      res.sendStatus(403);
      return;
    } else {
      const insertedUser = await userDao.createUser(newUser);
      // console.log("inserted user body",insertedUser)
      insertedUser.password = '';
      // console.log("inserted user body after pass",insertedUser)
      //@ts-ignore
      req.session['profile'] = insertedUser;
      res.json(insertedUser);
    }
  }

  const profile = (req: Request, res: Response) => {
    //@ts-ignore
    const profile = req.session['profile'];
    if (profile) {
      profile.password = "";
      res.json(profile);
    } else {
      res.sendStatus(403);
    }
  }

  const logout = (req: Request, res: Response) => {
    //@ts-ignore
    req.session.destroy();
    res.sendStatus(200);
  }

  const login = async (req: Request, res: Response) => {
    const user = req.body;
    console.log("user",user)
    const username = user.username;
    const password = user.password;
    const existingUser = await userDao
    .findUsersByUsername(username);
    console.log("exist user",existingUser)
    if (!existingUser) {
      res.sendStatus(403);
      return;
    }

    const match = await bcrypt
    .compare(password, existingUser.password);

    if (match) {
      existingUser.password = '*****';
      //@ts-ignore
      req.session['profile'] = existingUser;
      res.json(existingUser);
    } else {
      res.sendStatus(403);
    }
  };

  app.post("/auth/login", login);
  app.post("/auth/profile", profile);
  app.post("/auth/logout", logout);
  app.post("/auth/signup", signup);
}

export default AuthenticationController;