import express from 'express';
import { UserControler } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/login').post(    // ako dodje login ruta, zove userControler.login()
    (req, res)=>new UserControler().login(req, res) 
)

userRouter.route('/loginAdmin').post(
    (req, res)=>new UserControler().loginAdmin(req, res) 
)

userRouter.route('/registerClient').post(
    (req, res)=>new UserControler().registerClient(req, res) 
)

userRouter.route('/registerAgency').post(
    (req, res)=>new UserControler().registerAgency(req, res) 
)

userRouter.route('/findClient').post(
    (req, res)=>new UserControler().findClient(req, res) 
)
userRouter.route('/findClientByUsername').post(
    (req, res)=>new UserControler().findClientByUsername(req, res) 
)

userRouter.route('/findObject').post(
    (req, res)=>new UserControler().findObject(req, res) 
)

userRouter.route('/findAgency').post(
    (req, res)=>new UserControler().findAgency(req, res) 
)

userRouter.route('/changePassword').post(
    (req, res)=>new UserControler().changePassword(req, res) 
)

userRouter.route('/getAllAgencies').get(
    (req, res)=>new UserControler().getAllAgencies(req, res) 
)

// pretraga agencija
userRouter.route('/searchAgenciesName').post(
    (req, res)=>new UserControler().searchAgenciesName(req, res) 
)
userRouter.route('/searchAgenciesAddress').post(
    (req, res)=>new UserControler().searchAgenciesAddress(req, res) 
)
userRouter.route('/searchAgencies').post(
    (req, res)=>new UserControler().searchAgencies(req, res) 
)

// Dodaj objekat
userRouter.route('/addObject').post(
    (req, res)=>new UserControler().addObject(req, res) 
)

userRouter.route('/getAllObjects').post(
    (req, res)=>new UserControler().getAllObjects(req, res) 
)

userRouter.route('/editObject').post(
    (req, res)=>new UserControler().editObject(req, res) 
)

userRouter.route('/deleteObject').post(
    (req, res)=>new UserControler().deleteObject(req, res) 
)

// ZAHTEVI
userRouter.route('/addZahtev').post(
    (req, res)=>new UserControler().addZahtev(req, res) 
)

userRouter.route('/getAllRequests').post(
    (req, res)=>new UserControler().getAllRequests(req, res) 
)

userRouter.route('/editZahtev').post(
    (req, res)=>new UserControler().editZahtev(req, res) 
)

userRouter.route('/odbijZahtev').post(
    (req, res)=>new UserControler().odbijZahtev(req, res) 
)

userRouter.route('/getAllUserJobs').post(
    (req, res)=>new UserControler().getAllUserJobs(req, res) 
)

userRouter.route('/prihvatiPonudu').post(
    (req, res)=>new UserControler().prihvatiPonudu(req, res) 
)

userRouter.route('/odbijPonudu').post(
    (req, res)=>new UserControler().odbijPonudu(req, res) 
)

userRouter.route('/plati').post(
    (req, res)=>new UserControler().plati(req, res) 
)

userRouter.route('/filterJobs').post(
    (req, res)=>new UserControler().filterJobs(req, res) 
)

userRouter.route('/getAllActiveJobs').post(
    (req, res)=>new UserControler().getAllActiveJobs(req, res) 
)

userRouter.route('/findCanvas').post(
    (req, res)=>new UserControler().findCanvas(req, res) 
)

userRouter.route('/setCanvas').post(
    (req, res)=>new UserControler().setCanvas(req, res) 
)

userRouter.route('/oceniAgenciju').post(
    (req, res)=>new UserControler().oceniAgenciju(req, res) 
)

userRouter.route('/getAllClients').get(
    (req, res)=>new UserControler().getAllClients(req, res) 
)

userRouter.route('/updateClient').post(
    (req, res)=>new UserControler().updateClient(req, res) 
)

userRouter.route('/updateAgency').post(
    (req, res)=>new UserControler().updateAgency(req, res) 
)

userRouter.route('/deleteClient').post(
    (req, res)=>new UserControler().deleteClient(req, res) 
)

userRouter.route('/deleteAgency').post(
    (req, res)=>new UserControler().deleteAgency(req, res) 
)

userRouter.route('/getAllFinishedRequests').post(
    (req, res)=>new UserControler().getAllFinishedRequests(req, res) 
)

userRouter.route('/editClient').post(
    (req, res)=>new UserControler().editClient(req, res) 
)

userRouter.route('/editAgency').post(
    (req, res)=>new UserControler().editAgency(req, res) 
)

userRouter.route('/isRated').post(
    (req, res)=>new UserControler().isRated(req, res) 
)

userRouter.route('/editAgencyComm').post(
    (req, res)=>new UserControler().editAgencyComm(req, res) 
)

userRouter.route('/obrisiKomentar').post(
    (req, res)=>new UserControler().obrisiKomentar(req, res) 
)

userRouter.route('/getAllClientsReq').get(
    (req, res)=>new UserControler().getAllClientsReq(req, res) 
)

userRouter.route('/getAllAgenciesReq').get(
    (req, res)=>new UserControler().getAllAgenciesReq(req, res) 
)

userRouter.route('/acceptClient').post(
    (req, res)=>new UserControler().acceptClient(req, res) 
)

userRouter.route('/acceptAgency').post(
    (req, res)=>new UserControler().acceptAgency(req, res) 
)

userRouter.route('/postaviBrRadnika').post(
    (req, res)=>new UserControler().postaviBrRadnika(req, res) 
)

userRouter.route('/dodajRadnaMestaZahtev').post(
    (req, res)=>new UserControler().dodajRadnaMestaZahtev(req, res) 
)

userRouter.route('/odobriRadnaMesta').post(
    (req, res)=>new UserControler().odobriRadnaMesta(req, res) 
)

userRouter.route('/dodajRadnikeObjektu').post(
    (req, res)=>new UserControler().dodajRadnikeObjektu(req, res) 
)

userRouter.route('/getAllJobs').get(
    (req, res)=>new UserControler().getAllJobs(req, res) 
)

export default userRouter;