import { Component, OnInit, Injectable } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router ,} from "@angular/router";
import {ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';
@Component({
  selector: 'app-report-game',
  templateUrl: './report-game.component.html',
  styleUrls: ['./report-game.component.css']
})




export class ReportGameComponent implements OnInit {

  constructor(private route:ActivatedRoute,private todoServcie:TodoService,private router:Router) { }
  public listGames:any={};
  public listGamesDates:any;
  public minDate: Date = new Date ("05/07/2017");
  public maxDate: Date = new Date ("05/27/2017");
  public dateValue: Date = new Date ("05/16/2017");
  dateStart:any;
  dateStop:any;
  typeChart: any;
  typeChart2: any;
  arrayData3: any;
  dataChart: any;
  dataChart2: any;
  dataChart3: any;
  optionsChart: any;
  arrayData: any = [];
  arrayData2: any = [];
  options = {
    fullWidth: true
  };
  readonly DT_FORMAT = 'YYYY/MM/DD';

    parse(value: string): NgbDateStruct {
        if (value) {
            value = value.trim();
            let mdt = moment(value, this.DT_FORMAT)
        }
        return null;
    }
    format(date: NgbDateStruct): string {
        if (!date) return '';
        let mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) return '';
        return mdt.format(this.DT_FORMAT);
    }

  ngOnInit() {
    this.todoServcie.getDaTaGame().subscribe(data => {
     
      this.listGamesDates = Object.keys(data.data);
      this.listGames = data.data;
      this.createGraph(data);
      
    });
    
  }

  searchData(){
    var date_start = $("#dateStart").val();
    var date_stop = $("#dateStop").val();
    this.todoServcie.getDaTaGame(date_start,date_stop).subscribe(data => {
     
      this.listGamesDates = Object.keys(data.data);
      this.listGames = data.data;
      this.createGraph(data);
    });
  }


  createGraph(data){
    this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
    this.typeChart2 = 'pie';
    debugger;
    var data_win =0;
    var data_lose=0;
    if(data.data_array_win!=null){
      data_win = data.data_array_win.length;
    }
    if(data.data_array_lose!=null){
      data_lose = data.data_array_lose.length;
    }
    this.arrayData3 = [
      {
        label: '# of Votes',
        data: [data_win,data_lose],
        backgroundColor : ['green','orange']
      },
      
    ];
    this.dataChart3 = {
      labels: ['บิลชนะ','บิลแพ้'],
      datasets: this.arrayData3
    };
    this.optionsChart = {
      height:'300px',
      responsive: true,
      // maintainAspectRatio: false,
      //   "animation": {
      //     "animateScale": false,
      //     "animateRotate": false
      // }
    };
  }
}
function array_values(array) {
  debugger;
  return array.filter(Boolean);
}

