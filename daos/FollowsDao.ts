import FollowsModel from "../mongoose/FollowsModel";
import FollowsDaoI from "../interfaces/FollowsDao";
import Follows from "../models/Follows";

export default class FollowsDao implements FollowsDaoI{
    private static followsDao:FollowsDao|null=null;
    public static getInstance = ():FollowsDao=>{
        if(FollowsDao.followsDao==null){
            FollowsDao.followsDao=new FollowsDao();
        }
        return FollowsDao.followsDao;
    }

    private constructor() {}

    findAllFollowers = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({followedBy:uid})
            .populate("following")
            .exec();

    findAllFollowing = async (uid: string): Promise<Follows[]> =>
        FollowsModel.find({following:uid})
            .populate("followedBy")
            .exec();

    follow = async  (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.create({followedBy:uid_cur,following:uid});

    unfollow = async (uid_cur: String, uid: string): Promise<any> =>
        FollowsModel.deleteOne({followedBy:uid_cur,following:uid});
}
