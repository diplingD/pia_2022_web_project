import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-header-register',
  templateUrl: './header-register.component.html',
  styleUrls: ['./header-register.component.css']
})
export class HeaderRegisterComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  pocetna() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
