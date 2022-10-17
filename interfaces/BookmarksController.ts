import {Request, Response} from "express";

export default interface BookmarksController{

    bookmarkTuit(req: Request, res: Response): void;

    unbookmarkTuit(req: Request, res: Response): void;

    findAllBookmarks(req: Request, res: Response): void;

}