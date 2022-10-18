
 import {Request, Response} from "express";

 export default interface MessagesController{

     send (req: Request, res: Response): void;

     unsend (req: Request, res: Response): void;
 
     findMessagesSent (req: Request, res: Response): void;

     findMessagesReceived(req: Request, res: Response): void;
 
 }