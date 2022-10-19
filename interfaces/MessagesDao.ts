/**
 * @file Declares API for Messages related data access object methods
 */
 import Message from "../models/Messages";

/**
 * @interface MessagesDao An interface for Messages Data access objects for messages on Tuiter.
 *
 */
 export default interface MessagesDao{
    /**
     * Inserts messages instance into the database
     * @param {Message} message Instance to be inserted into the database.
     * @returns Promise To be notified when message is inserted into the database.
     */
    send(message:Message):Promise<Message>;

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    unsend(mid:string):Promise<any>;

    /**
     * Uses MessagesModel to retrieve all messages sent from messages collection
     * @param {string} uid User whose sent messages are to be retrieved.
     * @returns Promise To be notified when the messages are retrieved from
     * database.
     */
    findMessagesSent(uid:string):Promise<Message[]>;

    /**
     * Uses MessagesModel to retrieve all messages received from messages collection
     * @param {string} uid User whose received messages are to be retrieved
     * @returns Promise To be notified when the messages are retrieved from
     * database.
     */
    findMessagesReceived(uid:string):Promise<Message[]>;
 
 }