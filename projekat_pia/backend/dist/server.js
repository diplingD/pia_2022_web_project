"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
//import fileUpload from 'express-fileupload';
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//app.use(fileUpload());
mongoose_1.default.connect('mongodb://127.0.0.1:27017/projekat2023');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default); //za sve rute koje u sebi imaju 'clientP' ja cu da koristim userRouter
app.use('/', router); // svi zahtevi koji dodju obradjivace ruter
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map