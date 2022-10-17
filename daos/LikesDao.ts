import Likes from "../models/Likes";
import LikesModel from "../mongoose/LikesModel";
import LikesDaoI from "../interfaces/LikesDao";
import User from "../models/User";

export default class LikesDao implements LikesDaoI {
    findTuitLikesCount(): void {
        throw new Error("Method not implemented.");
    }
    private static likesDao: LikesDao | null = null;
    public static getInstance = (): LikesDao => {
        if(LikesDao.likesDao === null) {
            LikesDao.likesDao = new LikesDao();
        }
        return LikesDao.likesDao;
    }
    async findTuitsUserLiked(uid: string): Promise<any>{
        return await LikesModel.findById(uid);
    } 
    findUsersThatLikedTuit = async (tid: string): Promise<Likes[]> =>
        LikesModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikesModel.create({tuit: tid, likedBy: uid});

    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikesModel.deleteOne({tuit: tid, likedBy: uid});

}
