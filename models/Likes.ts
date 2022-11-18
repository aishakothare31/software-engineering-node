/**
 * @file represents the Likes datatype between user and tuit. the relation being user
 * likes or unlkes a tuit.
 */
import Tuit from "./Tuit";
import User from "./User";
/**
 * @typedef Likes shows likes relation between a User and a Tuit.
 * @property {Tuit} likedTuit: the tuit a user liked.
 * @property {User} likedBy: the user liked a tuit.
 */
export default class Likes {
   likedTuit: Tuit | null = null
   private likedBy: User | null = null;
};