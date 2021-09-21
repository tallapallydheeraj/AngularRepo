import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  clientId:any
  instruments:any
  client:any
  qe:any
  quantity:any
  price:any
  flag:any
  flag1:any
  direction:any
  direction1:any
  clientName:any
  instrumentId:any
  instrument:any
  instrumentDetails: any;
  clientDetails: any;
  orderBuy:any  
  orderSell:any
  clientInstrument:any
  priceflag: number;
  constructor(private http:HttpClient,private service:DataService,
    private toastr:ToastrService, private router:Router) {
    // this.quantity=
    // this.instruments;

    this.orderBuy={}
    this.orderSell={}
    this.clientInstrument={}
    this.instrumentDetails={
      "instrumentId": "",
  "instrumentName": "",
  "faceValue": "",
  "expiryDate": ""
 
    }
    this.clientDetails={
      "clientName":""
    }
    this.qe=100;
    this.flag=0;
    this.flag1=0;
    this.priceflag=0;
    this.clientName="";
    this.instrumentId="";
    this.price="";
    this.direction=[{
      name:"Buy",
      value:"b"
    },
    {
      name:"Sell",
      value:"s"
    }

  ];

  }
  ngOnInit(): void {
   
    this.http.get("http://localhost:8080/clientDetails/"+this.service.getcustodianid())
.subscribe((result:any)=>{
  console.log(result)
this.client = result.map((item: any) => {
return { clientId: item.clientId, clientName: item.clientName,custodian:item.custodian };
});
},
err=>{
console.log(err);
})

this.http.get("http://localhost:8080/instruments/")
.subscribe((result:any)=>{
this.instruments = result.map((item: any) => {
  return { instrumentId: item.instrumentId, instrumentName: item.instrumentName };
  })
},
err=>{
console.log(err);
})




  }

  selected1(instrumentId1:any){
    // console.log(instrument);
    this.http.get("http://localhost:8080/instruments/"+instrumentId1)
.subscribe((result:any)=>{
  this.instrumentDetails = result;
  // if(this.instrumentDetails.expiryDate==null)
  // this.instrumentDetails.expiryDate="NA";



console.log(this.instrumentDetails)

},
err=>{
console.log(err);
})
  }

  selected2(clientId1:any){
    this.http.get("http://localhost:8080/clients/"+clientId1)
.subscribe((result:any)=>{
this.clientDetails = result;
this.selected3(this.instrumentId);
console.log(this.clientDetails);
this.toastr.info("Your transaction limit is Rs."+this.clientDetails.transactionLimit,'INFO',{
  timeOut:1000
})
},
err=>{
console.log(err);
})



  }
  selected4(){
    if(this.price<this.instrumentDetails.faceValue)
    {
      this.priceflag=1
    }
    else
    this.priceflag=0
  }

  selected(){
    this.selected3(this.instrumentId)
    if(this.quantity%25!=0 )
    this.flag=1;
    else
    this.flag=0;
    

    
   // console.log(this.direction)
   this.flag1=0;
    //console.log(this.direction1)
    //alert(this.direction1)
    if(this.direction1=="s" && this.quantity>this.clientInstrument.quantity)
    {
  
      this.flag1=1;
      
    }
    else
    this.flag1=0;

    // if(this.direction1=="b"){
    //   //then call Buy API 
     
    // }
    // else 
    // //call Sell API

  }

  selected3(instrumentId2:any){
    console.log("op"+this.clientDetails.clientId+""+instrumentId2);
    
    this.http.get("http://localhost:8080/clientinstruments/"+this.clientDetails.clientId+""+instrumentId2)
    .subscribe((result:any)=>{
      this.clientInstrument=result;
      console.log(this.clientInstrument);
    },
    err=>{
      console.log(err);
      if(this.direction1=='s')
      this.flag1=1
      })

  }
  
  RegisterOrder(orderForm: NgForm): void {  
    
    // console.log(orderForm.value);
    // console.log(orderForm);
    this.orderBuy=

      {
        "buyId": 0,
        "client": {
          "clientId": this.clientDetails.clientId,
          "clientName": this.clientDetails.clientName,
          "custodian": {
            "custodianId": this.service.getcustodianid(),
            "custodianName": "string",
            "custodianPassword": "string"
          },
          "transactionLimit": 0,
          "balance": 0
        },   
          
        "instrument": this.instrumentDetails,
        "price": this.price,
        "quantity": this.quantity,
        "remainingQty": 0,
        "buyDate": null,
        "flag": 0
      };
      this.orderSell={
      
          "sellId": 0,
          "client": {
            "clientId": this.clientDetails.clientId,
            "clientName": this.clientDetails.clientName,
            "custodian": {
              "custodianId": this.service.getcustodianid(),
              "custodianName": "string",
              "custodianPassword": "string"
            },
            "transactionLimit": 0,
            "balance": 0
          },
          "instrument":this.instrumentDetails,

          "price": this.price,
          "quantity": this.quantity,
          "remainingQty": 0,
          "sellDate": null,
          "flag": 0
        
      }
  if(this.direction1=="b" )
  {
  this.http.post("http://localhost:8080/buy",this.orderBuy)
  .subscribe((result:any)=>{
    this.toastr.success("Buy successful with id "+result.buyId,"SUCCESS")
    if(result.flag==0){
      this.toastr.success("Order matched Sucessfully","SUCCESS")
    }
    console.log(result)
    console.log("buy api called")
    this.router.navigate(['/dashboard'])
  },
  err=>{
    console.log(err);
    this.toastr.error("Buy Failed","ERROR")
    })
  }
  if(this.direction1=="s"){
    this.http.post("http://localhost:8080/sell",this.orderSell)
  .subscribe((result:any)=>{
    this.toastr.success("Sell successful with id "+result.sellId,"SUCCESS")
    if(result.flag==0){
      this.toastr.success("Order matched Sucessfully","SUCCESS")
    }
    console.log(result)
    console.log("sell api called")
    this.router.navigate(['/dashboard'])
  },
  err=>{
    console.log(err);
    this.toastr.error("Sell Failed","ERROR")
    })

}
}
}

