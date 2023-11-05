"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post(// ako dodje login ruta, zove userControler.login()
(req, res) => new user_controller_1.UserControler().login(req, res));
userRouter.route('/loginAdmin').post((req, res) => new user_controller_1.UserControler().loginAdmin(req, res));
userRouter.route('/registerClient').post((req, res) => new user_controller_1.UserControler().registerClient(req, res));
userRouter.route('/registerAgency').post((req, res) => new user_controller_1.UserControler().registerAgency(req, res));
userRouter.route('/findClient').post((req, res) => new user_controller_1.UserControler().findClient(req, res));
userRouter.route('/findClientByUsername').post((req, res) => new user_controller_1.UserControler().findClientByUsername(req, res));
userRouter.route('/findObject').post((req, res) => new user_controller_1.UserControler().findObject(req, res));
userRouter.route('/findAgency').post((req, res) => new user_controller_1.UserControler().findAgency(req, res));
userRouter.route('/changePassword').post((req, res) => new user_controller_1.UserControler().changePassword(req, res));
userRouter.route('/getAllAgencies').get((req, res) => new user_controller_1.UserControler().getAllAgencies(req, res));
// pretraga agencija
userRouter.route('/searchAgenciesName').post((req, res) => new user_controller_1.UserControler().searchAgenciesName(req, res));
userRouter.route('/searchAgenciesAddress').post((req, res) => new user_controller_1.UserControler().searchAgenciesAddress(req, res));
userRouter.route('/searchAgencies').post((req, res) => new user_controller_1.UserControler().searchAgencies(req, res));
// Dodaj objekat
userRouter.route('/addObject').post((req, res) => new user_controller_1.UserControler().addObject(req, res));
userRouter.route('/getAllObjects').post((req, res) => new user_controller_1.UserControler().getAllObjects(req, res));
userRouter.route('/editObject').post((req, res) => new user_controller_1.UserControler().editObject(req, res));
userRouter.route('/deleteObject').post((req, res) => new user_controller_1.UserControler().deleteObject(req, res));
// ZAHTEVI
userRouter.route('/addZahtev').post((req, res) => new user_controller_1.UserControler().addZahtev(req, res));
userRouter.route('/getAllRequests').post((req, res) => new user_controller_1.UserControler().getAllRequests(req, res));
userRouter.route('/editZahtev').post((req, res) => new user_controller_1.UserControler().editZahtev(req, res));
userRouter.route('/odbijZahtev').post((req, res) => new user_controller_1.UserControler().odbijZahtev(req, res));
userRouter.route('/getAllUserJobs').post((req, res) => new user_controller_1.UserControler().getAllUserJobs(req, res));
userRouter.route('/prihvatiPonudu').post((req, res) => new user_controller_1.UserControler().prihvatiPonudu(req, res));
userRouter.route('/odbijPonudu').post((req, res) => new user_controller_1.UserControler().odbijPonudu(req, res));
userRouter.route('/plati').post((req, res) => new user_controller_1.UserControler().plati(req, res));
userRouter.route('/filterJobs').post((req, res) => new user_controller_1.UserControler().filterJobs(req, res));
userRouter.route('/getAllActiveJobs').post((req, res) => new user_controller_1.UserControler().getAllActiveJobs(req, res));
userRouter.route('/findCanvas').post((req, res) => new user_controller_1.UserControler().findCanvas(req, res));
userRouter.route('/setCanvas').post((req, res) => new user_controller_1.UserControler().setCanvas(req, res));
userRouter.route('/oceniAgenciju').post((req, res) => new user_controller_1.UserControler().oceniAgenciju(req, res));
userRouter.route('/getAllClients').get((req, res) => new user_controller_1.UserControler().getAllClients(req, res));
userRouter.route('/updateClient').post((req, res) => new user_controller_1.UserControler().updateClient(req, res));
userRouter.route('/updateAgency').post((req, res) => new user_controller_1.UserControler().updateAgency(req, res));
userRouter.route('/deleteClient').post((req, res) => new user_controller_1.UserControler().deleteClient(req, res));
userRouter.route('/deleteAgency').post((req, res) => new user_controller_1.UserControler().deleteAgency(req, res));
userRouter.route('/getAllFinishedRequests').post((req, res) => new user_controller_1.UserControler().getAllFinishedRequests(req, res));
userRouter.route('/editClient').post((req, res) => new user_controller_1.UserControler().editClient(req, res));
userRouter.route('/editAgency').post((req, res) => new user_controller_1.UserControler().editAgency(req, res));
userRouter.route('/isRated').post((req, res) => new user_controller_1.UserControler().isRated(req, res));
userRouter.route('/editAgencyComm').post((req, res) => new user_controller_1.UserControler().editAgencyComm(req, res));
userRouter.route('/obrisiKomentar').post((req, res) => new user_controller_1.UserControler().obrisiKomentar(req, res));
userRouter.route('/getAllClientsReq').get((req, res) => new user_controller_1.UserControler().getAllClientsReq(req, res));
userRouter.route('/getAllAgenciesReq').get((req, res) => new user_controller_1.UserControler().getAllAgenciesReq(req, res));
userRouter.route('/acceptClient').post((req, res) => new user_controller_1.UserControler().acceptClient(req, res));
userRouter.route('/acceptAgency').post((req, res) => new user_controller_1.UserControler().acceptAgency(req, res));
userRouter.route('/postaviBrRadnika').post((req, res) => new user_controller_1.UserControler().postaviBrRadnika(req, res));
userRouter.route('/dodajRadnaMestaZahtev').post((req, res) => new user_controller_1.UserControler().dodajRadnaMestaZahtev(req, res));
userRouter.route('/odobriRadnaMesta').post((req, res) => new user_controller_1.UserControler().odobriRadnaMesta(req, res));
userRouter.route('/dodajRadnikeObjektu').post((req, res) => new user_controller_1.UserControler().dodajRadnikeObjektu(req, res));
userRouter.route('/getAllJobs').get((req, res) => new user_controller_1.UserControler().getAllJobs(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map