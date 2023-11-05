import mongoose from "mongoose";

const Schema = mongoose.Schema; 

let Zahtev = new Schema({
    user: {             // korisnik koji trazi - klijent
      type: String
    },
    agencija: {         // od ove agencije da obradi
        type: String
    },
    adresa: {           // ovaj korisnikov objekat
      type: String
    },
    rok: {              // do ovog roka
      type: String
    },
    status: {           // status samo za zahteve: prihvacen, odbijen, neobradjen
      type: String
    },
    ponuda: {
      type: Number
    },
    gotovo: {
      type: Boolean
    }
  })

export default mongoose.model('ZahtevModel', Zahtev, 'zahtevi');