import { Client } from "./client";
import { Product } from "./product";

export class Command {
    constructor(public _id:any,public client:Client,public total:number,public Products:any[],public date_cmmd:Date,public status:number){}
}
