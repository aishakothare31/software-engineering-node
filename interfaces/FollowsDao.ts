import Follows from "../models/Follows";

export default interface FollowsDaoI {

    follow(uid_cur:String, uid:string):Promise<any>;

    unfollow(uid_cur:String, uid:string):Promise<Follows>;

    findAllFollowers (uid:string): Promise<Follows[]>;

    findAllFollowing(uid:string): Promise<Follows[]>;

}