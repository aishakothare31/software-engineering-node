/**
 * @file Follows Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import FollowsDao from "../daos/FollowsDao";
import FollowsControllerI from "../interfaces/FollowsController";

/**
 * @class FollowsController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/following :retrieve users followed by a user
 *     </li>
 *     <li>GET /users/:uid/followedby :retrieve users that follow a user
 *     </li>
 *     <li>POST /users/:uid_cur/follows/:uid :record a user following another user
 *     </li>
 *     <li>DELETE /users/:uid/unfollows/:tid :record a user unfollowing another user
 *     /li>
 * </ul>
 * @property {FollowsDao} followsDao Singleton DAO implementing likes CRUD operations
 * @property {FollowsController} followsController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowsController implements FollowsControllerI {
  private static followsDao: FollowsDao = FollowsDao.getInstance();
  private static followsController: FollowsController | null = null;

  public static getInstance = (app: Express): FollowsController => {
    if (FollowsController.followsController === null) {
      FollowsController.followsController = new FollowsController();
      app.get("/users/:uid/following", FollowsController.followsController.findAllFollowed);
      app.get("/users/:uid/followedby", FollowsController.followsController.findAllFollowing);
      app.post("/users/:uid_cur/follows/:uid", FollowsController.followsController.follow);
      app.delete("/users/:uid_cur/unfollows/:uid", FollowsController.followsController.unfollow);
    }
    return FollowsController.followsController;
  }

  /**
   * Adds a follow relation between two users
   * @param {Request} req Represents client request: includes the
   * path parameters uid_cur and uid representing one user following another user.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON containing the new follow that was inserted in the
   * database
  */
  follow = (req: Request, res: Response) =>
      FollowsController.followsDao.follow(req.params.uid_cur, req.params.uid)
      .then(follows => res.json(follows));
      
  /**
   * Removes the follow relation between two users.
   * @param {Request} req Represents client request: includes the
   * path parameters uid_cur and uid representing the one user unfollowing another user.
   * @param {Response} res Represents response to client, including status
   * on whether unfollow was successful or not
   */
  unfollow = (req: Request, res: Response) =>
      FollowsController.followsDao.unfollow(req.params.uid_cur, req.params.uid)
      .then(status => res.send(status));

  /**
   * Retrieves all users that follow the user specified
   * @param {Request} req Represents client request: includes the path
   * parameter uid representing the user for which all users who are following them 
   * is to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the users objects that are following the user
   */
  findAllFollowed = (req: Request, res: Response) =>
      FollowsController.followsDao.findAllFollowers(req.params.uid)
      .then(following => res.json(following));

      
  /**
   * Retrieves all users that the user follows
   * @param {Request} req Represents client request: includes the path
   * parameter uid representing the user for which all users they follow is to be retrieved
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the users objects that are followed by the user
   */
  findAllFollowing = (req: Request, res: Response) =>
      FollowsController.followsDao.findAllFollowing(req.params.uid)
      .then(followedby => res.json(followedby));


}