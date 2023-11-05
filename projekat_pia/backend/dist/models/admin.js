"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema; // mongoose je drajver za rad sa mongom, 
//a prednosti mongoosa su rad sa modelima i shemama (lakse manipulisanje sa bazom)
// pravimo shemu koja predstavlja strukturu dokumenata - kako izgledaju objekti korisnika
let Admin = new Schema({
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
    type: {
        type: String
    }
});
// nad tom shemom pravim model i onda cu ja nad modelom da izvrsavam funkcije (nadji korisnika, dodaj itd...)
exports.default = mongoose_1.default.model('AdminModel', Admin, 'adminP'); // model se zove 'UserModel', nad schemom User, nad kolekcijom 'users'
//# sourceMappingURL=admin.js.map