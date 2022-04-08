import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChartType } from 'chart.js';

import { DataService } from './data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'line';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Volume Sales' },
    { data: [], label: 'Value Sales' }
  ];
  datalist : any = [];
  constructor(private _emp: DataService, private _myfb: FormBuilder ) {
  }
  contactform! :  FormGroup;

  charts =[
    {id:1,name:'line'},
    {id:2,name:'bar'},
    {id:3,name:'pie'}
  ];
 

  ngOnInit() {
    this._emp.getSales().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.datalist= data;
      this.barChartLabels.forEach(label => {
       this.barChartData[0].data.push(this.datalist[label]['volumeSales']);
       this.barChartData[1].data.push(this.datalist[label]['valueSales']);
       console.log(data);
      });
    });;

    this.contactform= this._myfb.group({
      chart: [null]
    });
  }
  public chartClicked(e:any):void {
    console.log(e);
    }
    
    public chartHovered(e:any):void {
    console.log(e);
    }
    submit(){
      console.log(this.contactform.value);
      this.barChartType= this.contactform.value.chart;
    }
}
