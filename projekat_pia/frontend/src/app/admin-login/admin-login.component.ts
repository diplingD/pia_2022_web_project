import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;

  loginAdmin() {
    this.userService.loginAdmin(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB != null){
        sessionStorage.setItem("username", this.username);
        sessionStorage.setItem("password", this.password);
        this.router.navigate(['admin']);
      } else {
        this.message = 'Pogresno korisnicko ime ili lozinka. Pokusajte ponovo.';
      }
    })
  }

}
