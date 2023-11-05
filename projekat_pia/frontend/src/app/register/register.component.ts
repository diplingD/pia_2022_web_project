import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.uploadedImage = "data:image/png;base64,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";
  }

  userType: string;
  message: string;

  usernameR: string;
  passwordR: string;
  password2R: string;
  phoneNumberR: string;
  mailR: string;

  nameK: string;
  lastNameK: string;

  nameA: string;
  adressA: string;
  numberA: string;
  opisA: string;

  selectedImage: File;
  uploadedImage: string;
  

  register() {
    if(this.isDisabled() == true) {
      this.message = "Morate uneti sva polja."
      return;
    }
    if(this.isPasswordValid() == false) return;    

    if(this.passwordR != this.password2R) {
      this.message = "Ponovite lozinku!";
      return;
    }

    if(parseInt(this.phoneNumberR)<=0 || isNaN(parseInt(this.phoneNumberR, 10))) {
      this.message = "Kontakt telefon mora biti broj veci od 0!";
      return;
    }

    if(this.userType == 'agencija' && (parseInt(this.numberA)<=0 || isNaN(parseInt(this.numberA, 10)) )) {
      this.message = "Maticni broj agencije mora biti broj veci od 0!";
      return;
    }

    if(this.userType == 'klijent') {    // REGISTROVANJE KLIJENTA
      this.userService.registerKlijent(this.usernameR, this.nameK, this.lastNameK, this.passwordR, this.phoneNumberR, this.mailR, this.uploadedImage, "zahtev").subscribe(respObj=>{
        if(respObj['message']=='ok'){
          //alert("Zahtev za regisraciju dodat u bazu.");
          this.router.navigate(['notreg']);
        }
        else if(respObj['message']=='notUnique'){
          this.message = "Korisnicko ime i mail moraju biti jedinstveni na nivou cele baze.";
        }
        else {
          this.message = "GRESKA"
        }
      });
    } 
    else if(this.userType == 'agencija'){   // REGISTROVANJE AGENCIJE
      this.userService.registerAgencija(this.usernameR, this.passwordR, this.phoneNumberR, this.mailR, this.nameA, this.adressA, this.numberA, this.opisA, this.uploadedImage, "zahtev").subscribe(respObj=>{
        if(respObj['message']=='ok'){
          //alert("Zahtev za regisraciju dodat u bazu.");
          this.router.navigate(['notreg']);
        }
        else if(respObj['message']=='notUnique'){
          this.message = "Korisnicko ime i mail moraju biti jedinstveni na nivou cele baze.";
        }
        else {
          this.message = "GRESKA"
        }
      });
    }

    
  }


  isPasswordValid(): boolean {   //pomocna funkcija koja proverava ispravnost lozinke
    if(this.passwordR.length<7 || this.passwordR.length>12) {
      this.message = "Lozinka mora da sadrzi najmanje 7, a najvise 12 karaktera."
      return false;
    }

    const firstCaracter = this.passwordR.charAt(0);
    if(!/[a-zA-Z]/.test(firstCaracter)) {
      this.message = "Prvi karakter lozinke mora biti slovo."
      return false;
    }

    if(!/[A-Z]/.test(this.passwordR) || !/[0-9]/.test(this.passwordR) || !/[^a-zA-Z0-9]/.test(this.passwordR)) {
      this.message = "Lozinka mora sadrzati bar jedno veliko slovo, jedan broj i jedan specijalni karakter."
      return false;
    }

    return true;  //proslo je sve uslove
  }

  isDisabled(): boolean {     // ako nisu uneta sva polja za registraciju -> disabled
    if(this.userType == 'klijent'){
      if(this.usernameR && this.passwordR && this.password2R && this.phoneNumberR && this.mailR && this.nameK && this.lastNameK) return false;
      else return true;
    } else if(this.userType == 'agencija') {
      if(this.usernameR && this.passwordR && this.password2R && this.phoneNumberR && this.mailR && this.nameA && this.adressA && this.numberA && this.opisA) return false;
      else return true;
    } else {
      return true;
    }
  }

  // Za upload slike:
  onFileSelected(event: any) {    // poziva se kad korisnik izabere sliku za upload. Ovom metodom izvlacimo izabrani fajl iz dogadjaja i cuvamo ga u 'image' promenljivu
    this.selectedImage = event.target.files[0];
  }

  uploadImage(event: any) {
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
          
          this.uploadedImage = imageBase64;
      };

      image.src = imageBase64;
    };

    reader.readAsDataURL(this.selectedImage);
  }

}
