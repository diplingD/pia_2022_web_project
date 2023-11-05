import mongoose from "mongoose";

const Schema = mongoose.Schema; 

let Zahtev = new Schema({
    user: {
      type: String,
    },
    agencija: {
        type: String,
    },
    adresa: {
      type: String,
    },
    rok: {
      type: String,
    },
    tip: {              // aktivan / zavrsen
      type: String,
    }
  })

export default mongoose.model('ZahtevModel', Zahtev, 'zahtevi');