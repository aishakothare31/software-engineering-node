import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";
import BookmarksDaoI from "../interfaces/BookmarksDao";

export default class BookmarksDao implements BookmarksDaoI{
    private static bookmarksDao: BookmarksDao | null = null;
    public static getInstance = (): BookmarksDao => {
        if(BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }
    private constructor() {}

    findAllBookmarks = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({bookmarkedBy:uid})
            .populate("bookmarkedTuit")
            .exec();

    bookmarkTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({bookmarkedTuit:tid,bookmarkedBy:uid});

        
    unbookmarkTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({bookmarkedTuit:tid,bookmarkedBy:uid});
}