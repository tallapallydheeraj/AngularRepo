import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
      trade:any=[];

  buys:number=0;
  sells:number=0;
  buycard:any=[
  {​name:"Total Buys",value:0}​]
  sellcard:any=[
{​name:"Total Sells",value:0}​]
transactioncard=[
{​name:"Total Transactions",value:0}​]
stockcard=[
{​name:"Total stocks involed",value:0}];
  view:any= [700, 400];
  colorScheme1:any = {​
    domain: ['#5AA454']
  }​;
  colorScheme2:any = {​
    domain: [ '#C7B42C']
  }​;
  colorScheme3:any = {​
    domain: [ '#AAAAAA']
  }​;
  colorScheme4:any = {​
    domain: [ '#AAECD7']
  }​;
  colorScheme5:any = {​
    domain: [ '#AF0935']
  }​;
  colorScheme6:any = {​
    domain: [ '#C0947B']
  }​;
  colorScheme7:any = {​
    domain: [
    '#316B83',
    '#58508d',
    '#bc5090',
    '#ff6361',
    '#ffa600',
      
      '#6A2C70',
      '#00ADB5',
      '#630A10',
      
      '#F08A5D', 
    
    '#8C9EFF', 
    '#80D8FF', 
    ]
  }​;

  cardColor: string = '#232837';
  data: any=[];
  cardflag: number=1;
  pieflag:number=1;
  client: any;
  clientcard:any=[];
  custodiancard:any=[]
  clientdata: any;
  constructor(private http:HttpClient,private service:DataService,
    private toastr:ToastrService) {​ 
      this.client=[]
      
  }​
  
  ngOnInit(): void {​
    this.custodiancard=[
        
      {​name:"Custodian Id",value:this.service.getcustodianid()}​]
    this.http.get("http://localhost:8080/clientDetails/"+this.service.getcustodianid())
    .subscribe((result:any)=>{
      console.log(result)
    this.client = result;
    console.log(this.client);
    this.clientcard=[
      {​name:"Total Clients",value:Object.keys(this.client).length}​

    ]
    },
    err=>{
    console.log(err);
    })
    

    this.http.get("http://localhost:8080/tradehistory/custodian/"+this.service.getcustodianid())
    .subscribe((result:any)=>{
      console.log(result);
      this.trade=result;
      this.trade.forEach((ele:any)=>{​
        if(ele.buyer.custodian.custodianId==this.service.getcustodianid())
        this.buys=this.buys+ele.quantity;
        if(ele.seller.custodian.custodianId==this.service.getcustodianid())
        this.sells+=ele.quantity;
      }​)
      this.buycard=[
        
        {​name:"Total Buys",value:this.buys}​]
        this.sellcard=[
    {​name:"Total Sells",value:this.sells}​]
    this.transactioncard=[
    {​name:"Total Transactions",value:Object.keys(this.trade).length}​]
    this.stockcard=[
    {​name:"Total stocks involed",value:this.buys+this.sells}
    ​]
      
      
    },
    err=>{
      console.log(err);
      this.cardflag=0;
      this.toastr.error("Page not loaded successfully","Error")
    })​
    

    this.http.get("http://localhost:8080/instruments/custodian/"+this.service.getcustodianid())
    .subscribe((result:any)=>{
      console.log(result);
      this.data=result.map((ele:any)=>{
        return {
          name:ele[0],
          value:ele[1]
        }
      });
      console.log("data"+this.data);

    },
    err=>
    {
      console.log(err);
      this.pieflag=0;
    })
    
  }
    
 
    
}​

