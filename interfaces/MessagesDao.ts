/**
 * @file Declares API for Messages related data access object methods
 */
 import Message from "../models/Messages";

 export default interface MessagesDao{

     send(message:Message):Promise<Message>;
 
     unsend(mid:string):Promise<any>;
 
     findMessagesSent(uid:string):Promise<Message[]>;

     findMessagesReceived(uid:string):Promise<Message[]>;
 
 }