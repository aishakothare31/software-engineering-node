import {Request, Response} from "express";

export default interface LikesController {
    findTuitsUserLiked(req: Request, res: Response): void;
    findUsersThatLikedTuit(req: Request, res: Response): void;
    findTuitLikesCount(req: Request, res: Response): void;
    userLikesTuit(req: Request, res: Response): void;
    userUnlikesTuit(req: Request, res: Response): void;
 }