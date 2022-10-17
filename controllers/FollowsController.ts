import {Express, Request, Response} from "express";
import FollowsDao from "../daos/FollowsDao";
import FollowsControllerI from "../interfaces/FollowsController";

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

  follow = (req: Request, res: Response) =>
      FollowsController.followsDao.follow(req.params.uid_cur, req.params.uid)
      .then(follows => res.json(follows));

  unfollow = (req: Request, res: Response) =>
      FollowsController.followsDao.unfollow(req.params.uid_cur, req.params.uid)
      .then(status => res.send(status));

  findAllFollowed = (req: Request, res: Response) =>
      FollowsController.followsDao.findAllFollowers(req.params.uid)
      .then(following => res.json(following));

  findAllFollowing = (req: Request, res: Response) =>
      FollowsController.followsDao.findAllFollowing(req.params.uid)
      .then(followedby => res.json(followedby));


}