export class Zahtev{
    user: string;
    agencija: string;
    adresa: string;
    rok: string;
    status: string;     // neobradjenZahtev, prihvacenZahtev, odbijenZahtev -> aktivan, zavrsen
    ponuda: number;
    gotovo: boolean;
}

