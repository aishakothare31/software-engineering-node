/**
 * @file Likes Controller RESTful Web service API for likes resource
 */
import { count } from "console";
import {Express, Request, Response} from "express";
import LikesDao from "../daos/LikesDao";
import LikesControllerI from "../interfaces/LikesController";
import TuitDao from "../daos/TuitDao";
import DislikesDao from "../daos/DislikesDao";
import Likes from "../models/Likes";
import Tuits from "../models/Tuit"

/**
 * @class LikesController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/likes :retrieve all tuits liked by a user
 *     </li>
 *     <li>GET /tuits/:tid/likes :retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /users/:uid/likes/:tid :record that a user likes a tuit
 *     </li>
 *     <li>DELETE /users/:uid/unlikes/:tid :record that a user unliked tuit</li>
 *     <li> GET /tuits/:tid/likes/count :retrieve total number of likes on a tuit </li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class LikesController implements LikesControllerI {
    private static likesDao: LikesDao = LikesDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static likesController: LikesController | null = null;
    private static dislikesDao: DislikesDao = DislikesDao.getInstance();

    public static getInstance = (app: Express): LikesController => {
        if(LikesController.likesController === null) {
            LikesController.likesController = new LikesController();
            app.get("/users/:uid/likes", LikesController.likesController.findTuitsUserLiked);
            app.get("/tuits/:tid/likes", LikesController.likesController.findUsersThatLikedTuit);
            app.post("/users/:uid/likes/:tid", LikesController.likesController.userLikesTuit);
            app.delete("/users/:uid/unlikes/:tid", LikesController.likesController.userUnlikesTuit);
            app.get("/tuits/:tid/likes/count", LikesController.likesController.findTuitLikesCount);
            app.put("/users/:uid/likes/:tid", LikesController.likesController.userTogglesTuitLikes);
            // app.get("/user/:uid/likes", LikesController.likesController.findAllTuitsLikedByUser);

        }
        return LikesController.likesController;
    }

    private constructor() {}

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents client request: includes the path
     * parameter tid representing the tuit id of liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikesController.likesDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the users that liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findTuitsUserLiked = (req: Request, res: Response) =>{
    
        // LikesController.likesDao.findTuitsUserLiked(req.params.uid)
        //     .then(likes => res.json(likes));
        const uid = req.params.uid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        
        LikesController.likesDao.findTuitsUserLiked(userId)
            .then(likes => {
            const likesNonNullTuits =
                likes.filter(like => like.likedTuit);
            const tuitsFromLikes =
                likesNonNullTuits.map(like => like.likedTuit);
            res.json(tuitsFromLikes);
            });


    }
    /** 
     * Increments the likes count on a tuit.
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit = (req: Request, res: Response) =>
        LikesController.likesDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));


    

    /**
     * Decrements the likes count on a tuit
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userUnlikesTuit = (req: Request, res: Response) =>
        LikesController.likesDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Get the count of likes on  a tuit.
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, includes the total count.
     */
    findTuitLikesCount = (req: Request, res: Response) =>
        LikesController.likesDao.findTuitLikesCount(req.params.tid)
            .then(likes => res.json(likes));
    
    
    userTogglesTuitLikes = async (req: Request, res: Response) => {
        const uid = req.params.uid;
        const tid = req.params.tid;
        //@ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
                profile._id : uid;
        try {
            const userAlreadyLikedTuit = await LikesController.likesDao
                .findUserLikesTuit(userId, tid);
            const userAlreadyDislikedTuit = await LikesController.dislikesDao
                .findUserDislikesTuit(userId, tid);
            const howManyLikedTuit = await LikesController.likesDao
                .findTuitLikesCount(tid);
            const howManyDislikedTuit = await LikesController.dislikesDao
                .findTuitDislikesCount(tid);
            let tuit = await LikesController.tuitDao.findTuitById(tid);
            if (userAlreadyLikedTuit) {
            await LikesController.likesDao.userUnlikesTuit(userId, tid);
            tuit.stats.likes = howManyLikedTuit - 1;
            } else {
            await LikesController.likesDao.userLikesTuit(userId, tid);
            if (userAlreadyDislikedTuit && howManyDislikedTuit>0){
                tuit.stats.dislikes = howManyDislikedTuit -1
            }
            tuit.stats.likes = howManyLikedTuit + 1;
            };
            await LikesController.tuitDao.updateLikes(tid, tuit.stats);
            console.log("like toggle",tuit.stats)
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
        }
    
    // findAllTuitsLikedByUser = (req: Request, res:Response) => {
    //     const uid = req.params.uid;
    //     //@ts-ignore
    //     const profile = req.session['profile'];
    //     const userId = uid === "me" && profile ?
    //         profile._id : uid;
        
    //     LikesController.likesDao.findAllTuitsLikedByUser(userId)
    //         .then(likes => {
    //         const likesNonNullTuits =
    //             likes.filter(like => like.tuit);
    //         const tuitsFromLikes =
    //             likesNonNullTuits.map(like => like.tuit);
    //         res.json(tuitsFromLikes);
    //         });
    //     }
        
        
          
          
              
};