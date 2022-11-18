/**
 * @file Controller Interface RESTful Web service API for Dislikes resource
 */
 import {Request, Response} from "express";
 /**
  * @interface DislikeController An interface for Dislikes on Tuiter.
  *
  */
 export default interface DislikesController {
      /**
      * Retrieves all users that Disliked a tuit from the database
      * @param {Request} req Represents client request: includes the path
      * parameter tid representing the tuit id of Disliked tuit
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findTuitsUserDisliked(req: Request, res: Response): void;
     
      /**
      * Retrieves all tuits Disliked by a user from the database
      * @param {Request} req Represents client request: includes the path
      * parameter uid representing the users that Disliked the tuits
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the tuit objects that were Disliked
      */
     findUsersThatDislikedTuit(req: Request, res: Response): void;
 
     /**
      * Get the count of Dislikes on  a tuit.
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, includes the total count.
      */
     findTuitDislikesCount(req: Request, res: Response): void;
 
     /**
      * Increments the Dislikes count on a tuit.
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userDislikesTuit(req: Request, res: Response): void;
 
     /**
      * Decrements the Dislikes count on a tuit
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userUndislikesTuit(req: Request, res: Response): void;
    
     /**
      * Toggles the Dislikes on a tuit
      * @param {Request} req Represents client request: includes the
      * path parameters uid and tid representing the user that is liking the tuit
      * and the tuit being Disliked
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the new Dislikes that was inserted in the
      * database
      */
     userTogglesTuitDislikes(req: Request, res: Response): void;
  }