/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarksModel
 * to integrate with MongoDB
 */
import BookmarksModel from "../mongoose/BookmarksModel";
import Bookmarks from "../models/Bookmarks";
import BookmarksDaoI from "../interfaces/BookmarksDao";

/**
 * @class BookmarksDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarksDao} bookmarksDao Private single instance of BookmarksDao
 */
export default class BookmarksDao implements BookmarksDaoI{
    private static bookmarksDao: BookmarksDao | null = null;
    public static getInstance = (): BookmarksDao => {
        if(BookmarksDao.bookmarksDao === null) {
            BookmarksDao.bookmarksDao = new BookmarksDao();
        }
        return BookmarksDao.bookmarksDao;
    }
    private constructor() {}

    /**
     * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
     * @param {string} uid User id for which bookmarks are to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks = async (uid: string): Promise<Bookmarks[]> =>
        BookmarksModel.find({bookmarkedBy:uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Uses BookmarksModel to create a new Bookmark for a user for specified tuit.
     * @param {string} uid User id who wants to bookmark a tuit
     * @param {string} tid Tuit id of tuit to be bookmarked
     * @returns Promise To be notified when the bookmarks are added to
     * database
     */
    bookmarkTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.create({bookmarkedTuit:tid,bookmarkedBy:uid});

    /**
     * Uses BookmarksModel to delete a Bookmark for tuit.
     * @param {string} uid User id of user who unbookmark the tuit
     * @param {string} tid Tuit id of tuit to be unbookmark
     * @returns Promise To be notified when the bookmarks are deleted from
     * database
     */     
    unbookmarkTuit = async (tid: string, uid: string): Promise<any> =>
        BookmarksModel.deleteOne({bookmarkedTuit:tid,bookmarkedBy:uid});
}