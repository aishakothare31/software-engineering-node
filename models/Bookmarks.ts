import Tuit from "./Tuit"
import User from "./User"

export default class Bookmarks {
    private bookmarkedTuit:Tuit | null = null
    private bookmarkedBy: User | null = null
};