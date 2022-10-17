import Likes from "../models/Likes";

export default interface LikesController {
    findTuitsUserLiked(uid: string): Promise<Likes[]>;
    findUsersThatLikedTuit(tid: string): Promise<Likes[]>;
    findTuitLikesCount(): void;
    userLikesTuit(tid: string, uid: string): Promise<Likes>;
    userUnlikesTuit(tid: string, uid: string): Promise<any>;
 }