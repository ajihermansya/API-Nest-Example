import { FeedPost } from "src/feed/models/post.interface";
import { Role } from "./role.enum";


export class User {
    id? : number;
    firstName? : string;
    lastName? : string;
    email? : string;
    password? : string;
    role? : Role;
    posts? : FeedPost[];
}