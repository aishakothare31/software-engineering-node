/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import Likes from "../models/Likes";
import LikesModel from "../mongoose/LikesModel";
import LikesDaoI from "../interfaces/LikesDao";
import User from "../models/User";
import TuitModel from "../mongoose/TuitModel";
import  Stats  from "../models/Stats";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikesDao implements LikesDaoI {
    
    private static likesDao: LikesDao | null = null;
    public static getInstance = (): LikesDao => {
        if(LikesDao.likesDao === null) {
            LikesDao.likesDao = new LikesDao();
        }
        return LikesDao.likesDao;
    }

     /**
   * Uses LikeModel to retrieve all liked tuits by a user from likes collection
   * @param {string} uid User id for which likes are to be retrieved
   * @returns Promise To be notified when the likes are retrieved from
   * database
   */
    findTuitsUserLiked = async (uid: string): Promise<Likes[]> =>
        // LikesModel
        //     .find({user: uid})
        //     .populate("likedTuit")
        //     .exec(); 
        LikesModel
            .find({likedBy: uid})
            .populate({
            path: "likedTuit",
            populate: {
                path: "postedBy"
            }
            })
            .exec();

    /**
   * Uses LikeModel to retrieve all likes from likes collection
   * @param {string} tid Tuit id of tuit who likes the tuit
   * @returns Promise To be notified when the likes are retrieved from
   * database
   */
    findUsersThatLikedTuit = async (tid: string): Promise<Likes[]> =>
        LikesModel
            .find({likedTuit: tid})
            .populate("likedBy")
            .exec();

    /**
   * Uses LikeModel to create a new like for tuit.
   * @param {string} uid User id of user who likes the tuit
   * @param {string} tid Tuit id of tuit to be liked
   * @returns Promise To be notified when the likes are retrieved from
   * database
   */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikesModel.create({likedTuit: tid, likedBy: uid});

    /**
   * Uses LikeModel to remove a  like for tuit.
   * @param {string} uid User id of user who unlikes the tuit
   * @param {string} tid Tuit id of tuit to be unliked
   * @returns Promise To be notified when the likes are deleted from
   * database
   */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikesModel.deleteOne({likedTuit: tid, likedBy: uid});

/**
   * Uses LikeModel to count number of likes a tuit has.
   * @param {string} tid Tuit id of tuit to be unliked
   * @returns Promise To be notified with the total likes on specific tuit.
   */
    findTuitLikesCount = async (tid: string): Promise<any> => 
    LikesModel.countDocuments({likedTuit: tid});

    findUserLikesTuit = async (uid: string, tid:string) =>
    LikesModel.findOne(
      {likedTuit: tid, likedBy: uid});

    
    findAllTuitsLikedByUser = async (uid: string) =>
        LikesModel
            .find({likedBy: uid})
            .populate({
            path: "likedTuit",
            populate: {
                path: "postedBy"
            }
            })
            .exec();


    
}
