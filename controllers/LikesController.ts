/**
 * @file Likes Controller RESTful Web service API for likes resource
 */
import { count } from "console";
import {Express, Request, Response} from "express";
import LikesDao from "../daos/LikesDao";
import LikesControllerI from "../interfaces/LikesController";
import Likes from "../models/Likes";

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
    private static likesController: LikesController | null = null;

    public static getInstance = (app: Express): LikesController => {
        if(LikesController.likesController === null) {
            LikesController.likesController = new LikesController();
            app.get("/users/:uid/likes", LikesController.likesController.findTuitsUserLiked);
            app.get("/tuits/:tid/likes", LikesController.likesController.findUsersThatLikedTuit);
            app.post("/users/:uid/likes/:tid", LikesController.likesController.userLikesTuit);
            app.delete("/users/:uid/unlikes/:tid", LikesController.likesController.userUnlikesTuit);
            app.get("/tuits/:tid/likes/count", LikesController.likesController.findTuitLikesCount);
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
    findTuitsUserLiked = (req: Request, res: Response) =>
        LikesController.likesDao.findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));

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
    
};