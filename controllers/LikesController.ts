import {Express, Request, Response} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikesDao from "../daos/LikesDao";
import LikesControllerI from "../interfaces/LikesController";
import Likes from "../models/Likes";

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
        }
        return LikesController.likesController;
    }

    private constructor() {}

    findUsersThatLikedTuit = (req: Request, res: Response) =>
        LikesController.likesDao.findUsersThatLikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    findTuitsUserLiked = (req: Request, res: Response) =>
        LikesController.likesDao.findTuitsUserLiked(req.params.uid)
            .then(likes => res.json(likes));


    userLikesTuit = (req: Request, res: Response) =>
        LikesController.likesDao.userLikesTuit(req.params.uid, req.params.tid)
            .then(likes => res.json(likes));


    userUnlikesTuit = (req: Request, res: Response) =>
        LikesController.likesDao.userUnlikesTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));
    
    findTuitLikesCount = (req: Request, res: Response) =>
        LikesController.likesDao.findTuitLikesCount()
    
};