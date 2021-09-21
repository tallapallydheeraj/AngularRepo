import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  clientdata: any=[]
  view: any= [1000, 400];
  data:any
  
  clientId:any
  instrumentId:any
  quantity:any
  
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Clients';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Quantity';
  legendTitle: string = 'Instruments';

  colorScheme:any= {
    domain: ['#F7FD04',
      '#FF0000',
      '#FF8000',
      '#009900',
      '#990099','#5AA454', '#C7B42C', '#AAAAAA','#53629B', '#123456']
  };

  constructor(private http:HttpClient, private service:DataService) { }

  ngOnInit(): void {
    this.http.get("http://localhost:8080/clientinstruments/custodian/"+this.service.getcustodianid())
    .subscribe((result:any)=>{
      this.clientdata=result.map((item: any) => {
        return { name: item.client.clientId,series: [{name:item.instrument.instrumentName,
           value:item.quantity }]};
    });})
      console.log(this.clientdata)
  }

}
