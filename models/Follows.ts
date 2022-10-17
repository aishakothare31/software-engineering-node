import User from "./User";

export default interface Follows {
    followedBy:User
    following: User
};