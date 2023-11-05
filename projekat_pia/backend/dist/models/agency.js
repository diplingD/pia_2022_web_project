"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // mongoose je drajver za rad sa mongom, 
//a prednosti mongoosa su rad sa modelima i shemama (lakse manipulisanje sa bazom)
// pravimo shemu koja predstavlja strukturu dokumenata - kako izgledaju objekti korisnika
let Agency = new Schema({
    username: {
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
    name: {
        type: String
    },
    address: {
        type: String
    },
    number: {
        type: String
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    komentari: {
        type: [
            {
                korisnik: {
                    type: String
                },
                komentar: {
                    type: String
                },
                ocena: {
                    type: Number
                }
            }
        ]
    },
    status: {
        type: String
    },
    radnici: {
        type: Number
    },
    radnihMesta: {
        type: Number
    },
    radnihMestaZahtev: {
        type: Number
    }
});
// nad tom shemom pravim model i onda cu ja nad modelom da izvrsavam funkcije (nadji korisnika, dodaj itd...)
exports.default = mongoose_1.default.model('AgencyModel', Agency, 'agencyP'); // model se zove 'UserModel', nad schemom User, nad kolekcijom 'users'
//# sourceMappingURL=agency.js.map