import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  tradehistory:any=[];

  constructor(private http:HttpClient,private service:DataService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/tradehistory/custodian/"+this.service.getcustodianid()).
    subscribe((result:any)=>{
      console.log(result)
    this.tradehistory = result.map((item: any) => {
      return { tradeId: item.tradeId, buyer: item.buyer.clientName,
        seller: item.seller.clientName,instrumentName:item.instrument.instrumentName,
        price:item.price,quantity:item.quantity,tradeDate:item.tradeDate
      };
    }
    )
    
  },
  err=>{
    console.log(err);
    })

}
}