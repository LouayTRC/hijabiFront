import { Client } from "./client";
import { Product } from "./product";

export class Command {
    constructor(public _id:number,public client:Client,public total:number,public products:Product[],public date_cmmd:Date,public status:number){}
}
