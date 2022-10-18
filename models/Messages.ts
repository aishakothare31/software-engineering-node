import User from "./User"

export default class Messages {
    private sender:User | null = null
    private receiver:User | null = null
    private message:String | null = null
}