import User from "../models/User";

// declare module 'express-session' {
//     interface Session {
//     //   userId: string;
//       profile:User;
//     }
//   }
  import session from "express-session";

  export = session;
  
  declare module "express-session" {
    interface Session {
        profile:User;
    }
  }