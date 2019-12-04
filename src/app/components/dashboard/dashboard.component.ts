import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

import * as $ from 'jquery';
import * as AOS from 'aos';
import { count } from 'rxjs/operators';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];
  public users: User[];
  options = {
    fullWidth: true
  };
  typeChart: any;
  typeChart2: any;
  arrayData3: any;
  dataChart: any;
  dataChart2: any;
  dataChart3: any;
  optionsChart: any;
  arrayData: any = [];
  arrayData2: any = [];
  ngOnInit() {
    this.todoServcie.getHandicapGraph().subscribe((response)=>{
      this.users = response.data;
      var data_win_date_array = [];
      var data_win_result_array = [];
      var data_hlwin_result_array = [];
      var max_result_array = [];
      var winHan = "";
      var winHL = "";
      for(var i =0;i<response.data.length;i++){
        data_win_date_array.push(response.data[i].date_data);
        data_win_result_array.push(response.data[i].data_win_result);
        data_hlwin_result_array.push(response.data[i].data_hlwin_result);
        max_result_array.push((response.data[i].max_result/2));
        winHL = response.data[i].data_hlwin_result;
        winHan = response.data[i].data_win_result;
      }
      
      this.arrayData = [
        {
          label: "ผลแพ้ชนะ",
          data: data_win_result_array,
          backgroundColor : 'green'
        },
        // {
        //   label: "ผลสูงต่ำชนะ",
        //   data: data_hlwin_result_array,
        //   backgroundColor : 'rgba(54, 162, 235, 0.2)'
        // },
        {
          label: "Average",
          data: max_result_array,
          backgroundColor : 'orange'
        },
      ];
      this.arrayData2 = [
        {
          label: "ผลสูงต่ำชนะ",
          data: data_hlwin_result_array,
          backgroundColor : 'green'
        },
        {
          label: "Average",
          data: max_result_array,
          backgroundColor : 'orange'
        },
      ];
      this.arrayData3 = [
        {
          label: '# of Votes',
          data: [winHL,winHan],
          backgroundColor : ['blue','black']
        },
        
      ];
      this.typeChart = 'line';   ////// สามารถกำหนดเป็น 'line','bar','radar','pie','doughnut','polarArea','bubble','scatter'
      this.typeChart2 = 'pie';
      this.dataChart = {
        labels: data_win_date_array,
        datasets: this.arrayData
      };
      this.dataChart2 = {
        labels: data_win_date_array,
        datasets: this.arrayData2
      };
      this.dataChart3 = {
        labels: ['สูงต่ำชนะ','handicap ชนะ'],
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
    });
    
   

 
    // this.todoServcie.getChart().subscribe((response)=>{
    //   console.log(response);
    
      
    // });
    
    
    
  }
  public displayScore(data){
    var id = $(data.currentTarget).attr("id");
    $(".btn[id='"+id+"']").fadeOut(500);
    
    setTimeout(function(){
      $(".icon_loading[id='"+id+"_1']").fadeIn(500);
    },500);
    setTimeout(function(){
      $(".result_score[id='"+id+"_1']").fadeIn(500);
      $(".icon_loading[id='"+id+"_1']").fadeOut(500);
      $(".icon_loading[id='"+id+"_2']").fadeIn(500);
    },1000);
    setTimeout(function(){
      $(".result_score[id='"+id+"_2']").fadeIn(500);
      $(".icon_loading[id='"+id+"_2']").fadeOut(500);
      $(".icon_loading[id='"+id+"_3']").fadeIn(500);
    },1900);
    setTimeout(function(){
      $(".result_score[id='"+id+"_3']").fadeIn(500);
      $(".icon_loading[id='"+id+"_3']").fadeOut(500);
      $(".icon_loading[id='"+id+"_4']").fadeIn(500);
    },2400);
    setTimeout(function(){
      $(".result_score[id='"+id+"_4']").fadeIn(500);
      $(".icon_loading[id='"+id+"_4']").fadeOut(500);
    },2800);
    
  }
}
interface User {
  member_id :string;
  member_type :string;
  member_name :string;
  contact_text_sort :string;
  member_lastname :string;
  member_delete :string;
  data_win_result:string;
  data_hlwin_result:string;
  max_result:string;
}
interface Todo{
  adjust_page_id:number;
  adjust_page_type:string;
  adjust_page_title:string;
  adjust_page_description:string;
  adjust_page_short_description:string;
  adjust_page_image_name:string;
  adjust_page_image_type:string;
}

interface slideData {
  adjust_page_id :string;
  adjust_page_type :string;
  adjust_page_title :string;
  adjust_page_description :string;
  adjust_page_short_description :string;
  adjust_page_image_name :string;
  adjust_page_image_type :string;
  adjust_page_sort :string;
  adjust_page_hide :string;
  adjust_page_delete :string;
  adjust_page_create_by :string;
  adjust_page_create_date :string;
  adjust_page_update_date :string;
}
