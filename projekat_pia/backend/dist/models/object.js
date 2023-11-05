"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
});
exports.default = mongoose_1.default.model('ObjekatModel', Objekat, 'objects');
//# sourceMappingURL=object.js.map