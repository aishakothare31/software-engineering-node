/**
 * @file Controller Interface RESTful Web service API for Messages resource.
 */
 import {Request, Response} from "express";
/**
 * @interface MessagesController An interface for Messages of Tuiter.
 */
 export default interface MessagesController{

    /**
     * Sends out a message to a user.
     * @param {Request} req Represents client request: includes the
     * request body containing message information.
     * @param {Response} res Represents response to client, includes the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    send (req: Request, res: Response): void;

    /**
     * Unsends a message already sent to a user.
     * @param {Request} req Represents client request: includes the
     * path parameters mid representing message to be unsent.
     * @param {Response} res Represents response to client, includes status
     * on whether unsend was successful or not
     */
    unsend (req: Request, res: Response): void;

    /**
     * Retrieves all messages that are sent by the user
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user whose messages sent is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that are sent by the user
     */
    findMessagesSent (req: Request, res: Response): void;

    /**
     * Retrieves all messages that are received by the user
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user whose messages received is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that are received by the user
     */
    findMessagesReceived(req: Request, res: Response): void;
 
 }