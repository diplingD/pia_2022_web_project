import { Comment } from "./comment";
import { User } from "./user";

export class Agency implements User{
    username: string;
    password: string;
    contact: string;
    mail: string;
    name: string;
    address: string;
    number: string;
    description: string;
    type: string;
    image: string;
    komentari: Comment[];
    status: string;
    radnici: number;
    radnihMesta: number;
    radnihMestaZahtev: number;
}