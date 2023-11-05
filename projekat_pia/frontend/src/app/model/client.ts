import { User } from "./user";

export class Client implements User{
    username: string;
    firstname: string;
    lastname: string;
    password: string;
    contact: string;
    mail: string;
    type: string;
    image: string;
    status: string;
}