import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  login() {
    this.userService.login(this.username, this.password).subscribe((userFromDB: User)=>{    //subscribe - cekam odgovor u userFromDB
      if (userFromDB != null) {
        if (userFromDB.type === 'client') {
          this.router.navigate(['client']);
        } else if (userFromDB.type === 'agency') {
          this.router.navigate(['agency']);
        } else {
          this.message = 'Error - nemoguc';
        }

        //Ubacujemo u neku sesiju da mozemo da dohvatimo iz bilo kog korisnika:
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('password', this.password);
      } else {
        this.message = 'Pogresno korisnicko ime ili lozinka. Pokusajte ponovo.';
      }
    })
  }

}
