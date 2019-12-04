import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import {Router,NavigationEnd} from "@angular/router"
import * as $ from 'jquery';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public slideData:slideData[];
  constructor(private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];
  public users: Handicap[];
  options = {
    fullWidth: true
  };
  public member_name:string;
  public member_code_tran:string;
  public member_id:string;
  public bsInlineValue:any;
  public date_data:any;
  public credit_member:any;
  public time_start:any;
  public date1:any;
  public date2:any;
  public showHeader:any;
  public hdd_display_:any;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[2];
        if(check_url!='game'){
          this.showHeader = true;
        }else{
          this.showHeader = false;
        }
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

    this.bsInlineValue = new Date();
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      this.member_code_tran = objArray.member_code_tran;
    }
    //this.member_id = '1';
    this.todoServcie.getHandicap_member_id(this.member_id).subscribe((response)=>{
      //debugger;
      this.users = response.data;
    });
    this.todoServcie.getCredit(this.member_id).subscribe((response)=>{
      this.credit_member = response.data.member_credit;
      //this.users = response.data;
    });
    
    
  }

  onValueChange(value: Date): void {
    this.date_data = value;
    this.todoServcie.getHandicapFromDate(this.date_data,this.member_id).subscribe((response)=>{
      this.users = response.data;
      
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      
    }
    location.reload();
  }

  public checkTime(data){
    
    this.date1 = new Date(); // 9:00 AM
    var year = this.date1.getFullYear();
    var month = this.date1.getMonth();
    var days = this.date1.getDate();
    var res = data.split(":");
    this.date2 = new Date(year, month, days, res[0], res[1]); // 5:00 PM
   
    // the following is to handle cases where the times are on the opposite side of
    // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM
    
    if (res[0]>=0&&res[0]<10) {
      this.date2.setDate(this.date2.getDate() + 1);
    }
    var diff = this.date2 - this.date1;
    this.time_start = diff;
    if(diff<0){
      return false;
    }
    
  }

  public updateCredit(data1,data2){
    debugger;
    this.todoServcie.updateCredit(this.member_name,this.member_code_tran).subscribe((response)=>{
      if(response.result==true){
        var object = response.data;
        this.todoServcie.updateCreditSave(this.member_name,this.member_code_tran,object).subscribe((response2)=>{
         // console.log(response2);
          if(response2.success==true){
            alert(response2.message);
            this.credit_member = response2.data;
          }else{
            alert('ฝากเงินเข้าระบบเพื่อรับ Credit');
          }
        });
      }
     
    });
    
  }

  public displayScore(data){
    if(this.member_id==null){
      this.router.navigate(['/login']);
      return;
    }
   
    var id = $(data.currentTarget).attr("id");
    this.todoServcie.saveHandicap(id,this.member_id).subscribe((response)=>{
     
      if(response.success==true){
        this.todoServcie.getCredit(this.member_id).subscribe((response)=>{
          this.credit_member = response.data.member_credit;
        });
        this.todoServcie.getHandicap_by_id(this.member_id,id).subscribe((response)=>{
          this.hdd_display_ = response.data.hdd_display;
          

          $(".btn_[id='"+id+"']").fadeOut(500);
    
          setTimeout(function(){
            $(".icon_loading[id='"+id+"_1']").fadeIn(500);
          },500);
          setTimeout(function(){
            
            $(".icon_loading[id='"+id+"_1']").fadeOut(500,function(){
              $(".result_score[id='"+id+"_1']").fadeIn(500,function(){
                $(".icon_loading[id='"+id+"_2']").fadeIn(500);
              });
            });
            
          },1000);
          setTimeout(function(){
            $(".result_score[id='"+id+"_2']").fadeIn(500);
            $(".icon_loading[id='"+id+"_2']").fadeOut(500);
            $(".icon_loading[id='"+id+"_3']").fadeIn(500);
          },2500);
          setTimeout(function(){
            $(".result_score[id='"+id+"_3']").fadeIn(500);
            $(".icon_loading[id='"+id+"_3']").fadeOut(500);
            $(".icon_loading[id='"+id+"_4']").fadeIn(500);
          },3000);
          setTimeout(function(){
            $(".result_score[id='"+id+"_4']").fadeIn(500);
            $(".icon_loading[id='"+id+"_4']").fadeOut(500);
          },3400);
        });
       
        
      }else if(response.success=='notopen'){
        alert(response.message);
      }else if(response.success=='notyet'){
        alert("สามารถกดได้ใน เวลา "+response.message);
      }else{
        alert("กรุณาเติม Credit");
        return;
      }
      
    });
   
    
  }
}

interface Handicap {
  dateNew: string
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
  hd_real_hl:string
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
  hdd_create_date: string
  hdd_delete: string
  hdd_display: string
  hdd_hd_Id: string
  hdd_id: string
  hdd_m_id: string
  hdd_update_date: string
  time_start: string
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

