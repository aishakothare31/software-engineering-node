
/**
 * @file Declares API for Likes related data access object methods
 */
import Likes from "../models/Likes";

/**
 * @interface LikeDao An interface for Likes access objects for likes on Tuiter.
 *
 */
export default interface LikesDao {
    /**
     * Uses LikeModel to retrieve all likes from likes collection
     * @param {string} tid Tuit id for which likes are to be retrieved
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findTuitsUserLiked(uid: string): Promise<Likes[]>;

    /**
     * Uses LikeModel to retrieve all likes from likes collection
     * @param {string} uid Userids of users who liked the tuit
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findUsersThatLikedTuit(tid: string): Promise<Likes[]>;

    /**
     * Uses LikeModel to count likes on a tuit.
     * @returns Promise To be notified with the likes count.
     */
    findTuitLikesCount(tid: string): void;

    /**
     * Uses LikeModel to create a new like for tuit.
     * @param {string} uid User id of user who likes the tuit
     * @param {string} tid Tuit id of tuit to be liked
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    userLikesTuit(tid: string, uid: string): Promise<Likes>;
    
    /**
     * Uses LikeModel to remove a  like for tuit.
     * @param {string} uid User id of user who unliked the tuit
     * @param {string} tid Tuit id of tuit to be unliked
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
 }