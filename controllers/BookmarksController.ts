import {Express, Request,Response} from "express";
import BookmarksControllerI from "../interfaces/BookmarksController";
import BookmarksDao from "../daos/BookmarksDao";

export default class BookmarksController implements BookmarksControllerI{
    private static bookmarksDao:BookmarksDao=BookmarksDao.getInstance();
    private static bookmarksController:BookmarksController|null=null;

    public static getInstance = (app: Express): BookmarksController => {
        if(BookmarksController.bookmarksController === null) {
            BookmarksController.bookmarksController = new BookmarksController();
            app.get("/users/:uid/bookmarks", BookmarksController.bookmarksController.findAllBookmarks);
            app.post("/users/:uid/bookmarks/:tid", BookmarksController.bookmarksController.bookmarkTuit);
            app.delete("/users/:uid/unbookmarks/:tid", BookmarksController.bookmarksController.unbookmarkTuit);
        }
        return BookmarksController.bookmarksController;
    }

    private constructor() {}

    findAllBookmarks = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.findAllBookmarks(req.params.uid)
            .then(bookmarks=>res.json(bookmarks));


    bookmarkTuit = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.bookmarkTuit(req.params.tid,req.params.uid)
            .then(bookmarks=>res.json(bookmarks));

    unbookmarkTuit = (req: Request, res: Response)=>
        BookmarksController.bookmarksDao.unbookmarkTuit(req.params.tid,req.params.uid)
            .then(status=>res.send(status));
    
}