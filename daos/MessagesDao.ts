 /**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessagesModel
 * to integrate with MongoDB
 */
 import MessagesModel from "../mongoose/MessagesModel";
 import MessagesDaoI from "../interfaces/MessagesDao";
 import Message from "../models/Messages";

 /**
 * @class MessagesDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessagesDao} messagesDao Private single instance of MessagesDao
 */
 export default class MessagesDao implements MessagesDaoI{
     private static messagesDao:MessagesDao|null=null;
     public static getInstance=():MessagesDao=>{
         if(MessagesDao.messagesDao===null){
             MessagesDao.messagesDao = new MessagesDao();
         }
         return MessagesDao.messagesDao;
     }
     private constructor() {
     }

    /**
   * Uses MessagesModel to retrieve all messages sent from messages collection
   * @param {string} uid User whose sent messages are to be retrieved
   * @returns Promise To be notified when the messages are retrieved from
   * database
   */
    findMessagesSent = async (uid: string): Promise<Message[]> =>
        MessagesModel.find({from:uid})
            .populate("message")
            .exec();

    /**
   * Uses TuitModel to retrieve all messages received from messages collection
   * @param {string} uid User whose received messages are to be retrieved
   * @returns Promise To be notified when the messages are retrieved from
   * database
   */
    findMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessagesModel.find({to:uid})
            .populate("message")
            .exec();

    /**
   * Inserts messages instance into the database
   * @param {Message} message Instance to be inserted into the database
   * @returns Promise To be notified when message is inserted into the database
   */
    send = async (message: Message): Promise<Message> =>
        MessagesModel.create(message);

    /**
   * Removes message from the database.
   * @param {string} mid Primary key of message to be removed
   * @returns Promise To be notified when message is removed from the database
   */
    unsend = async (mid: string): Promise<any> =>
        MessagesModel.deleteOne({_id:mid})
 
 }