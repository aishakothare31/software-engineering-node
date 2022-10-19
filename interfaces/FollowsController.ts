/**
 * @file FollowsController interface RESTful Web service API for Follows resource
 */
import {Request, Response} from "express";
/**
 * @interface FollowsController An interface for Follows on Tuiter.
 *
 */

export default interface FollowsController{
    /**
     * Adds a follow relation between two users
     * @param {Request} req Represents client request: includes the
     * path parameters uid_cur and uid representing one user following another user.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    follow(req: Request, res: Response): void;

    /**
     * Removes the follow relation between two users.
     * @param {Request} req Represents client request: includes the
     * path parameters uid_cur and uid representing the one user unfollowing another user.
     * @param {Response} res Represents response to client, including status
     * on whether unfollow was successful or not
     */
    unfollow(req: Request, res: Response): void;

    /**
     * Retrieves all users that follow the user specified
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user for which all users who are following them 
     * is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the users objects that are following the user
     */
    findAllFollowed(req:Request, res:Response):void;

    /**
     * Retrieves all users that the user follows
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user for which all users they follow is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the users objects that are followed by the user
     */
    findAllFollowing(req: Request, res: Response): void;

}