/**
 * @file Bookmarks DAO Interface for RESTful Web service API bookmarks resource
 */
import Bookmarks from "../models/Bookmarks";

/**
 * @interface BookmarksDao An interface for data access objects of Bookmarks on Tuiter.
 *
 */
export default interface BookmarksDao{

    /**
     * Uses BookmarksModel to create a new Bookmark for a user on specific tuit.
     * @param {string} uid User id who wants to bookmark a tuit
     * @param {string} tid Tuit id of tuit to be bookmarked
     * @returns Promise To be notified when the bookmarks are added to
     * database
     */
    bookmarkTuit(tid:string, uid:string):Promise<any>;

    /**
     * Uses BookmarksModel to remove a Bookmark for tuit.
     * @param {string} uid User id of user who unbookmarks the tuit
     * @param {string} tid Tuit id of tuit to be unbookmark
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    unbookmarkTuit(tid:string, uid:string):Promise<Bookmarks>;

    /**
     * Uses BookmarksModel to retrieve all bookmarks from bookmarks collection
     * @param {string} uid User id for which bookmarks are to be retrieved
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllBookmarks(uid:string):Promise<Bookmarks[]>;

}