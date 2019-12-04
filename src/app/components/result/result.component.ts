import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

import * as $ from 'jquery';
import * as AOS from 'aos';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})

export class ResultComponent implements OnInit {

  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];
  public results: result[];
  options = {
    fullWidth: true
  };
  ngOnInit() {
    this.todoServcie.getHandicap().subscribe((response)=>{
      console.log(response.data);
      this.results = response.data;
    });
    
    
    
  }

  onValueChange(value: Date): void {
    this.todoServcie.getHandicap_result_from_date(value).subscribe((response)=>{
      
      this.results = response.data;
    });
    
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
interface result {
  hd_away: string
  hd_away_star: string
  hd_create_date: string
  hd_date: string
  hd_delete: string
  hd_handicap: string
  hd_hl: string
  hd_home: string
  hd_home_star: string
  hd_id: string
  hd_real_hl: string
  hd_real_result: string
  hd_real_win: string
  hd_result_away: string
  hd_result_cal: string
  hd_result_hl: string
  hd_result_hl_stat: string
  hd_result_home: string
  hd_result_percent: string
  hd_result_win: string
  hd_time: string
  hd_update_date: string
  hd_xa: string
  hd_xh: string
}
interface User {
  member_id :string;
  member_type :string;
  member_name :string;
  contact_text_sort :string;
  member_lastname :string;
  member_delete :string;
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
