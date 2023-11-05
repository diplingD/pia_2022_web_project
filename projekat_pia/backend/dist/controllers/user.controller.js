"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControler = void 0;
const client_1 = __importDefault(require("../models/client"));
const agency_1 = __importDefault(require("../models/agency"));
const admin_1 = __importDefault(require("../models/admin"));
const object_1 = __importDefault(require("../models/object"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
class UserControler {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            client_1.default.findOne({ 'username': username, 'password': password, 'status': "prihvacen" }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    if (user == null) {
                        agency_1.default.findOne({ 'username': username, 'password': password, 'status': "prihvacen" }, (err, user) => {
                            if (err)
                                console.log(err);
                            else
                                res.json(user);
                        });
                    }
                    else
                        res.json(user);
                }
            });
        };
        this.loginAdmin = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            admin_1.default.findOne({ 'username': username, 'password': password }, (err, admin) => {
                if (err)
                    console.log(err);
                else
                    res.json(admin);
            });
        };
        this.registerClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let client = new client_1.default({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                contact: req.body.contact,
                mail: req.body.mail,
                type: req.body.type,
                image: req.body.image,
                status: req.body.status
            });
            let username2 = req.body.username;
            let mail2 = req.body.mail;
            client_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                if (err)
                    console.log(err);
                else if (!user) { // nismo nasli username ili mail medju klijentima -> idemo dalje na agencije
                    agency_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                        if (err)
                            console.log(err);
                        else if (!user) { // nismo nasli username medju agencijama -> idemo dalje na admine
                            admin_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                                if (err)
                                    console.log(err);
                                else if (!user) { // nismo nasli username ni medju adminima - jedinstveni, dodaj u bazu klijenta
                                    client.save((err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ "message": "ok" });
                                    });
                                }
                                else {
                                    res.json({ "message": "notUnique" });
                                }
                            });
                        }
                        else {
                            res.json({ "message": "notUnique" });
                        }
                    });
                }
                else {
                    res.json({ "message": "notUnique" });
                }
            });
        });
        this.registerAgency = (req, res) => {
            let agency = new agency_1.default({
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
            });
            let username2 = req.body.username;
            let mail2 = req.body.mail;
            client_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                if (err)
                    console.log(err);
                else if (!user) { // nismo nasli username ili mail medju klijentima -> idemo dalje na agencije
                    agency_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                        if (err)
                            console.log(err);
                        else if (!user) { // nismo nasli username medju agencijama -> idemo dalje na admine
                            admin_1.default.findOne({ $or: [{ 'username': username2 }, { 'mail': mail2 }] }, (err, user) => {
                                if (err)
                                    console.log(err);
                                else if (!user) { // nismo nasli username ni medju adminima
                                    agency.save((err, resp) => {
                                        if (err)
                                            console.log(err);
                                        else
                                            res.json({ "message": "ok" });
                                    });
                                }
                                else {
                                    res.json({ "message": "notUnique" });
                                }
                            });
                        }
                        else {
                            res.json({ "message": "notUnique" });
                        }
                    });
                }
                else {
                    res.json({ "message": "notUnique" });
                }
            });
        };
        this.changePassword = (req, res) => {
            let userType = req.body.userType;
            let username = req.body.username;
            let newPassword = req.body.newPassword;
            if (userType == "client") {
                client_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': "Lozinka uspesno promenjena" });
                });
            }
            else if (userType == "agency") {
                agency_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': "Lozinka uspesno promenjena" });
                });
            }
            else if (userType == "admin") {
                admin_1.default.updateOne({ 'username': username }, { $set: { 'password': newPassword } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'message': "Lozinka uspesno promenjena" });
                });
            }
        };
        this.getAllAgencies = (req, res) => {
            agency_1.default.find({ 'status': "prihvacen" }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.getAllAgenciesReq = (req, res) => {
            agency_1.default.find({ 'status': "zahtev" }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        // pretraga agencija
        this.searchAgenciesName = (req, res) => {
            let name = req.body.name;
            agency_1.default.find({ 'name': { $regex: name, $options: "i" } }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.searchAgenciesAddress = (req, res) => {
            let address = req.body.address;
            agency_1.default.find({ 'address': { $regex: address, $options: "i" } }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.searchAgencies = (req, res) => {
            let name = req.body.name;
            let address = req.body.address;
            agency_1.default.find({ 'name': { $regex: name, $options: "i" }, 'address': { $regex: address, $options: "i" } }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        // oceni agenciju
        this.oceniAgenciju = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let komentar = req.body.komentar;
            let ocena = req.body.ocena;
            let kom = {
                korisnik: client,
                komentar: komentar,
                ocena: ocena
            };
            agency_1.default.updateOne({ 'name': agencija }, { $push: { 'komentari': kom } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Objekat uspesno promenjen" });
            });
        };
        // Dodaj objekat
        this.addObject = (req, res) => {
            let object = new object_1.default({
                user: req.body.user,
                tip: req.body.tip,
                adresa: req.body.adresa,
                prostorije: req.body.prostorije,
                kvadratura: req.body.kvadratura,
                radnika: 0,
                canvas: req.body.canvas
            });
            console.log(req.body.tip);
            object.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "Objekat dodat." });
            });
        };
        this.getAllObjects = (req, res) => {
            let user = req.body.user;
            object_1.default.find({ 'user': user }, (err, objekti) => {
                if (err)
                    console.log(err);
                else
                    res.json(objekti);
            });
        };
        this.editObject = (req, res) => {
            let userEdt = req.body.userEdit;
            let adresaEdt = req.body.adresaEdit; // adresa objekta kog editujemo
            let tip = req.body.tip;
            let adresa = req.body.adresa;
            let prostorije = req.body.prostorije;
            let kvadratura = req.body.kvadratura;
            let canvas = req.body.canvas;
            object_1.default.updateOne({ 'user': userEdt, 'adresa': adresaEdt }, { $set: { 'tip': tip, 'adresa': adresa, 'prostorije': prostorije, 'kvadratura': kvadratura, 'canvas': canvas } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Objekat uspesno promenjen" });
            });
        };
        this.deleteObject = (req, res) => {
            let tip = req.body.tip;
            let adresa = req.body.adresa;
            object_1.default.deleteOne({ 'tip': tip, 'adresa': adresa }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Objekat uspesno obrisan" });
            });
        };
        // POSLOVI - ZAHTEVI
        this.addZahtev = (req, res) => {
            let zahtev = new zahtev_1.default({
                user: req.body.user,
                agencija: req.body.agencija,
                adresa: req.body.adresa,
                rok: req.body.rok,
                status: req.body.status,
                ponuda: -1,
                gotovo: false
            });
            console.log(req.body.tip);
            zahtev.save((err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ "message": "Zahtev dodat." });
            });
        };
        this.getAllRequests = (req, res) => {
            let agencija = req.body.agencija;
            zahtev_1.default.find({ 'agencija': agencija, 'status': { $in: ['prihvacenZahtev', 'neobradjenZahtev'] } }, (err, agencije) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencije);
            });
        };
        this.getAllFinishedRequests = (req, res) => {
            let agencija = req.body.agencija;
            zahtev_1.default.find({ 'agencija': agencija, 'status': "zavrsen" }, (err, agencije) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencije);
            });
        };
        this.editZahtev = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let adresa = req.body.adresa;
            let ponuda = req.body.ponuda;
            zahtev_1.default.updateOne({ 'user': client, 'agencija': agencija, 'adresa': adresa }, { $set: { 'status': "prihvacenZahtev", 'ponuda': ponuda } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Objekat uspesno promenjen" });
            });
        };
        this.odbijZahtev = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let adresa = req.body.adresa;
            zahtev_1.default.updateOne({ 'user': client, 'agencija': agencija, 'adresa': adresa }, { $set: { 'status': "odbijenZahtev" } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Objekat uspesno promenjen" });
            });
        };
        this.getAllUserJobs = (req, res) => {
            let user = req.body.user;
            zahtev_1.default.find({ 'user': user }, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.prihvatiPonudu = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let adresa = req.body.adresa;
            zahtev_1.default.updateOne({ 'user': client, 'agencija': agencija, 'adresa': adresa }, { $set: { 'status': "aktivan" } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Uspeh" });
            });
        };
        this.odbijPonudu = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let adresa = req.body.adresa;
            zahtev_1.default.deleteOne({ 'user': client, 'agencija': agencija, 'adresa': adresa }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Uspeh" });
            });
        };
        this.plati = (req, res) => {
            let client = req.body.client;
            let agencija = req.body.agencija;
            let adresa = req.body.adresa;
            zahtev_1.default.updateOne({ 'user': client, 'agencija': agencija, 'adresa': adresa }, { $set: { 'status': "zavrsen" } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Uspeh" });
            });
        };
        this.filterJobs = (req, res) => {
            let user = req.body.user;
            let status = req.body.status;
            zahtev_1.default.find({ 'user': user, 'status': { $regex: status, $options: 'i' } }, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else
                    res.json(zahtevi);
            });
        };
        this.getAllActiveJobs = (req, res) => {
            let agencija = req.body.agencija;
            zahtev_1.default.find({ 'agencija': agencija, 'status': 'aktivan' }, (err, poslovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(poslovi);
            });
        };
        this.findCanvas = (req, res) => {
            let user = req.body.user;
            let adresa = req.body.adresa;
            object_1.default.findOne({ 'user': user, 'adresa': adresa }, (err, obj) => {
                if (err)
                    console.log(err);
                else if (obj) {
                    res.json({
                        canvas: obj.canvas,
                        radnika: obj.radnika
                    });
                }
            });
        };
        this.setCanvas = (req, res) => {
            let canvas = req.body.canvas;
            let user = req.body.user;
            let adresa = req.body.adresa;
            let gotovo = req.body.gotovo;
            object_1.default.updateOne({ 'user': user, 'adresa': adresa }, { $set: { 'canvas': canvas } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp) {
                    zahtev_1.default.updateOne({ 'user': user, 'adresa': adresa }, { $set: { 'gotovo': gotovo } }, (err, resp) => {
                        if (err)
                            console.log(err);
                        else
                            res.json({ 'message': "Uspeh" });
                    });
                }
            });
        };
        // ADMIN ==========================================
        this.getAllClients = (req, res) => {
            client_1.default.find({ 'status': 'prihvacen' }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.getAllClientsReq = (req, res) => {
            client_1.default.find({ 'status': 'zahtev' }, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
        this.updateClient = (req, res) => {
            let username = req.body.username;
            let firstname = req.body.firstname;
            let lastname = req.body.lastname;
            let contact = req.body.contact;
            let mail = req.body.mail;
            client_1.default.updateOne({ 'username': username }, { $set: { 'firstname': firstname, 'lastname': lastname, 'contact': contact, 'mail': mail } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp) {
                    res.json({ 'message': "Uspeh" });
                }
            });
        };
        this.updateAgency = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let contact = req.body.contact;
            let mail = req.body.mail;
            let address = req.body.address;
            let description = req.body.description;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'name': name, 'contact': contact, 'mail': mail, 'address': address, 'description': description } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp) {
                    res.json({ 'message': "Uspeh" });
                }
            });
        };
        this.deleteClient = (req, res) => {
            let username = req.body.username;
            client_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Uspeh" });
            });
        };
        this.deleteAgency = (req, res) => {
            let username = req.body.username;
            agency_1.default.deleteOne({ 'username': username }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': "Uspeh" });
            });
        };
        this.editClient = (req, res) => {
            let username = req.body.username;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let contact = req.body.contact;
            let mail = req.body.mail;
            let image = req.body.image;
            client_1.default.updateOne({ 'username': username }, { $set: { 'firstname': ime, 'lastname': prezime, 'contact': contact, 'mail': mail, 'image': image } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp)
                    res.json({ 'message': "ok" });
            });
        };
        this.editAgency = (req, res) => {
            let username = req.body.username;
            let name = req.body.name;
            let contact = req.body.contact;
            let mail = req.body.mail;
            let address = req.body.address;
            let description = req.body.description;
            let image = req.body.image;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'name': name, 'contact': contact, 'mail': mail, 'address': address, 'description': description, 'image': image } }, (err, resp) => {
                if (err)
                    console.log(err);
                else if (resp)
                    res.json({ 'message': "ok" });
            });
        };
        this.isRated = (req, res) => {
            let user = req.body.user;
            let agencija = req.body.agencija;
            agency_1.default.findOne({ 'name': agencija, 'komentari.korisnik': user }, (err, obj) => {
                if (err) {
                    console.log(err);
                }
                else if (obj) {
                    const kom = obj.komentari.find(k => k.korisnik === user);
                    res.json({
                        komentar: kom.komentar,
                        ocena: kom.ocena
                    });
                }
                else { // ako nismo nasli komentar od trazenog korisnika za datu agenciju
                    res.json({
                        komentar: "",
                        ocena: ""
                    });
                }
            });
        };
        this.editAgencyComm = (req, res) => {
            let user = req.body.user;
            let agencija = req.body.agencija;
            let komentar = req.body.komentar;
            let ocena = req.body.ocena;
            agency_1.default.updateOne({ 'name': agencija }, {
                $set: {
                    'komentari.$[elem].komentar': komentar,
                    'komentari.$[elem].ocena': ocena
                }
            }, {
                arrayFilters: [{ 'elem.korisnik': user }]
            }, (err, resp) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.obrisiKomentar = (req, res) => {
            let user = req.body.user;
            let agencija = req.body.agencija;
            agency_1.default.updateOne({ 'name': agencija }, { $pull: { 'komentari': { 'korisnik': user } } }, (err, obj) => {
                if (err) {
                    console.log(err);
                }
                else if (obj) {
                    res.json({ 'message': 'ok' });
                }
            });
        };
        this.acceptClient = (req, res) => {
            let username = req.body.username;
            let status = req.body.status;
            client_1.default.updateOne({ 'username': username }, { $set: { 'status': status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.acceptAgency = (req, res) => {
            let username = req.body.username;
            let status = req.body.status;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'status': status } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.postaviBrRadnika = (req, res) => {
            let username = req.body.username;
            let radnici = req.body.radnici;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'radnici': radnici } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodajRadnaMestaZahtev = (req, res) => {
            let username = req.body.username;
            let radnihMestaZahtev = req.body.radnihMestaZahtev;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'radnihMestaZahtev': radnihMestaZahtev } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.odobriRadnaMesta = (req, res) => {
            let username = req.body.username;
            let radnaMesta = req.body.radnaMesta;
            agency_1.default.updateOne({ 'username': username }, { $set: { 'radnihMesta': radnaMesta, 'radnihMestaZahtev': 0 } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.dodajRadnikeObjektu = (req, res) => {
            let user = req.body.user;
            let adresa = req.body.adresa;
            let brRadnika = req.body.brRadnika;
            object_1.default.updateOne({ 'user': user, 'adresa': adresa }, { $inc: { 'radnika': brRadnika } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'message': 'ok' });
            });
        };
        this.getAllJobs = (req, res) => {
            zahtev_1.default.find({}, (err, agencies) => {
                if (err)
                    console.log(err);
                else
                    res.json(agencies);
            });
        };
    }
    findClient(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        client_1.default.findOne({ 'username': username, 'password': password }, (err, client) => {
            if (err)
                console.log(err);
            else
                res.json(client);
        });
    }
    findClientByUsername(req, res) {
        let username = req.body.username;
        client_1.default.findOne({ 'username': username }, (err, client) => {
            if (err)
                console.log(err);
            else
                res.json(client);
        });
    }
    findObject(req, res) {
        let user = req.body.user;
        let adresa = req.body.adresa;
        object_1.default.findOne({ 'user': user, 'adresa': adresa }, (err, obj) => {
            if (err)
                console.log(err);
            else
                res.json(obj);
        });
    }
    findAgency(req, res) {
        let username = req.body.username;
        agency_1.default.findOne({ 'username': username }, (err, agency) => {
            if (err)
                console.log(err);
            else
                res.json(agency);
        });
    }
}
exports.UserControler = UserControler;
//# sourceMappingURL=user.controller.js.map