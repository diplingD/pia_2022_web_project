import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Pravougaonik } from '../model/rectaingle';

@Component({
  selector: 'app-edit-obj',
  templateUrl: './edit-obj.component.html',
  styleUrls: ['./edit-obj.component.css']
})
export class EditObjComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = sessionStorage.getItem("userObj");
    this.adresa = sessionStorage.getItem("adresaObj");
    this.adresaObj = sessionStorage.getItem("adresaObj");
    this.prostorijeObj = parseInt(sessionStorage.getItem("prostorijeObj"));
    this.kvadratura = parseInt(sessionStorage.getItem("kvadraturaObj"));
    this.tipObj = sessionStorage.getItem("tipObj");

    this.canvas = document.querySelector('#canvas1');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 300;
    this.canvas.height = 300;

    this.canvas.addEventListener("click", (event) => {
      console.log("mouse click");
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

  }

  // Objekat
  user: string;  // objekat koji editujemo
  adresa: string;

  tipObj: string;   // novi podaci
  adresaObj: string;
  prostorijeObj: number;
  kvadratura: number;

  rectHeight: number;
  rectWidth: number;

  canvas: HTMLCanvasElement;
  imageDataURL: string;
  ctx: CanvasRenderingContext2D;
  kvadrati: Pravougaonik[] = [];
  selectedRect: Pravougaonik = null;
  offsetX: number;
  offsetY: number;
  current_shape_index: number = null;
  is_dragging: boolean = false;
  startX: number;
  startY: number;

  drawingDoors: boolean = false;   // da li crtamo vrata
  doors: Pravougaonik[] = [];
  selectedDoor: Pravougaonik = null;
  current_door_index: number = null;
  startDoorX: number;
  startDoorY: number;

  message: string;

  editObject() {
    if( !(this.tipObj && this.adresaObj && this.prostorijeObj && this.kvadratura)){
      this.message = "Unesite sva polja!";
      return;
    }
    if(this.prostorijeObj<=0 || this.kvadratura<=0){
      this.message = "Broj prostorija i kvadratura su celi brojevi veci od 0!";
      return;
    }
    if(this.prostorijeObj>3){
      this.message = "Maksimalni broj prostorija je 3!";
      return;
    }

    if(this.doors.length<=0){
      this.message = "Objekat ne sadrzi ni jedna vrata!";
      return;
    }
    if(this.kvadrati.length<=0){
      this.message = "Objekat ne sadrzi ni jednu sobu!";
      return;
    }
    if(this.kvadrati.length!=this.prostorijeObj){
      this.message = "Niste nacrtali zadati broj prostorija!";
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
      })),
      koordinateVrata: this.doors.map(door => ({
        x: door.x,
        y: door.y,
        width: door.width,
        height: door.height,
      })),
    };

    this.userService.editObject(this.user, this.adresa, this.tipObj, this.adresaObj, this.prostorijeObj, this.kvadratura, kanvas).subscribe(resp=>{    //subscribe - cekam odgovor u userFromDB
      if(resp){
        //alert(resp['message']);
      }
      else {
        alert("Objekat nije izmenjen.");
      }
    }) 

    this.router.navigate(['client']);
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.kvadrati = []
    this.doors = [];
    this.rectHeight = this.rectWidth = this.drawingDoors = null;
  }

  nazad(){
    this.router.navigate(['client']);
  }

}
