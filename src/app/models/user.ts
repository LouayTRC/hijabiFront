import { Role } from "./role";

export class User {
    constructor(public _id:number,public username:String,public email:String,public password:String,public fullname:String,public role:Role,public pdp:String,public status:number){}
}
