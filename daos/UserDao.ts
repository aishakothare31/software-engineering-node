/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * for Users
 */
export default class UserDao implements UserDaoI {
    /**
   * Uses UserModel to retrieve all user docs from users collection
   * @returns Promise To be notified when the users are retrieved from
   * database
   */
   async findAllUsers(): Promise<User[]> {
       return await UserModel.find();
   }

   /**
   * Uses UserModel to retrieve single user doc from users collection
   * @param {string} uid User's primary key
   * @returns Promise To be notified when user is retrieved from the database
   */
   async findUserById(uid: string): Promise<any> {
       return await UserModel.findById(uid);
   }

   /**
   * Inserts user instance into the database
   * @param {User} user Instance to be inserted into the database
   * @returns Promise To be notified when user is inserted into the database
   */
   async createUser(user: User): Promise<User> {
       return await UserModel.create(user);
   }

    /**
   * Deletes user instance from the database
   * @param {string} uid User's primary key to be deleted
   * @returns Promise To be notified when user is removed from the database
   */
   async deleteUser(uid: string):  Promise<any> {
       return await UserModel.deleteOne({_id: uid});
   }

   /**
   * Updates user with new values in database
   * @param {string} uid Primary key of user to be modified
   * @param {User} user User object containing properties and their new values
   * @returns Promise To be notified when user is updated in the database
   */
   async updateUser(uid: string, user: User): Promise<any> {
       return await UserModel.updateOne({_id: uid}, {$set: user});
   }
}

