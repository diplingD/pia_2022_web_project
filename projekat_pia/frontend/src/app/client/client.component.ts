import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Client } from '../model/client';
import { Pravougaonik } from '../model/rectaingle';
import { Objekat } from '../model/object';
import { Agency } from '../model/agency';
import { Zahtev } from '../model/zahtev';
import { Observable } from 'rxjs';
import { Canvas } from '../model/canvas';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.password = sessionStorage.getItem('password');
    this.findImage();

    this.canvas = document.querySelector('#canvas1');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 300;
    this.canvas.height = 300;

    this.canvas2 = this.elementRef.nativeElement.querySelector('#canvas2');
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas2.width = 300;
    this.canvas2.height = 300;

    this.canvas3 = this.elementRef.nativeElement.querySelector('#canvas3');
    this.ctx3 = this.canvas3.getContext('2d');
    this.canvas3.width = 300;
    this.canvas3.height = 300;
    
    this.canvas.addEventListener("click", (event) => {
      let x = event.offsetX;
      let y = event.offsetY;

      if(this.drawingDoors){    // crtamo vrata
        const novaVrata = new Pravougaonik(x, y, 20, 20);
        const preklapaSe = this.doors.some((door) => door.intersects(novaVrata));
        
        if(!preklapaSe){
          if(novaVrata.x + novaVrata.width < this.canvas.width && novaVrata.y + novaVrata.height < this.canvas.height) {
            this.doors.push(novaVrata);
            draw_shapes.bind(this)();
          }
        }
      }
      else {    // crtamo sobu
        const noviKvadrat = new Pravougaonik(x, y, this.rectWidth, this.rectHeight);
        
        const preklapaSe = this.kvadrati.some((kvadrat) => kvadrat.intersects(noviKvadrat));  //ako se bar sa jednim preklapa, vratice true

        if (!preklapaSe && this.kvadrati.length<this.prostorijeObj && this.rectWidth>0 && this.rectHeight>0) {
          if(noviKvadrat.x + noviKvadrat.width < this.canvas.width && noviKvadrat.y + noviKvadrat.height < this.canvas.height) {
            this.kvadrati.push(noviKvadrat);
            draw_shapes.bind(this)();
          }        
        }
      }
      
        
    })

    
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

    let mouse_down = (event) => {
      event.preventDefault();
      
      //this.startX = parseInt(event.offsetX);
      //this.startY = parseInt(event.offsetY);

      let index=0;
      
      if(!this.drawingDoors) {    // pomeramo sobu
        this.startX = parseInt(event.offsetX);
        this.startY = parseInt(event.offsetY);

        for(let kvadrat of this.kvadrati) {
          if(is_mouse_in_shape(this.startX, this.startY, kvadrat)){
            this.current_shape_index = index;
            this.is_dragging = true;
            return;
          }
          index++;
        }
      }
      else {  // pomeramo vrata
        this.startDoorX = parseInt(event.offsetX);
        this.startDoorY = parseInt(event.offsetY);

        for(let vrata of this.doors) {
          if(is_mouse_in_shape(this.startDoorX, this.startDoorY, vrata)){
            this.current_door_index = index;
            this.is_dragging = true;
            return;
          }
          index++;
        }
      }
    }

    let mouse_up = (event) => {
      if(!this.is_dragging){
        return;
      }

      event.preventDefault();
      this.is_dragging = false;
    }

    let mouse_out = (event) => {
      if(!this.is_dragging){
        return;
      }

      event.preventDefault();
      this.is_dragging = false;
    }

    let mouse_move = (event) => {
      if(!this.is_dragging){
        return;
      } else {
        event.preventDefault();
        let mouseX = parseInt(event.offsetX);
        let mouseY = parseInt(event.offsetY);
        
        let dx;
        let dy;

        let current_shape = this.kvadrati[this.current_shape_index];
        let current_door = this.doors[this.current_door_index];

        
        if(!this.drawingDoors){
          dx = mouseX - this.startX;
          dy = mouseY - this.startY;

          // Provera preklapanja sa drugim kvadratima
          let preklapaSe = this.kvadrati.some((kvadrat, index) => {
            if (index !== this.current_shape_index) {
              return kvadrat.intersects(new Pravougaonik(
                current_shape.x + dx,
                current_shape.y + dy,
                current_shape.width,
                current_shape.height
              ));
            }
            return false;
          });

          if(!preklapaSe){
            if(current_shape.x + dx + current_shape.width < this.canvas.width && current_shape.x + dx > 0){
              current_shape.x += dx;
            }          
            if(current_shape.y + dy + current_shape.height < this.canvas.height && current_shape.y + dy > 0){
              current_shape.y += dy;
            }
          }        
  
          draw_shapes();
  
          this.startX = mouseX;
          this.startY = mouseY;
        }       
        else {
          dx = mouseX - this.startDoorX;
          dy = mouseY - this.startDoorY;
          
          if(current_door.x + dx + current_door.width < this.canvas.width && current_door.x + dx > 0){
            current_door.x += dx;
          }          
          if(current_door.y + dy + current_door.height < this.canvas.height && current_door.y + dy > 0){
            current_door.y += dy;
          }    
  
          draw_shapes();
  
          this.startDoorX = mouseX;
          this.startDoorY = mouseY;
        }
        
      }
    }

    this.canvas.onmousedown = mouse_down;
    this.canvas.onmouseup = mouse_up;
    this.canvas.onmouseout = mouse_out;
    this.canvas.onmousemove = mouse_move;

    let draw_shapes = function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for(let kvadrat of this.kvadrati){        
        this.ctx.beginPath();
        this.ctx.rect(kvadrat.x, kvadrat.y, kvadrat.width, kvadrat.height);
        this.ctx.stroke();
      }
      for(let door of this.doors){
        this.ctx.fillStyle = 'brown';
        this.ctx.fillRect(door.x, door.y, door.width, door.height);
      }
    }.bind(this);
    draw_shapes();

    this.userService.getAllObjects(this.username).subscribe((data: Objekat[])=>{
      this.allObjects = data;
    })
    this.userService.getAllAgencies().subscribe((data: Agency[])=>{
      this.allAgencies = data;
    })
    this.userService.getAllUserJobs(this.username).subscribe((data: Zahtev[])=>{
      this.sviPoslovi = data;
    })
  }

  username: string;
  password: string;
  image: string;
  message: string;
  firstname: string;
  lastname: string;
  contact: string;
  mail: string;

  // canvas
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  kvadrati: Pravougaonik[] = [];
  selectedRect: Pravougaonik = null;
  offsetX: number;
  offsetY: number;
  current_shape_index: number = null;
  is_dragging: boolean = false;
  startX: number;
  startY: number;

  canvas2: HTMLCanvasElement;
  ctx2: CanvasRenderingContext2D;

  canvas3: HTMLCanvasElement;
  ctx3: CanvasRenderingContext2D;

  rectHeight: number;
  rectWidth: number;
  drawingDoors: boolean = false;   // da li crtamo vrata
  doors: Pravougaonik[] = [];
  selectedDoor: Pravougaonik = null;
  current_door_index: number = null;
  startDoorX: number;
  startDoorY: number;

  // Unose se sa forme za promenu lozinke:
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;

  // Objekat
  tipObj: string;
  adresaObj: string;
  prostorijeObj: number;
  kvadratura: number;
  allObjects: Objekat[] = [];
  message2: string;
  

  findImage() {
    this.userService.findClient(this.username, this.password).subscribe((client: Client)=>{
      if(client){
        this.image = client.image;
        this.firstname = client.firstname;
        this.lastname = client.lastname;
        this.contact = client.contact;
        this.mail = client.mail;
      }
      else {
        console.log("neuspeh");
      }
    });
  }

  // Dodavanje objekta
  addObject() {
    if( !(this.tipObj && this.adresaObj && this.prostorijeObj && this.kvadratura)){
      this.message2 = "Unesite sva polja!";
      return;
    }
    if(this.prostorijeObj<=0 || this.kvadratura<=0){
      this.message2 = "Broj prostorija i kvadratura su celi brojevi veci od 0!";
      return;
    }
    if(this.prostorijeObj>3){
      this.message2 = "Maksimalni broj prostorija je 3!";
      return;
    }

    if(this.doors.length<=0){
      this.message2 = "Objekat ne sadrzi ni jedna vrata!";
      return;
    }
    if(this.kvadrati.length<=0){
      this.message2 = "Objekat ne sadrzi ni jednu sobu!";
      return;
    }
    if(this.kvadrati.length!=this.prostorijeObj){
      this.message2 = "Niste nacrtali zadati broj prostorija!";
      return;
    }

    const kanvas = {
      brSoba: this.kvadrati.length,
      brVrata: this.doors.length,
      koordinateSoba: this.kvadrati.map(kvadrat => ({
        x: kvadrat.x,
        y: kvadrat.y,
        width: kvadrat.width,
        height: kvadrat.height,
        color: null
      })),
      koordinateVrata: this.doors.map(door => ({
        x: door.x,
        y: door.y,
        width: door.width,
        height: door.height
      }))
    };

    this.userService.addObject(this.username, this.tipObj, this.adresaObj, this.prostorijeObj, this.kvadratura, kanvas).subscribe(resp => {
      if (resp) {
        this.ngOnInit();
        this.clearCanvas();
        this.tipObj = this.adresaObj = this.prostorijeObj = this.kvadratura = null;
      } else {
        alert("Objekat nije dodat.");
      }
    });

  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.kvadrati = []
    this.doors = [];
    this.rectHeight = this.rectWidth = this.drawingDoors = this.message2 = null;
  }

  // dodavanje objekta preko JSON fajla
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const contents = e.target.result;
      const json = JSON.parse(contents);
      //console.log(json);

      // Dodajemo JSON u bazu
      this.userService.addObject(json.user, json.tip, json.adresa, json.prostorije, json.kvadratura, json.canvas).subscribe(resp=>{    //subscribe - cekam odgovor u userFromDB
        if(resp){
          alert(resp['message']);
        }
        else {
          alert("Objekat nije dodat.");
        }
      })
      
    };

    reader.readAsText(file);
    this.ngOnInit();
  }

  // za prikazivanje na canvasu 2
  showCanvas(canvas: any) {
    this.ctx2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);

    for(let i=0; i < canvas.brSoba; i++){
      /*
      if(canvas.koordinateSoba[i].color == "red"){
        this.ctx2.fillStyle = 'red';
        this.ctx2.fillRect(canvas.koordinateSoba[i].x, canvas.koordinateSoba[i].y, canvas.koordinateSoba[i].width, canvas.koordinateSoba[i].height);
        this.ctx2.strokeRect(canvas.koordinateSoba[i].x, canvas.koordinateSoba[i].y, canvas.koordinateSoba[i].width, canvas.koordinateSoba[i].height);
      } else if(canvas.koordinateSoba[i].color == "green") {
        this.ctx2.fillStyle = 'green';
        this.ctx2.fillRect(canvas.koordinateSoba[i].x, canvas.koordinateSoba[i].y, canvas.koordinateSoba[i].width, canvas.koordinateSoba[i].height);
        this.ctx2.strokeRect(canvas.koordinateSoba[i].x, canvas.koordinateSoba[i].y, canvas.koordinateSoba[i].width, canvas.koordinateSoba[i].height);
      } 
      else {
        */
        this.ctx2.beginPath();
        this.ctx2.strokeRect(canvas.koordinateSoba[i].x, canvas.koordinateSoba[i].y, canvas.koordinateSoba[i].width, canvas.koordinateSoba[i].height);
        //this.ctx2.stroke();
      //}
    }
    for(let i=0; i < canvas.brVrata; i++){
      this.ctx2.fillStyle = 'brown';
      this.ctx2.fillRect(canvas.koordinateVrata[i].x, canvas.koordinateVrata[i].y, canvas.koordinateVrata[i].width, canvas.koordinateVrata[i].height);
    }
  }

  editCanvas(tip: string, adresa: string, prostorije: Number, kvadratura: Number) {
    sessionStorage.setItem("userObj", this.username);
    sessionStorage.setItem("adresaObj", adresa);
    sessionStorage.setItem("tipObj", tip);
    sessionStorage.setItem("prostorijeObj", prostorije.toString());
    sessionStorage.setItem("kvadraturaObj", kvadratura.toString());

    this.router.navigate(['edit-obj']);
  }

  deleteObject(tip: string, adresa: string) {
    this.userService.deleteObject(tip, adresa).subscribe(resp=>{    //subscribe - cekam odgovor u userFromDB
      if(resp){
      }
      else {
        alert("Objekat nije obrisan.");
      }
    }) 

    this.ngOnInit();
  }

  // Promena lozinke
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

    this.userService.changePassword("client", this.username, this.newPassword).subscribe(resp=>{    //subscribe - cekam odgovor u userFromDB
      if(resp){
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

  // Agencije : pretrazivanje i prikazivanje
  allAgencies: Agency[] = [];
  searchName: String;
  searchAddress: String;
  
  sortParam: string;       // po cemu sortiramo: naziv / opis
  sortTrend: number;   // kriterijum: asc / desc

  adresaZahtev: string;
  rokZahtev: string;
  agencijaZahtev: string;

  searchAgency() {
    if(this.searchName && !this.searchAddress) {
      this.userService.searchAgenciesName(this.searchName).subscribe((data: Agency[])=>{
        this.allAgencies = data;
      })
    }
    else if(!this.searchName && this.searchAddress) {
      this.userService.searchAgenciesAddress(this.searchAddress).subscribe((data: Agency[])=>{
        this.allAgencies = data;
      })
    } 
    else if(this.searchName && this.searchAddress) {
      this.userService.searchAgencies(this.searchName, this.searchAddress).subscribe((data: Agency[])=>{
        this.allAgencies = data;
      })
    } 
    else {
      this.ngOnInit();
    }
    
  }

  sortirajAgencije() {
    this.allAgencies.sort((ag1, ag2) => {
      const valueA = this.getPropertyValue(ag1, this.sortParam);
      const valueB = this.getPropertyValue(ag2, this.sortParam);
    
      if (valueA < valueB) {
        return -1 * this.sortTrend; // Promenjeno u negativan broj za opadajući redosled
      } else if (valueA > valueB) {
        return 1 * this.sortTrend;
      } else {
        return 0;
      }
    });
  }
  getPropertyValue(obj: Agency, prop: string): any {
    return obj[prop.toLowerCase()];
  }


  // POSLOVI
  sviPoslovi: Zahtev[] = [];
  filterPosao: string;


  podnesiZahtev() {
    this.userService.addZahtev(this.username, this.agencijaZahtev, this.adresaZahtev, this.rokZahtev, "neobradjenZahtev").subscribe(resp => {
      if (resp) {
        this.adresaZahtev = this.rokZahtev = this.agencijaZahtev = null;
        this.ngOnInit();
      } else {
        alert("Zahtev nije dodat.");
      }
    });

  }

  prihvatiPonudu(agencija: string, adresa: string) {
    this.userService.prihvatiPonudu(this.username, agencija, adresa).subscribe(resp=>{
      if(resp){
      }
      else {
        this.message = "Neuspeh!"
      }
    })

    this.ngOnInit();
  }

  odbijPonudu(agencija: string, adresa: string) {
    this.userService.odbijPonudu(this.username, agencija, adresa).subscribe(resp=>{
      if(resp){
      }
      else {
        this.message = "Neuspeh!"
      }
    })

    this.ngOnInit();
  }

  plati(agencija: string, adresa: string) {
    console.log("plati");
    this.userService.plati(this.username, agencija, adresa).subscribe(resp=>{
      if(resp){
      }
      else {
        this.message = "Neuspeh!"
      }
    })

    this.ngOnInit();
  }  

  filtrirajPoslove() {
    if(this.filterPosao == "aktivan" || this.filterPosao == "zavrsen" || this.filterPosao == "zahtev"){
      this.userService.filterJobs(this.username, this.filterPosao).subscribe((data: Zahtev[])=>{
        this.sviPoslovi = data;
        console.log(this.sviPoslovi);
      })
    }
    else if(this.filterPosao == "svi"){
      this.userService.getAllUserJobs(this.username).subscribe((data: Zahtev[])=>{
        this.sviPoslovi = data;
      })
    } 
    else {
      alert("GRESKA filter");
    }
  }

  komentar: String;
  ocena: number;
  prikazi: string;

  jelOcenjeno(agencija: string){
    this.userService.isRated(this.username, agencija).subscribe((kom:any)=>{
      if(kom){
        this.komentar = kom.komentar;
        this.ocena = kom.ocena;
        console.log("ovde");
        
        this.prikazi = "edit";
        if(this.komentar === ""){
          this.prikazi = "novi";
        }
      }
      else {
        console.log("vode");
      }
    })
  }

  oceniAgenciju(agencija: string) { 
    if(this.prikazi == 'edit'){
      this.userService.editAgencyComm(this.username, agencija, this.komentar, this.ocena).subscribe(resp=>{
        if(resp){
          this.prikazi = null;
          this.ngOnInit();
        }
        else {
          this.message = "Neuspeh!"
        }
      })
    } 
    else {
      this.userService.oceniAgenciju(this.username, agencija, this.komentar, this.ocena).subscribe(resp=>{
        if(resp){
          this.prikazi = null;
          this.ngOnInit();
        }
        else {
          this.message = "Neuspeh!"
        }
      })
    }

  }  

  obrisiKomentar(agencija: string){    
    this.userService.obrisiKomentar(this.username, agencija).subscribe(resp=>{
      if(resp){
        this.komentar = this.ocena = this.prikazi = null;
        this.ngOnInit();
      } else {
        alert("Neuspeh");
      }
    })
    
  }

  azurirajKlijenta(){
    sessionStorage.setItem('username',this.username);
    sessionStorage.setItem('ime',this.firstname);
    sessionStorage.setItem('prezime', this.lastname);
    sessionStorage.setItem('mail', this.mail);
    sessionStorage.setItem('contact', this.contact);
    sessionStorage.setItem('image', this.image);

    this.router.navigate(['edit-client']);
  }

  prikaziAktivanPosao(user: string, adresa: string){
    this.userService.findCanvas(user, adresa).subscribe((obj: any)=>{
      let canv = obj.canvas;
      if(canv){
        this.ctx3.clearRect(0, 0, this.canvas3.width, this.canvas3.height);

        for(let i=0; i < canv.brSoba; i++){
          if(canv.koordinateSoba[i].color == "red"){
            this.ctx3.fillStyle = 'red';
            this.ctx3.fillRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
            this.ctx3.strokeRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
          } else if(canv.koordinateSoba[i].color == "green") {
            this.ctx3.fillStyle = 'green';
            this.ctx3.fillRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
            this.ctx3.strokeRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
          } else if(canv.koordinateSoba[i].color == "yellow") {
            this.ctx3.fillStyle = 'yellow';
            this.ctx3.fillRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
            this.ctx3.strokeRect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
          } 
          else {
            this.ctx3.beginPath();
            this.ctx3.rect(canv.koordinateSoba[i].x, canv.koordinateSoba[i].y, canv.koordinateSoba[i].width, canv.koordinateSoba[i].height);
            this.ctx3.stroke();
          }
        }
        for(let i=0; i < canv.brVrata; i++){
          this.ctx3.fillStyle = 'brown';
          this.ctx3.fillRect(canv.koordinateVrata[i].x, canv.koordinateVrata[i].y, canv.koordinateVrata[i].width, canv.koordinateVrata[i].height);
        }
      }
      else {
        this.message = "Neuspeh!"
      }
    })
  }

  odjava(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
}
