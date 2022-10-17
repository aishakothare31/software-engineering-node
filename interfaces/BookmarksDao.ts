import Bookmarks from "../models/Bookmarks";

export default interface BookmarksDao{

    bookmarkTuit(tid:string, uid:string):Promise<any>;
 
    unbookmarkTuit(tid:string, uid:string):Promise<Bookmarks>;

    findAllBookmarks(uid:string):Promise<Bookmarks[]>;

}