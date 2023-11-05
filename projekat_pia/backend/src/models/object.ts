import mongoose from "mongoose";

const Schema = mongoose.Schema; 

let Objekat = new Schema({
    user: {
      type: String,
    },
    tip: {
      type: String,
    },
    adresa: {
      type: String,
    },
    prostorije: {
      type: Number,
    },
    kvadratura: {
      type: Number,
    },
    radnika: {
      type: Number,
    },
    canvas: {
      brSoba: {
        type: Number
      },
      brVrata: {
        type: Number
      },
      koordinateSoba: [
        {
          x: {
            type: Number
          },
          y: {
            type: Number
          },
          width: {
            type: Number
          },
          height: {
            type: Number
          },
          color: {
            type: String,
          }
        }
      ],
      koordinateVrata: [
        {
          x: {
            type: Number
          },
          y: {
            type: Number
          },
          width: {
            type: Number
          },
          height: {
            type: Number
          }
        }
      ]
    }

  })

export default mongoose.model('ObjekatModel', Objekat, 'objects');