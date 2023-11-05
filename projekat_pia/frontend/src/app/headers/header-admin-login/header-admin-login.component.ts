import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header-admin-login',
  templateUrl: './header-admin-login.component.html',
  styleUrls: ['./header-admin-login.component.css']
})
export class HeaderAdminLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  pocetna() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
