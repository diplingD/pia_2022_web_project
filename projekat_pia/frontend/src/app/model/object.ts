export class Objekat {
    tip: string;
    adresa: string;
    prostorije: number;
    kvadratura: number;
    radnika: number;
    canvas: {
      brSoba: number;
      brVrata: number;
      koordinateSoba: {
        x: number;
        y: number;
        width: number;
        height: number;
        color: string;
      }[];
      koordinateVrata: {
        x: number;
        y: number;
        width: number;
        height: number;
      }[];
    };
  }