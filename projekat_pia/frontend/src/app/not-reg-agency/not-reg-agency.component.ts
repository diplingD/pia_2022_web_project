import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Zahtev } from '../model/zahtev';
import { Agency } from '../model/agency';
import { Comment } from '../model/comment';
import { Canvas } from '../model/canvas';

@Component({
  selector: 'app-not-reg-agency',
  templateUrl: './not-reg-agency.component.html',
  styleUrls: ['./not-reg-agency.component.css']
})
export class NotRegAgencyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('agencyUsername');
    this.findAgency();

    this.canvas = document.querySelector('#canvas1');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 300;
    this.canvas.height = 300;


  }

  username: string;
  image: string;
  name: string;
  address: string;
  description: string;
  number: string;
  mail: string;

  sviKomentari: Comment[] = [];
  galerija: Canvas[] = [];
  allRequests: Zahtev[] = [];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  findAgency() {
    this.userService.findAgency(this.username).subscribe((agency: Agency)=>{
      if(agency){
        this.image = agency.image;
        this.name = agency.name;
        this.address = agency.address;
        this.description = agency.description;
        this.number = agency.number;
        this.mail = agency.mail;

        this.sviKomentari = agency.komentari;

        this.getGallery();
      }
      else {
        console.log("neuspeh slika");
      }
    });
  }

  getGallery(){
    this.userService.getAllFinishedRequests(this.name).subscribe((data: Zahtev[])=>{
      this.allRequests = data;

      for(let i=0; i<this.allRequests.length; i++){
        this.userService.findCanvas(this.allRequests[i].user, this.allRequests[i].adresa).subscribe((data: Canvas)=>{
          if(data){
            console.log(data);
            this.galerija.push(data);
          }
        })
      }

    })    

  }

  galerryIndex: number = -1;

  nextGalerry(){
    this.galerryIndex = (this.galerryIndex + 1)%this.galerija.length;
    console.log(this.galerija.length);
    this.drawCanvas(this.galerryIndex);
  }

  prevGalerry(){

  }

  drawCanvas(index: number){
    for(let i=0; i < this.galerija[index].brSoba; i++){
      // ako postoji boja onda filluj
      if(this.galerija[index].koordinateSoba[i].color == "red"){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.galerija[index].koordinateSoba[i].x, this.galerija[index].koordinateSoba[i].y, this.galerija[index].koordinateSoba[i].width, this.galerija[index].koordinateSoba[i].height);
        this.ctx.strokeRect(this.galerija[index].koordinateSoba[i].x, this.galerija[index].koordinateSoba[i].y, this.galerija[index].koordinateSoba[i].width, this.galerija[index].koordinateSoba[i].height);
      } else if(this.galerija[index].koordinateSoba[i].color == "green") {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.galerija[index].koordinateSoba[i].x, this.galerija[index].koordinateSoba[i].y, this.galerija[index].koordinateSoba[i].width, this.galerija[index].koordinateSoba[i].height);
        this.ctx.strokeRect(this.galerija[index].koordinateSoba[i].x, this.galerija[index].koordinateSoba[i].y, this.galerija[index].koordinateSoba[i].width, this.galerija[index].koordinateSoba[i].height);
      } 
      else {
        this.ctx.beginPath();
        this.ctx.rect(this.galerija[index].koordinateSoba[i].x, this.galerija[index].koordinateSoba[i].y, this.galerija[index].koordinateSoba[i].width, this.galerija[index].koordinateSoba[i].height);
        this.ctx.stroke();
      }          
    }

    for(let i=0; i < this.galerija[index].brVrata; i++){
      this.ctx.fillStyle = 'brown';
      this.ctx.fillRect(this.galerija[index].koordinateVrata[i].x, this.galerija[index].koordinateVrata[i].y, this.galerija[index].koordinateVrata[i].width, this.galerija[index].koordinateVrata[i].height);
    }
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
