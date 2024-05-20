import { Category } from "./category";
import { Comment } from "./comment";
import { Vendeur } from "./vendeur";

export class Product {
    constructor(public _id:number,public name:String,public qte:number,public description:String,public category:Category,public pics:String[],public price:number,public status:number,public vendeur:Vendeur,public comments:Comment[],public sizes:Number[],public couleurs:String[]){}
}
