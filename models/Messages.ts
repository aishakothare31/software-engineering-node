

/**
 * @file Represents Messages datatype.
 */
import User from "./User"
/**
 * @typedef Messages represents the message a user wants to send to another user.
 * @property {User} sender: represents the user sending the message.
 * @property {User} receiver: represents the user receiving the message.
 */
export default class Messages {
    private sender:User | null = null
    private receiver:User | null = null
    private message:String | null = null
    private sentOn: Date | null = null
}