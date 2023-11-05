import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Agency } from '../model/agency';

@Component({
  selector: 'app-notreg',
  templateUrl: './notreg.component.html',
  styleUrls: ['./notreg.component.css']
})
export class NotregComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllAgencies().subscribe((data: Agency[])=>{
      this.allAgencies = data;
    })
  }

  allAgencies: Agency[] = [];
  searchName: String;
  searchAddress: String;
  
  sortParam: string;       // po cemu sortiramo: naziv / opis
  sortTrend: number;   // kriterijum: asc / desc

  search() {
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

  sortiraj() {
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

  pregledAgencije(agencija: string){
    sessionStorage.setItem("agencyUsername", agencija);

    this.router.navigate(['notreg-agency']);
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
