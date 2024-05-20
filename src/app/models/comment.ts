import { Client } from "./client";

export class Comment {
    constructor(public _id:number,public description:String,public replys:Comment[],public Client:Client){}
}
