 /**
 * @file Message Controller RESTful Web service API for Messages resource
 */
 import {Express,Response,Request} from "express";
 import MessagesControllerI from "../interfaces/MessagesController";
 import MessagesDao from "../daos/MessagesDao";

/**
 * @class MessagesController Implements RESTful Web service API for Messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /messages/:uid/send :send a new message</li>
 *     <li>GET /messages/:uid/sent :retrieve messages sent</li>
 *     <li>GET /messages/:uid/received :retrieve messages received by user </li>
 *     <li>DELETE /messages/:mid/delete :unsend a particular message</li>
 * </ul>
 * @property {MessagesDao} messageDao Singleton DAO implementing user CRUD operations
 * @property {MessagesController} messagesController Singleton controller implementing
 * RESTful Web service API
 */
 export default class MessagesController implements MessagesControllerI{
     private static messagesDao: MessagesDao = MessagesDao.getInstance();
     private static messagesController: MessagesController | null = null;

     public static getInstance = (app: Express): MessagesController => {
         if(MessagesController.messagesController === null) {
             MessagesController.messagesController = new MessagesController();
             app.get("/messages/:uid/sent", MessagesController.messagesController.findMessagesSent);
             app.get("/messages/:uid/received", MessagesController.messagesController.findMessagesReceived);
             app.post("/messages/:uid/send", MessagesController.messagesController.send);
             app.delete("/messages/:mid/delete", MessagesController.messagesController.unsend);
         }
         return MessagesController.messagesController;
     }
 
     private constructor() {}

    /**
     * Sends out a message to a user.
     * @param {Request} req Represents client request: includes the
     * request body containing message information.
     * @param {Response} res Represents response to client, includes the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
     send = (req: Request, res: Response)=>
         MessagesController.messagesDao.send(req.body)
         .then(messages=>res.json(messages));
 
    /**
     * Unsends a message already sent to a user.
     * @param {Request} req Represents client request: includes the
     * path parameters mid representing message to be unsent.
     * @param {Response} res Represents response to client, includes status
     * on whether unsend was successful or not
     */
     unsend = (req: Request, res: Response)=>
         MessagesController.messagesDao.unsend(req.params.mid)
         .then(status=>res.send(status));

    /**
     * Retrieves all messages that are sent by the user
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user whose messages sent is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that are sent by the user
     */
     findMessagesSent = (req: Request, res: Response)=>
         MessagesController.messagesDao.findMessagesSent(req.params.uid)
             .then(messages=>res.json(messages));

    /**
     * Retrieves all messages that are received by the user
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the user whose messages received is to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects that are received by the user
     */
     findMessagesReceived = (req: Request, res: Response)=>
         MessagesController.messagesDao.findMessagesReceived(req.params.uid)
             .then(messages=>res.json(messages));
 
 
 }