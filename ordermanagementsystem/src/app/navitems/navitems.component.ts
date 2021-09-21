import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navitems',
  templateUrl: './navitems.component.html',
  styleUrls: ['./navitems.component.css']
})
export class NavitemsComponent implements OnInit {

  constructor(private router:Router,
    private service:DataService) { }

  ngOnInit(): void {
  }
  loggedIn(){
    return this.service.loggedIn()
  }
  logout()
{
  this.service.logoutUser();
  this.router.navigate(["/login"])
}

}
