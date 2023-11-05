import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-agency',
  templateUrl: './edit-agency.component.html',
  styleUrls: ['./edit-agency.component.css']
})
export class EditAgencyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.name = sessionStorage.getItem("name");
    this.contact = sessionStorage.getItem("contact");
    this.mail = sessionStorage.getItem("mail");
    this.image = sessionStorage.getItem("image");
    this.address = sessionStorage.getItem("address");
    this.description = sessionStorage.getItem("description");

    this.username = sessionStorage.getItem('username');
  }

  name: string;
  contact: string;
  mail: string;
  image: string;
  message: string;
  username: string;
  address: string;
  description: string;

  nazad(){
    this.router.navigate(['agency']);
  }

  selectedImage: File;

  // Za upload slike:
  onFileSelected(event: any) {    // poziva se kad korisnik izabere sliku za upload. Ovom metodom izvlacimo izabrani fajl iz dogadjaja i cuvamo ga u 'image' promenljivu
    this.selectedImage = event.target.files[0];

    event.preventDefault();
    if (!this.selectedImage) {
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBase64 = e.target.result as string; // base64-encoded image data

      const image = new Image();
      image.onload = () => {
          const width = image.width;
          const height = image.height;

          if (width < 100 || height < 100 || width > 300 || height > 300) {
            alert("Slika mora imati minimalno dimenzije 100x100px i maksimalno dimenzije 300x300px.");
            return;
          }
          
          this.image = imageBase64;
      };

      image.src = imageBase64;
    };

    reader.readAsDataURL(this.selectedImage);
    this.ngOnInit();
  }

  azuriraj(){
    if(!(this.name && this.contact && this.mail && this.address && this.description)){
      this.message = "Unesite sva polja!"
      return;
    }
    if(parseInt(this.contact)<=0 || isNaN(parseInt(this.contact, 10))) {
      this.message = "Neodobren kontakt telefon!";
      return;
    }

    this.userService.editAgency(this.username, this.name, this.contact, this.mail, this.address, this.description, this.image).subscribe(respObj=>{
      if(respObj['message']=='ok'){
        this.router.navigate(['agency']);
      }
      else {
        this.message = "GRESKA"
      }
    });

  }

}
