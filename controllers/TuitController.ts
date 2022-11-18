/**
 * @file Tuti Controller RESTful Web service API for tuits resource
 */
import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Session } from "inspector";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";
import Tuit from "../models/Tuit";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /tuits :create a new tuit instance for
 *     a given user</li>
 *     <li>GET /tuits :retrieve tuits instances</li>
 *     <li>GET /tuits/:tid :retrieve specified tuit instances</li>
 *     <li>GET /users/:userid/tuits :retrieve tuits for a given user </li>
 *     <li>PUT /tuits/:tid :modify individual tuit instance </li>
 *     <li>DELETE /tuits/:tid :remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class TuitController implements TuitControllerI{
    app: Express;
    tuitDao: TuitDao;
    constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        app.get("/tuits", this.findAllTuits);
        app.get("/users/:userid/tuits", this.findTuitsByUser);
        app.get("/tuits/:tid", this.findTuitById);
        app.post("/tuits", this.createTuit);
        app.put("/tuits/:tid", this.updateTuit);
        app.delete("/tuits/:tid", this.deleteTuit);
        app.post("/users/:uid/tuits",this.createTuitByUser);
    }

     /**
   * Retrieves all tuits from the database and returns an array of tuits.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents client response: body formatted as JSON array 
   * contains the tuit objects.
   */
    findAllTuits = (_req: Request, res: Response) =>
      this.tuitDao.findAllTuits()
      .then(tuits => res.json(tuits));

    /**
   * Retrieves tuit from the database based on the tuit id match.
   * @param {Request} req Represents client request: includes path
   * parameter tid - tuit's primary key for tuit retrival. 
   * @param {Response} res Represents response to client: includes the
   * body formatted as JSON and the tuit matching the uid.
   */
    findTuitById = (req: Request, res: Response) =>
      this.tuitDao.findTuitById(req.params.tid)
      .then(tuit => res.json(tuit));

    /**
   * Retrieves tuits for a particular user and returns
   * array of tuits.
   * @param {Request} req Represents client request
   * @param {Response} res Represents response to client: includes the
   * body formatted as JSON array containing tuit objects.
   */
    findTuitsByUser = (req: Request, res: Response) => {

      // console.log("in find user",req.params.userid)
      let userId = req.params.userid === "me" && 
      // @ts-ignore
            req.session['profile'] ?
            // @ts-ignore
            req.session['profile']._id : req.params.userid;
            console.log(userId)
        if (userId == "me") {
            res.sendStatus(403);
          }
        else {
      this.tuitDao.findTuitsByUser(userId)
      .then((tuits: Tuit[]) => res.json(tuits));
        }
    } 
    /**
     * Inserts a new tuit instance in the tuits collection.
   * @param {Request} req Represents request from client, including body
   * containing the JSON object for the new tuit to be inserted in the
   * database
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new tuit that was inserted in the
   * database
   */
    createTuit = (req: Request, res: Response) => {
  
      this.tuitDao.createTuit(req.body)
      .then((tuit: Tuit) => res.json(tuit));
    }
          
  /**
   * Removes tuit from the database.
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be removed
   * @param {Response} res Represents response to client, including status
   * on whether deleting a user was successful or not
   */
    deleteTuit = (req: Request, res: Response) =>
      this.tuitDao.deleteTuit(req.params.tid)
      .then(status => res.json(status));

    /**
   * Updates tuit with new values in database.
   * @param {Request} req Represents request from client, including path
   * parameter tid identifying the primary key of the tuit to be modified
   * @param {Response} res Represents response to client, including status
   * on whether updating a tuit was successful or not
   */
    updateTuit = (req: Request, res: Response) =>
      this.tuitDao.updateTuit(req.params.tid, req.body)
      .then(status => res.json(status));

    createTuitByUser = (req: Request, res: Response) =>
    {
      let uid = req.params.uid === "me"
      //@ts-ignore
            && req.session['profile'] ?
      //@ts-ignore
            req.session['profile']._id :
            req.params.uid;

      this.tuitDao.createTuitByUser(uid,req.body)
      .then((tuit: Tuit) => res.json(tuit));
    }    
}