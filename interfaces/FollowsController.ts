import {Request, Response} from "express";

export default interface FollowsControllerI{

    follow(req: Request, res: Response): void;

    unfollow(req: Request, res: Response): void;

    findAllFollowed(req:Request, res:Response):void;

    findAllFollowing(req: Request, res: Response): void;

}