import mongoose from "mongoose";

const Schema = mongoose.Schema; // mongoose je drajver za rad sa mongom, 
                                //a prednosti mongoosa su rad sa modelima i shemama (lakse manipulisanje sa bazom)

// pravimo shemu koja predstavlja strukturu dokumenata - kako izgledaju objekti korisnika
let Client = new Schema({
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    contact: {
        type: String
    },
    mail: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: String
    }
})

// nad tom shemom pravim model i onda cu ja nad modelom da izvrsavam funkcije (nadji korisnika, dodaj itd...)
export default mongoose.model('ClientModel', Client, 'clientP');   // model se zove 'UserModel', nad schemom User, nad kolekcijom 'users'