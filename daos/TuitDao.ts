import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";

export default class UserDao implements TuitDaoI {
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }
   async findTuitById(tid: string): Promise<any> {
       return await TuitModel.findById(tid);
   }
   async findTuitsByUser(userid: string): Promise<any> {
    return await TuitModel.find({postedBy: userid});
}
   async createTuit(tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit);
   }
   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }
}
