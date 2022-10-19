/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowsModel
 * to integrate with MongoDB
 */
import FollowsModel from "../mongoose/FollowsModel";
import FollowsDaoI from "../interfaces/FollowsDao";
import Follows from "../models/Follows";

/**
 * @class FollowsDao Implements Data Access Object managing data storage
 * of messages
 * @property {FollowsDao} followsDao Private single instance of MessagesDao
 */
export default class FollowsDao implements FollowsDaoI{
    private static followsDao:FollowsDao|null=null;
    public static getInstance = ():FollowsDao=>{
        if(FollowsDao.followsDao==null){
            FollowsDao.followsDao=new FollowsDao();
        }
        return FollowsDao.followsDao;
    }

    private constructor() {}

    /**
   * Uses FollowsModel to retrieve all follows of the user.
   * @param {string} uid User whose followers list is to be retrieved
   * @returns Promise To be notified when the follows are retrieved from
   * database
   */
    findAllFollowers = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({followedBy:uid})
            .populate("following")
            .exec();

    /**
   * Uses FollowsModel to retrieve all following of the user.
   * @param {string} uid User whose following list is to be retrieved
   * @returns Promise To be notified when the following are retrieved from
   * database
   */
    findAllFollowing = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({following:uid})
            .populate("followedBy")
            .exec();
    /**
   * Inserts follow instance into the database
   * @param {string} uid_cur User who will follow
   * @param {string} uid User who will be followed
   * @returns Promise To be notified when message is inserted into the database
   */
    follow = async  (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({followedBy:uid_cur,following:uid});

    /**
   * Removes follow instance from the database
   * @param {string} uid_cur User who will unfollow
   * @param {string} uid User who will be unfollowed
   * @returns Promise To be notified when message is deleted from the database
   */
    unfollow = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({followedBy:uid_cur,following:uid});
}
