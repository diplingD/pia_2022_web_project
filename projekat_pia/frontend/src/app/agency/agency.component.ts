import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Agency } from '../model/agency';
import { Zahtev } from '../model/zahtev';
import { Client } from '../model/client';
import { Objekat } from '../model/object';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    this.findAgency();

    this.canvas = document.querySelector('#canvas1');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 300;
    this.canvas.height = 300;

    let is_mouse_in_shape = (x, y, kvadrat) => {
      let shape_left = kvadrat.x;
      let shape_right = kvadrat.x + kvadrat.width;
      let shape_top = kvadrat.y;
      let shape_bottom = kvadrat.y + kvadrat.height;

      if(x > shape_left && x < shape_right && y > shape_top && y < shape_bottom) {
        return true;
      }
      return false;
    }

    this.canvas.addEventListener("click", (event) => { 
      if(this.statusSobe == 'zapoceto' || this.statusSobe == 'zavrseno'){
        let x = event.offsetX;
        let y = event.offsetY;

        for(let i=0; i<this.canvasSkica.brSoba; i++){   // idem kroz svaki pravougaonik i dok ne naidjem na onog na koji sam kliknuo, preskacem
          let pravougaonik = this.canvasSkica.koordinateSoba[i];

          if(is_mouse_in_shape(x, y, pravougaonik)){
            if(this.statusSobe == 'zapoceto'){
              this.ctx.fillStyle = 'red';
              this.canvasSkica.koordinateSoba[i].color = "red";
            } 
            else if(this.statusSobe == 'zavrseno'){
              this.ctx.fillStyle = 'green';
              this.canvasSkica.koordinateSoba[i].color = "green";
            } 
            this.ctx.fillRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
            this.ctx.strokeRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);

            for(let i=0; i < this.canvasSkica.brVrata; i++){
              this.ctx.fillStyle = 'brown';
              this.ctx.fillRect(this.canvasSkica.koordinateVrata[i].x, this.canvasSkica.koordinateVrata[i].y, this.canvasSkica.koordinateVrata[i].width, this.canvasSkica.koordinateVrata[i].height);
            }

            return;
          }
        }
      }    
    
    })



  }

  username: string;
  password: string;
  image: string;
  message: string;
  name: string;
  address: string;
  description: string;
  contact: string;
  mail: string;
  ponuda: number;
  statusSobe: string;   // postavljamo iz html-a

  sviZahtevi: Zahtev[] = [];
  sviAktivni: Zahtev[] = [];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasSkica: any; // ovo je canvas objekat koji uzimam iz baze iz Objekti (ima sva ona polja: x , y, width, height)

  // Unose se sa forme za promenu lozinke:
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  radnici: number;
  radnihMesta: number;

  findAgency() {
    this.userService.findAgency(this.username).subscribe((agency: Agency)=>{
      if(agency){
        this.image = agency.image;
        this.name = agency.name;
        this.address = agency.address;
        this.description = agency.description;
        this.contact = agency.contact;
        this.mail = agency.mail;

        this.radnici = agency.radnici;
        this.radnihMesta = agency.radnihMesta;

        this.userService.getAllRequests(this.name).subscribe((data: Zahtev[])=>{
          this.sviZahtevi = data;
        })

        this.userService.getAllActiveJobs(this.name).subscribe((data: Zahtev[])=>{
          this.sviAktivni = data;
        })
      }
      else {
        console.log("neuspeh slika");
      }
    });
  }
  
  alreadyChangedPass: boolean = false;
  changePassword() {
    if(this.isDisabled() == true) {
      this.message = "Morate uneti sva polja."
      return;
    }
    if(this.isPasswordValid() == false) return;    

    if(this.oldPassword != this.password) {
      this.message = "Stara lozinka nije ispravna.";
      return;
    }

    if(this.newPassword != this.repeatPassword) {
      this.message = "Ponovljena lozinka mora biti ista kao nova.";
      return;
    }

    this.userService.changePassword("agency", this.username, this.newPassword).subscribe(resp=>{    //subscribe - cekam odgovor u userFromDB
      if(resp){
        // obrisi sva polja i message
        this.oldPassword = this.newPassword = this.repeatPassword = this.message = null;
        this.alreadyChangedPass = true;
        this.ngOnInit();
      }
      else {
        this.message = "Promena lozinke neuspesna."
      }
    })

  }

  isDisabled(): boolean {     // ako nisu uneta sva polja -> disabled
    if(this.oldPassword && this.newPassword && this.repeatPassword) return false;
      else return true;
  }

  isPasswordValid(): boolean {   //pomocna funkcija koja proverava ispravnost lozinke
    if(this.newPassword.length<7 || this.newPassword.length>12) {
      this.message = "Lozinka mora da sadrzi najmanje 7, a najvise 12 karaktera."
      return false;
    }

    const firstCaracter = this.newPassword.charAt(0);
    if(!/[a-zA-Z]/.test(firstCaracter)) {
      this.message = "Prvi karakter lozinke mora biti slovo."
      return false;
    }

    if(!/[A-Z]/.test(this.newPassword) || !/[0-9]/.test(this.newPassword) || !/[^a-zA-Z0-9]/.test(this.newPassword)) {
      this.message = "Lozinka mora sadrzati bar jedno veliko slovo, jedan broj i jedan specijalni karakter."
      return false;
    }

    return true;  //proslo je sve uslove
  }

  // POSLOVI - ZAHTEVI
  prihvatiZahtev() {    
    this.userService.editZahtev(this.clientUsername, this.name, this.adresaZahteva, this.ponuda).subscribe(resp=>{
      if(resp){          
        //alert("Ponuda poslata")
        this.otkaziPrikazKlijenta();
      }
      else {
        this.message = "Promena lozinke neuspesna."
      }
    })
    
  }

  odbijZahtev(client: string, adresa: string) {
    this.userService.odbijZahtev(client, this.name, adresa).subscribe(resp=>{
      if(resp){
      }
      else {
        this.message = "Neuspeh!"
      }
    })

    this.ngOnInit();
  }
  
  showCanvas(user: string, address: string) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.userService.findCanvas(user, address).subscribe((data: any)=>{
      if(data){
        this.canvasSkica = data.canvas;

        if(data.radnika < this.canvasSkica.brSoba){   // ako objekat ima manje radnika nogo soba
          for(let i=0; i < this.canvasSkica.brSoba; i++){
            this.canvasSkica.koordinateSoba[i].color = "yellow";
            this.ctx.fillStyle = 'yellow';
            this.ctx.fillRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
            this.ctx.strokeRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
          }
          for(let i=0; i < this.canvasSkica.brVrata; i++){
            this.ctx.fillStyle = 'brown';
            this.ctx.fillRect(this.canvasSkica.koordinateVrata[i].x, this.canvasSkica.koordinateVrata[i].y, this.canvasSkica.koordinateVrata[i].width, this.canvasSkica.koordinateVrata[i].height);
          }
          
          return;
        }

        // regularan broj radnika
        for(let i=0; i < this.canvasSkica.brSoba; i++){
          // ako postoji boja onda filluj
          if(this.canvasSkica.koordinateSoba[i].color == "red"){
            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
            this.ctx.strokeRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
          } else if(this.canvasSkica.koordinateSoba[i].color == "green") {
            this.ctx.fillStyle = 'green';
            this.ctx.fillRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
            this.ctx.strokeRect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
          } 
          else {
            this.canvasSkica.koordinateSoba[i].color = null;
            this.ctx.beginPath();
            this.ctx.rect(this.canvasSkica.koordinateSoba[i].x, this.canvasSkica.koordinateSoba[i].y, this.canvasSkica.koordinateSoba[i].width, this.canvasSkica.koordinateSoba[i].height);
            this.ctx.stroke();
          }          
        }
        for(let i=0; i < this.canvasSkica.brVrata; i++){
          this.ctx.fillStyle = 'brown';
          this.ctx.fillRect(this.canvasSkica.koordinateVrata[i].x, this.canvasSkica.koordinateVrata[i].y, this.canvasSkica.koordinateVrata[i].width, this.canvasSkica.koordinateVrata[i].height);
        }
      }
      else {
        alert("Neuspeh");
      }
    })
    
  }

  opremanjeSobe(user: string, address: string) {
    //console.log(this.canvasSkica);
    this.userService.findCanvas(user, address).subscribe((data: any)=>{
      if(data){
        if(data.radnika < this.canvasSkica.brSoba){   // ako objekat ima manje radnika nogo soba
          for(let i=0; i < this.canvasSkica.brSoba; i++){
            this.canvasSkica.koordinateSoba[i].color = "yellow";
            
          }
        }

        let gotovo = true;
        for(let i=0; i<this.canvasSkica.brSoba; i++){
          if(this.canvasSkica.koordinateSoba[i].color != "green") {
            gotovo = false;
          }
        }

        this.userService.setCanvas(this.canvasSkica, user, address, gotovo).subscribe(resp=>{
          if(resp){
            this.clearCanvas();
          }
          else{
            alert("Greska");
          }
        })

      }
    })
    
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.statusSobe = null;
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  showClient: boolean = false;
  clientUsername; string;
  clientFirstname: string;
  clientLastname: string;
  clientContact: string;
  clientMail: string;

  adresaZahteva: string;
  prikaziKlijenta(username: string, adresaZahteva: string){
    this.showClient = true;
    this.clientUsername = username;
    this.adresaZahteva = adresaZahteva;

    this.userService.findClientByUsername(username).subscribe((resp:Client)=>{
      if(resp){
        this.clientFirstname = resp.firstname;
        this.clientLastname = resp.lastname;
        this.clientContact = resp.contact;
        this.clientMail = resp.mail;
      }
      else{
        alert("Greska");
      }
    })
  }
  otkaziPrikazKlijenta(){
    this.ponuda = 0;
    this.showClient = false;
  }

  showObject: boolean = false;
  objekatTip: string;
  objekatProstorije: number;
  objekatKvadratura: number;

  prikaziObjekat(username: string, adresaZahteva: string){
    this.showObject = true;

    this.userService.findObject(username, adresaZahteva).subscribe((resp:Objekat)=>{
      if(resp){
        this.objekatTip = resp.tip;
        this.objekatProstorije = resp.prostorije;
        this.objekatKvadratura = resp.kvadratura;
      }
      else{
        alert("Greska");
      }
    })
  }
  otkaziPrikazObjektra(){
    this.showObject = false;
  }

  // =============== RADNICI ==================
  dodajRadnika(){
    if(this.radnici < this.radnihMesta){
      this.userService.postaviBrRadnika(this.username, this.radnici+1).subscribe(resp=>{
        if(resp){
          this.radnici++;
          this.ngOnInit();
        }
        else{
          alert("Greska");
        }
      })
    }
  }

  radnihMestaZahtev: number;
  message2: string;
  zahtevajRadnaMesta(){
    if(this.radnihMestaZahtev<=0){
      this.message2 = "Zahtevajte 1 ili vise radnih mesta!"
      return;
    }
    this.userService.dodajRadnaMestaZahtev(this.username, this.radnihMestaZahtev).subscribe(resp=>{
      if(resp){
        this.message2 = this.radnihMestaZahtev = null;
      }
      else{
        alert("Greska");
      }
    })
  }

  brRadnika: number;
  message3: string;
  dodeliRadnikeObjektu(user: string, adresa: string){
    this.userService.findCanvas(user, adresa).subscribe((data: any)=>{
      if(data){
        this.canvasSkica = data.canvas;
        /*
        if(this.brRadnika < this.canvasSkica.brSoba){
          this.message3 = "Dodajte bar " + this.canvasSkica.brSoba + " radnika ovom objektu";
          return;
        }
        
        if(this.radnici < this.canvasSkica.brSoba){ //ako je br radnika agencije manji od onog koji je potreban objektu
          this.message3 = "Agencija nema dovoljan broj radnika!";
          return;
        }
        */
        if(this.brRadnika > this.radnici){  //ako je brRadnoka koje zelim da dodelim objektu > br radnika agencije
          this.message3 = "Agencija nema trazeni broj radnika!";
          return;
        }
        
        this.radnici -= this.brRadnika;
        this.userService.dodajRadnikeObjektu(user, adresa, this.brRadnika).subscribe(resp=>{
          if(resp){
            // smanji br radnika Agenciji
            this.userService.postaviBrRadnika(this.username, this.radnici).subscribe(resp=>{
              if(resp){
                this.ngOnInit();
              }
              else{
                alert("Greska");
              }
            })
    
            this.message3 = this.brRadnika = null;
          }
          else{
            alert("Greska");
          }
        })

      }
    })

    

  }

  azurirajAgenciju(){
    sessionStorage.setItem('username',this.username);
    sessionStorage.setItem('name',this.name);
    sessionStorage.setItem('mail', this.mail);
    sessionStorage.setItem('contact', this.contact);
    sessionStorage.setItem('image', this.image);
    sessionStorage.setItem('address', this.address);
    sessionStorage.setItem('description', this.description);

    this.router.navigate(['edit-agency']);
  }


}
