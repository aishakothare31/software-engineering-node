/**
 * @file Dislikes Controller RESTful Web service API for Dislikes resource
 */
 import { count } from "console";
 import {Express, Request, Response} from "express";
 import DislikesDao from "../daos/DislikesDao";
 import DislikesControllerI from "../interfaces/DislikesController";
 import LikesController from "./LikesController";
 import LikesDao from "../daos/LikesDao";
 import TuitDao from "../daos/TuitDao";
 import Dislikes from "../models/Dislikes";
 import Tuits from "../models/Tuit"
 
 /**
  * @class DislikesController Implements RESTful Web service API for Dislikes resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>GET /users/:uid/Dislikes :retrieve all tuits Disliked by a user
  *     </li>
  *     <li>GET /tuits/:tid/Dislikes :retrieve all users that Disliked a tuit
  *     </li>
  *     <li>POST /users/:uid/Dislikes/:tid :record that a user Dislikes a tuit
  *     </li>
  *     <li>DELETE /users/:uid/unDislikes/:tid :record that a user unDisliked tuit</li>
  *     <li> GET /tuits/:tid/Dislikes/count :retrieve total number of Dislikes on a tuit </li>
  * </ul>
  * @property {DislikeDao} DislikeDao Singleton DAO implementing Dislikes CRUD operations
  * @property {DislikeController} DislikeController Singleton controller implementing
  * RESTful Web service API
  */
 export default class DislikesController implements DislikesControllerI {
     private static DislikesDao: DislikesDao = DislikesDao.getInstance();
     private static tuitDao: TuitDao = TuitDao.getInstance();
     private static DislikesController: DislikesController | null = null;
    //  private static LikesController: LikesController | null = null;
    private static likesDao: LikesDao = LikesDao.getInstance();
 
     public static getInstance = (app: Express): DislikesController => {
         if(DislikesController.DislikesController === null) {
             DislikesController.DislikesController = new DislikesController();
             app.get("/users/:uid/dislikes", DislikesController.DislikesController.findTuitsUserDisliked);
             app.get("/tuits/:tid/dislikes", DislikesController.DislikesController.findUsersThatDislikedTuit);
             app.post("/users/:uid/dislikes/:tid", DislikesController.DislikesController.userDislikesTuit);
             app.delete("/users/:uid/undislikes/:tid", DislikesController.DislikesController.userUndislikesTuit);
             app.get("/tuits/:tid/dislikes/count", DislikesController.DislikesController.findTuitDislikesCount);
             app.put("/users/:uid/dislikes/:tid", DislikesController.DislikesController.userTogglesTuitDislikes);
            //  app.get("/user/:uid/dislikes", DislikesController.DislikesController.findAllTuitsDislikedByUser);
         }
         return DislikesController.DislikesController;
     }
 
     private constructor() {}
 
     /**
      * Retrieves all users that Disliked a tuit from the database
      * @param {Request} req Represents client request: includes the path
      * parameter tid representing the tuit id of Disliked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findUsersThatDislikedTuit = (req: Request, res: Response) =>
         DislikesController.DislikesDao.findUsersThatDislikedTuit(req.params.tid)
             .then(dislikes => res.json(dislikes));
 
     /**
      * Retrieves all tuits Disliked by a user from the database
      * @param {Request} req Represents client request: includes the path
      * parameter uid representing the users that Disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were Disliked
      */
     findTuitsUserDisliked = (req: Request, res: Response) =>
        //  DislikesController.DislikesDao.findTuitsUserDisliked(req.params.uid)
        //      .then(dislikes => res.json(dislikes));
        {
            const uid = req.params.uid;
            //@ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                profile._id : uid;
            // console.log("in findall tuits method", userId)
            DislikesController.DislikesDao.findTuitsUserDisliked(userId)
                .then(dislikes => {
                const dislikesNonNullTuits =
                    dislikes.filter(dislike => dislike.dislikedTuit);
                const tuitsFromDislikes =
                    dislikesNonNullTuits.map(dislike => dislike.dislikedTuit);
                res.json(tuitsFromDislikes);
                });
               
            }
 
     /** 
      * Increments the Dislikes count on a tuit.
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userDislikesTuit = (req: Request, res: Response) => {
        DislikesController.DislikesDao.userDislikesTuit(req.params.uid, req.params.tid)
             .then(dislikes => res.json(dislikes));
        
     }
 

     /**
      * Decrements the Dislikes count on a tuit
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userUndislikesTuit = (req: Request, res: Response) =>
         DislikesController.DislikesDao.userUndislikesTuit(req.params.uid, req.params.tid)
             .then(status => res.send(status));
 
     /**
      * Get the count of Dislikes on  a tuit.
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, includes the total count.
      */
     findTuitDislikesCount = (req: Request, res: Response) =>
         DislikesController.DislikesDao.findTuitDislikesCount(req.params.tid)
             .then(dislikes => res.json(dislikes));
     
     
     userTogglesTuitDislikes = async (req: Request, res: Response) => {
            const uid = req.params.uid;
            const tid = req.params.tid;
            //@ts-ignore
            const profile = req.session['profile'];
            const userId = uid === "me" && profile ?
                    profile._id : uid;
            try {
                const userAlreadyDislikedTuit = await DislikesController.DislikesDao
                    .findUserDislikesTuit(userId, tid);
                const userAlreadyLikedTuit = await DislikesController.likesDao
                .findUserLikesTuit(userId, tid);
                const howManyDislikedTuit = await DislikesController.DislikesDao
                    .findTuitDislikesCount(tid);
                const howManyLikedTuit = await DislikesController.likesDao
                .findTuitLikesCount(tid);
                let tuit = await DislikesController.tuitDao.findTuitById(tid);
                if (userAlreadyDislikedTuit) {
                await DislikesController.DislikesDao.userUndislikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit - 1;
                } else {
                await DislikesController.DislikesDao.userDislikesTuit(userId, tid);
                if (userAlreadyLikedTuit && howManyLikedTuit>0){
                    tuit.stats.likes = howManyLikedTuit -1;
                }
                await DislikesController.likesDao.userUnlikesTuit(userId, tid);
                tuit.stats.dislikes = howManyDislikedTuit + 1;
                };
                
                await DislikesController.tuitDao.updateDislikes(tid, tuit.stats);
                console.log("dislike toggle",tuit.stats)
                res.sendStatus(200);
            } catch (e) {
                res.sendStatus(404);
            }
        }

        // findAllTuitsDislikedByUser = (req: Request, res:Response) => {
        //     const uid = req.params.uid;
        //     //@ts-ignore
        //     const profile = req.session['profile'];
        //     const userId = uid === "me" && profile ?
        //         profile._id : uid;
        //     console.log("in findall tuits method", userId)
        //     DislikesController.DislikesDao.findAllTuitsDislikedByUser(userId)
        //         .then(dislikes => {
        //         const dislikesNonNullTuits =
        //             dislikes.filter(dislike => dislike.tuit);
        //         const tuitsFromDislikes =
        //             dislikesNonNullTuits.map(dislike => dislike.tuit);
        //         res.json(tuitsFromDislikes);
        //         });
               
        //     }
               
               
 };