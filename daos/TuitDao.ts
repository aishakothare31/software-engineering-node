/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDao";
import User from "../models/User";
import Stats from "../models/Stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of tuits
 */
export default class TuitDao implements TuitDaoI {
    private static dao: TuitDao | null = null;
  /**
   * Returns the instance of TuitDao. If instance is not present the
   * first creates the instance and the returns the same instance.
   * @returns {TuitDao} singleton of Likes DAO
   */
  public static getInstance = (): TuitDao => {
    if (TuitDao.dao === null) {
      TuitDao.dao = new TuitDao();
    }
    return TuitDao.dao;
  }
    /**
   * Uses TuitModel to retrieve all tuits from tuits collection
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
   async findAllTuits(): Promise<Tuit[]> {
       return await TuitModel.find();
   }

    /**
   * Uses TuitModel to retrieve single tuit from users collection
   * @param {string} tid Tuit's primary key
   * @returns Promise To be notified when tuit is retrieved from the database
   */
   async findTuitById(tid: string): Promise<any> {
       return await TuitModel.findById(tid);
   }


  /**
   * Uses TuitModel to retrieve tuits from tuits collection
   * @param {string} userid User's primary key
   * @returns Promise To be notified when tuits are retrieved from the database
   */
async findTuitsByUser(userid: string): Promise<Tuit[]> {
    //return await TuitModel.find({postedBy: uid}).exec();
    return await TuitModel.find({ postedBy: userid });
}   

    /**
   * Inserts tuit instance into the database
   * @param {Tuit} tuit Instance to be inserted into the database
   * @returns Promise To be notified when tuit is inserted into the database
   */
   async createTuit(tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit);
   }

   /**
   * Removes tuit from the database.
   * @param {string} tid Primary key of tuit to be removed
   * @returns Promise To be notified when tuit is removed from the database
   */
   async deleteTuit(tid: string):  Promise<any> {
       return await TuitModel.deleteOne({_id: tid});
   }

   /**
   * Updates tuit with new values in database
   * @param {string} tid Primary key of tuit to be modified
   * @param {Tuit} tuit User object containing properties and their new values
   * @returns Promise To be notified when tuit is updated in the database
   */
   async updateTuit(tid: string, tuit: Tuit): Promise<any> {
       return await TuitModel.updateOne({_id: tid}, {$set: tuit});
   }

   async createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit> {
       return await TuitModel.create(tuit)
   }

    /**
   * update a tuit's stats
   * @param tid id ot the tuit
   * @param newStats new stats of the tuit
   * @returns
   */
     updateLikes = async (tid:string, newStats: Stats): Promise<any> =>
     TuitModel.updateOne(
         {_id: tid},
         {$set: {stats: newStats}});
    
           /**
   * update a tuit's stats
   * @param tid id ot the tuit
   * @param newStats new stats of the tuit
   * @returns
   */
     updateDislikes = async (tid:string, newStats: Stats): Promise<any> =>
     TuitModel.updateOne(
         {_id: tid},
         {$set: {stats: newStats}});
}
