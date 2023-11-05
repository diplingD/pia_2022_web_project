import express from 'express';
import ClientModel from '../models/client';
import AgencyModel from '../models/agency';
import AdminModel from '../models/admin';
import ObjekatModel from '../models/object';
import ZahtevModel from '../models/zahtev';
import { Request, Response } from 'express';

export class UserControler{
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        ClientModel.findOne({'username': username, 'password': password, 'status':"prihvacen"}, (err, user)=>{    // ako mozes - nadji korisnika medju KLIJENTIMA
            if(err) {
                console.log(err);                                
            }
            else{
                if(user == null) {
                    AgencyModel.findOne({'username': username, 'password': password, 'status':"prihvacen"}, (err, user)=>{    // ako ne - probaj medju AGENCIJAMA
                        if(err) console.log(err);
                        else res.json(user);
                    })
                }
                else res.json(user);
            } 
        })
    }

    loginAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let password = req.body.password;

        AdminModel.findOne({'username': username, 'password': password}, (err, admin)=>{
            if(err) console.log(err);
            else res.json(admin);
        })
    }

    registerClient = async (req: express.Request, res: express.Response)=>{
        let client = new ClientModel({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            contact: req.body.contact,
            mail: req.body.mail,
            type: req.body.type,
            image: req.body.image,
            status: req.body.status
        })

        let username2 = req.body.username;
        let mail2 = req.body.mail;

        ClientModel.findOne( {$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
            if(err) console.log(err);
            else if (!user) {  // nismo nasli username ili mail medju klijentima -> idemo dalje na agencije
                AgencyModel.findOne({$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
                    if(err) console.log(err);
                    else if (!user) {  // nismo nasli username medju agencijama -> idemo dalje na admine
                        AdminModel.findOne({$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
                            if(err) console.log(err);
                            else if (!user) {  // nismo nasli username ni medju adminima - jedinstveni, dodaj u bazu klijenta
                                client.save((err, resp)=>{
                                    if(err) console.log(err);
                                    else res.json({"message":"ok"});
                                })
                            }
                            else {
                                res.json({"message":"notUnique"});
                            }
                        })
                    }
                    else {
                        res.json({"message":"notUnique"});
                    }
                })
            }
            else {
                res.json({"message":"notUnique"});
            }
        })
        
    }

    registerAgency = (req: express.Request, res: express.Response)=>{
        let agency = new AgencyModel({
            username: req.body.username,
            password: req.body.password,
            contact: req.body.contact,
            mail: req.body.mail,
            name: req.body.name,
            address: req.body.address,
            number: req.body.number,
            description: req.body.description,
            type: req.body.type,
            image: req.body.image,
            komentari: [],
            status: req.body.status,
            radnici: 0,
            radnihMesta: 0,
            radnihMestaZahtev: 0
        })

        let username2 = req.body.username;
        let mail2 = req.body.mail;

        ClientModel.findOne( {$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
            if(err) console.log(err);
            else if (!user) {  // nismo nasli username ili mail medju klijentima -> idemo dalje na agencije
                AgencyModel.findOne({$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
                    if(err) console.log(err);
                    else if (!user) {  // nismo nasli username medju agencijama -> idemo dalje na admine
                        AdminModel.findOne({$or:[{'username': username2}, {'mail':mail2}]}, (err, user)=>{
                            if(err) console.log(err);
                            else if (!user) {  // nismo nasli username ni medju adminima
                                agency.save((err, resp)=>{
                                    if(err) console.log(err);
                                    else res.json({"message":"ok"});
                                })
                            }
                            else {
                                res.json({"message":"notUnique"});
                            }
                        })
                    }
                    else {
                        res.json({"message":"notUnique"});
                    }
                })
            }
            else {
                res.json({"message":"notUnique"});
            }
        })
        
    }


    findClient(req: Request, res: Response){
        let username = req.body.username;
        let password = req.body.password;

        ClientModel.findOne({'username': username, 'password': password}, (err, client)=>{
            if(err) console.log(err);
            else res.json(client);
        })
    }

    findClientByUsername(req: Request, res: Response){
        let username = req.body.username;

        ClientModel.findOne({'username': username}, (err, client)=>{
            if(err) console.log(err);
            else res.json(client);
        })
    }

    findObject(req: Request, res: Response){
        let user = req.body.user;
        let adresa = req.body.adresa;

        ObjekatModel.findOne({'user': user, 'adresa': adresa}, (err, obj)=>{
            if(err) console.log(err);
            else res.json(obj);
        })
    }

    findAgency(req: Request, res: Response){
        let username = req.body.username;

        AgencyModel.findOne({'username': username}, (err, agency)=>{
            if(err) console.log(err);
            else res.json(agency);
        })
    }

    changePassword = (req: express.Request, res: express.Response)=>{
        let userType = req.body.userType;
        let username = req.body.username;
        let newPassword = req.body.newPassword;

        if(userType == "client"){
            ClientModel.updateOne({'username': username}, {$set: {'password': newPassword}}, (err, resp)=>{
                if(err) console.log(err);
                else res.json({'message':"Lozinka uspesno promenjena"});
            })
        } else if(userType == "agency"){
            AgencyModel.updateOne({'username': username}, {$set: {'password': newPassword}}, (err, resp)=>{
                if(err) console.log(err);
                else res.json({'message':"Lozinka uspesno promenjena"});
            })
        } else if(userType == "admin"){
            AdminModel.updateOne({'username': username}, {$set: {'password': newPassword}}, (err, resp)=>{
                if(err) console.log(err);
                else res.json({'message':"Lozinka uspesno promenjena"});
            })
        }

    }

    getAllAgencies = (req: express.Request, res: express.Response)=>{
        AgencyModel.find({'status': "prihvacen"}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    getAllAgenciesReq = (req: express.Request, res: express.Response)=>{
        AgencyModel.find({'status': "zahtev"}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    // pretraga agencija
    searchAgenciesName = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;

        AgencyModel.find({'name': {$regex: name, $options: "i"}}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }
    searchAgenciesAddress = (req: express.Request, res: express.Response)=>{
        let address = req.body.address;
        
        AgencyModel.find({'address': {$regex: address, $options: "i"}}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }
    searchAgencies = (req: express.Request, res: express.Response)=>{
        let name = req.body.name;
        let address = req.body.address;
        
        AgencyModel.find({'name': {$regex: name, $options: "i"}, 'address': {$regex: address, $options: "i"}}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    // oceni agenciju
    oceniAgenciju = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;

        let kom = {
            korisnik: client,
            komentar: komentar,
            ocena: ocena
        }

        AgencyModel.updateOne({'name': agencija}, {$push: {'komentari': kom}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Objekat uspesno promenjen"});
        })
    }

    // Dodaj objekat
    addObject = (req: express.Request, res: express.Response)=>{
        let object = new ObjekatModel({
            user: req.body.user,
            tip: req.body.tip,
            adresa: req.body.adresa,
            prostorije: req.body.prostorije,
            kvadratura: req.body.kvadratura,
            radnika: 0,
            canvas: req.body.canvas
        })

        console.log(req.body.tip);
        
        object.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"Objekat dodat."});
        })
    }

    getAllObjects = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;

        ObjekatModel.find({'user': user}, (err, objekti)=>{
            if(err) console.log(err);
            else res.json(objekti);
        })
    }
    
    editObject = (req: express.Request, res: express.Response)=>{
        let userEdt = req.body.userEdit;
        let adresaEdt = req.body.adresaEdit;    // adresa objekta kog editujemo
        let tip = req.body.tip;
        let adresa = req.body.adresa;
        let prostorije = req.body.prostorije;
        let kvadratura = req.body.kvadratura;
        let canvas = req.body.canvas;

        ObjekatModel.updateOne({'user': userEdt, 'adresa': adresaEdt}, {$set: {'tip': tip, 'adresa': adresa, 'prostorije': prostorije, 'kvadratura': kvadratura, 'canvas': canvas}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Objekat uspesno promenjen"});
        })
    }

    deleteObject = (req: express.Request, res: express.Response)=>{
        let tip = req.body.tip;
        let adresa = req.body.adresa;

        ObjekatModel.deleteOne({'tip': tip, 'adresa': adresa}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Objekat uspesno obrisan"});
        })
    }

    // POSLOVI - ZAHTEVI
    addZahtev = (req: express.Request, res: express.Response)=>{
        let zahtev = new ZahtevModel({
            user: req.body.user,
            agencija: req.body.agencija,
            adresa: req.body.adresa,
            rok: req.body.rok,
            status: req.body.status,
            ponuda: -1,
            gotovo: false
        })

        console.log(req.body.tip);
        
        zahtev.save((err, resp)=>{
            if(err) console.log(err);
            else res.json({"message":"Zahtev dodat."});
        })
    }

    getAllRequests = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;

        ZahtevModel.find({'agencija': agencija, 'status': { $in: ['prihvacenZahtev', 'neobradjenZahtev'] }}, (err, agencije)=>{
            if(err) console.log(err);
            else res.json(agencije);
        })
    }

    getAllFinishedRequests = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;

        ZahtevModel.find({'agencija': agencija, 'status': "zavrsen"}, (err, agencije)=>{
            if(err) console.log(err);
            else res.json(agencije);
        })
    }

    editZahtev = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;
        let ponuda = req.body.ponuda;

        ZahtevModel.updateOne({'user': client, 'agencija': agencija, 'adresa': adresa}, {$set: {'status': "prihvacenZahtev", 'ponuda': ponuda}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Objekat uspesno promenjen"});
        })
    }

    odbijZahtev = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;

        ZahtevModel.updateOne({'user': client, 'agencija': agencija, 'adresa': adresa}, {$set: {'status': "odbijenZahtev"}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Objekat uspesno promenjen"});
        })
    }

    getAllUserJobs = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;

        ZahtevModel.find({'user': user}, (err, zahtevi)=>{
            if(err) console.log(err);
            else res.json(zahtevi);
        })
    }

    prihvatiPonudu = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;

        ZahtevModel.updateOne({'user': client, 'agencija': agencija, 'adresa': adresa}, {$set: {'status': "aktivan"}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Uspeh"});
        })
    }

    odbijPonudu = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;

        ZahtevModel.deleteOne({'user': client, 'agencija': agencija, 'adresa': adresa}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Uspeh"});
        })
    }

    plati = (req: express.Request, res: express.Response)=>{
        let client = req.body.client;
        let agencija = req.body.agencija;
        let adresa = req.body.adresa;

        ZahtevModel.updateOne({'user': client, 'agencija': agencija, 'adresa': adresa}, {$set: {'status': "zavrsen"}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Uspeh"});
        })
    }

    filterJobs = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let status = req.body.status;

        ZahtevModel.find({'user': user, 'status': {$regex: status, $options: 'i'}}, (err, zahtevi)=>{
            if(err) console.log(err);
            else res.json(zahtevi);
        })
    }

    getAllActiveJobs = (req: express.Request, res: express.Response)=>{
        let agencija = req.body.agencija;

        ZahtevModel.find({'agencija': agencija, 'status': 'aktivan'}, (err, poslovi)=>{
            if(err) console.log(err);
            else res.json(poslovi);
        })
    }

    findCanvas = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let adresa = req.body.adresa;

        ObjekatModel.findOne({'user': user, 'adresa': adresa}, (err, obj)=>{
            if(err) console.log(err);
            else if(obj){
                res.json({
                    canvas: obj.canvas, 
                    radnika: obj.radnika
                });
            }
        })
    }

    setCanvas = (req: express.Request, res: express.Response)=>{
        let canvas = req.body.canvas;
        let user = req.body.user;
        let adresa = req.body.adresa;
        let gotovo = req.body.gotovo;

        ObjekatModel.updateOne({'user': user, 'adresa': adresa}, {$set: {'canvas': canvas}}, (err, resp)=>{
            if(err) console.log(err);
            else if(resp){
                ZahtevModel.updateOne({'user': user, 'adresa': adresa}, {$set: {'gotovo': gotovo}}, (err, resp)=>{
                    if(err) console.log(err);
                    else res.json({'message':"Uspeh"});
                })
            } 
        })
    }

    // ADMIN ==========================================
    getAllClients = (req: express.Request, res: express.Response)=>{
        ClientModel.find({'status':'prihvacen'}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    getAllClientsReq = (req: express.Request, res: express.Response)=>{
        ClientModel.find({'status':'zahtev'}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

    updateClient = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let contact = req.body.contact;
        let mail = req.body.mail;

        ClientModel.updateOne({'username': username}, {$set: {'firstname': firstname, 'lastname': lastname, 'contact': contact, 'mail': mail}}, (err, resp)=>{
            if(err) console.log(err);
            else if(resp){
                res.json({'message':"Uspeh"});
            } 
        })
    }

    updateAgency = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let name = req.body.name;
        let contact = req.body.contact;
        let mail = req.body.mail;
        let address = req.body.address;
        let description = req.body.description;

        AgencyModel.updateOne({'username': username}, {$set: {'name': name, 'contact': contact, 'mail': mail, 'address': address, 'description': description}}, (err, resp)=>{
            if(err) console.log(err);
            else if(resp){
                res.json({'message':"Uspeh"});
            } 
        })
    }

    deleteClient = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        ClientModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Uspeh"});
        })
    }

    deleteAgency = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        AgencyModel.deleteOne({'username': username}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message':"Uspeh"});
        })
    }

    editClient = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let contact = req.body.contact;
        let mail = req.body.mail;
        let image = req.body.image;

        ClientModel.updateOne({'username': username}, {$set: {'firstname': ime, 'lastname': prezime, 'contact': contact, 'mail': mail, 'image': image}}, (err, resp)=>{
            if(err) console.log(err);
            else if(resp) res.json({'message':"ok"});
        })
    }

    editAgency = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let name = req.body.name;
        let contact = req.body.contact;
        let mail = req.body.mail;
        let address = req.body.address;
        let description = req.body.description;
        let image = req.body.image;

        AgencyModel.updateOne({'username': username}, {$set: {'name': name, 'contact': contact, 'mail': mail, 'address':address, 'description':description, 'image': image}}, (err, resp)=>{
            if(err) console.log(err);
            else if(resp) res.json({'message':"ok"});
        })
    }

    isRated = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let agencija = req.body.agencija;        

        AgencyModel.findOne({ 'name': agencija, 'komentari.korisnik': user }, (err, obj) => {
            if (err) {
                console.log(err);
            } else if (obj) {
                const kom = obj.komentari.find(k => k.korisnik === user);
                res.json({
                    komentar: kom.komentar,
                    ocena: kom.ocena
                });
            }
            else {  // ako nismo nasli komentar od trazenog korisnika za datu agenciju
                res.json({
                    komentar: "",
                    ocena: ""
                });
            }
        })
    }

    editAgencyComm = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let agencija = req.body.agencija;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;

        AgencyModel.updateOne(
            { 'name': agencija },
            {
              $set: {
                'komentari.$[elem].komentar': komentar,
                'komentari.$[elem].ocena': ocena
              }
            },
            {
              arrayFilters: [{ 'elem.korisnik': user }]
            },
            (err, resp) => {
              if (err) {
                console.log(err);
              } else {
                res.json({ 'message': 'ok' });
              }
            }
          );
    }

    obrisiKomentar = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let agencija = req.body.agencija;

        AgencyModel.updateOne({ 'name': agencija}, {$pull: {'komentari' :{'korisnik': user }}}, (err, obj) => {
            if (err) {
                console.log(err);
            } else if (obj) {
                res.json({'message': 'ok'});
            }
        })
    }

    acceptClient = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let status = req.body.status;
        
        ClientModel.updateOne({'username': username}, {$set: {'status': status}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    acceptAgency = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let status = req.body.status;
        
        AgencyModel.updateOne({'username': username}, {$set: {'status': status}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    postaviBrRadnika = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let radnici = req.body.radnici;
        
        AgencyModel.updateOne({'username': username}, {$set: {'radnici': radnici}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    dodajRadnaMestaZahtev = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let radnihMestaZahtev = req.body.radnihMestaZahtev;
        
        AgencyModel.updateOne({'username': username}, {$set: {'radnihMestaZahtev': radnihMestaZahtev}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    odobriRadnaMesta = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let radnaMesta = req.body.radnaMesta;
        
        AgencyModel.updateOne({'username': username}, {$set: {'radnihMesta': radnaMesta, 'radnihMestaZahtev': 0}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    dodajRadnikeObjektu = (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        let adresa = req.body.adresa;
        let brRadnika = req.body.brRadnika;
        
        ObjekatModel.updateOne({'user': user, 'adresa': adresa}, {$inc: {'radnika': brRadnika}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'});
        })
    }

    getAllJobs = (req: express.Request, res: express.Response)=>{
        ZahtevModel.find({}, (err, agencies)=>{
            if(err) console.log(err);
            else res.json(agencies);
        })
    }

}