import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  clientbuys:any=[];
  clientsells:any=[];
  custodianbuys:any=[];
  custodiansells:any=[];
  zero:number=0;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/clients/buyreport")
    .subscribe((result:any)=>{this.clientbuys=result;console.log(result)})

    this.http.get("http://localhost:8080/clients/sellreport")
    .subscribe((result:any)=>{this.clientsells=result})

    this.http.get("http://localhost:8080/custodian/buyreport")
    .subscribe((result:any)=>{this.custodianbuys=result})

    this.http.get("http://localhost:8080/custodian/sellreport")
    .subscribe((result:any)=>{this.custodiansells=result})
  }

}
