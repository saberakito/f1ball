import { Component, OnInit, ViewChild} from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router , NavigationEnd} from "@angular/router";
import {ActivatedRoute } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css']
})

export class GameScoreComponent implements OnInit {

  constructor(private route:ActivatedRoute,private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];
  public users: Handicap[];
  public steps:any;
  public hand_steps:any;
  options = {
    fullWidth: true
  };
  _home0:any = '';
  _home1:any = '';
  score_team1_home:any;
  score_team1_away:any;

  score_team2_home:any;
  score_team2_away:any;

  public member_name:string;
  public member_code_tran:string;
  public member_id:string;
  public bsInlineValue:any;
  public date_data:any;
  public credit_member:any;
  public time_start:any;
  public date1:any;
  public date2:any;
  public optradio:any;
  public user_name:any;
  public checkBtn:any;
  public countGame:any;
  countGameStep:any;
  public infoMessage:any;
  public btnCheckGames:any;
  public checkHaveGame:any = 0;
  public showHeader:any;
  id:any;
  sub:any;
  check_game_start:any = 0;
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
    });
    debugger;
    if(this.id!=null&&this.id!=''){
      this.todoServcie.ValidateUserLink(this.id).subscribe(data => {
        
        if(localStorage.getItem('data_member')==null||localStorage.getItem('data_member')==''){
          if(data.result=='Y'){
            this.todoServcie.autoLogin(this.id).subscribe(data => {
              localStorage.setItem("data_member",JSON.stringify(data));
              //this.router.navigateByUrl('/');
              this.todoServcie.setLoggedIn(true);
              this.infoMessage = '';
              location.reload();
            });
          }else{
            this.infoMessage = 'Login Failed. Please Try Again.';
            this.router.navigate(['login']);
          }
        }
          
      });
    }


    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      this.member_code_tran = objArray.member_code_tran;
      
      
       
      this.start_page_game_score();
      
    }

    


    

    //this.member_id = '1';
    

    

    this.todoServcie.getCredit(this.member_id).subscribe((response)=>{
      this.credit_member = response.data.member_credit;
      //this.users = response.data;

    });
  }


  start_page_game_score(){
    this.todoServcie.getDateGameScore_played(this.member_id).subscribe((response1)=>{
      // debugger;
       this.checkHaveGame = response1.data.length;
       this.todoServcie.getHandicap_game_score(this.member_id).subscribe((response)=>{
          if(response.success!=false&&response.success!=null){
            
            
            for(var i=0;i<response1.data.length;i++){
              // $('[ng-reflect-name="'+response1.data[i].hs_hd_id+'_home_played"]').val(response1.data[i].hs_home_score);
              // $('[ng-reflect-name="'+response1.data[i].hs_hd_id+'_away_played"]').val(response1.data[i].hs_away_score);
             // debugger;
              if(response.data[i]['score_home']==null){
                response.data[i]['score_home'] = [];
              }
              if(response.data[i]['score_away']==null){
                response.data[i]['score_away'] = [];
              }
              response.data[i]['score_home'] = response1.data[i].hs_home_score;
              response.data[i]['score_away'] = response1.data[i].hs_away_score;
            }
          // debugger;
            this.users = response.data;
          }
        });
        
     });
  }

  public delete_item(e){
    var han_id = $(e.currentTarget).attr('step');
    $(".card[id='"+han_id+"']").css('background','white');
    $("[ng-reflect-name*='"+han_id+"']").prop('checked', false);
    $("[ng-reflect-model*='"+han_id+"']").removeAttr('ng-reflect-model');
  }

  public delete_item_from_han_id(id){
    $(".card[id='"+id+"']").css('background','white');
    $("[ng-reflect-name*='"+id+"']").prop('checked', false);
    $("[ng-reflect-model*='"+id+"']").removeAttr('ng-reflect-model');
    $("[step='"+id+"']").val('');
  }
  public resetStep(){
    location.reload();
  }
  public selectTeam(e){
    var teamSelect = $(e.currentTarget).attr('ng-reflect-name');
    var team_value = $(e.currentTarget).val();
    var checkInsert = 0;
    team_value =  $(e.currentTarget).parent().attr("id").split("*")[0];
    var countCheckSelect =0;
    for(var i =0; i<$("[id*='tded']").length;i++){
       //check full select
       if($($("[id*='tded']")[i]).val()!=null&&$($("[id*='tded']")[i]).val()!=''){
        countCheckSelect++
      }
    }
    
    for(var i =0; i<$("[id*='tded']").length;i++){
        if($($("[id*='tded']")[i]).attr('step')==teamSelect&&$($("[id*='tded']")[i]).val()!=null){
          checkInsert = 1;
        }
        if($($("[id*='tded']")[i]).attr('step')!=null&&($($("[id*='tded']")[i]).val()==null||$($("[id*='tded']")[i]).val()=='')){
          // debugger;
          checkInsert = 1;
           $($("[id*='tded']")[i]).attr('step',teamSelect);
           $($("[id*='tded']")[i]).val(team_value);
            $(".card[id='"+teamSelect+"']").css('background','beige');
 
         }
        if($($("[id*='tded']")[i]).attr('step')==null&&checkInsert==0){
         // debugger;
         checkInsert = 1;
          $($("[id*='tded']")[i]).attr('step',teamSelect);
          $($("[id*='tded']")[i]).val(team_value);
          $(".card[id='"+teamSelect+"']").css('background','beige');
        }else{
          $("[step='"+teamSelect+"']").val(team_value);
        }

       
    }
    if(countCheckSelect==6){
      alert('ลบรายการที่เลือกก่อน...!');
      this.delete_item_from_han_id(teamSelect);
    }
  }

  public resetDataGame(){
    for(var i =0; i<$("[id*='tded']").length;i++){
      //check full select
      if($($("[id*='tded']")[i]).val()!=null&&$($("[id*='tded']")[i]).val()!=''){
        this.delete_item_from_han_id($($("[id*='tded']")[i]).attr('step'));
      }
   }
    this.todoServcie.getHandicap_game_step(this.member_id).subscribe((response)=>{
      if(response.success!=false){
        if(response.data[0].hg_team_win!=null && response.data[0].hg_team_win!=''){
          this.checkBtn = '1';
        }
        
        this.countGame = response.data.length;
        this.users = response.data;
      }else{
        this.checkBtn = '1';
      }
    });
  }
  public check_value_length:any;
  public sendDataGame(form){
      var count_check =0;
      var arrayData =[];
      if (confirm("ส่งผลทายหรือไม่?")== true) {
        var count_check =0;
        for (var index = 0; index < Object.keys(form.value).length; ++index) {
          this.check_value_length = Object.values(form.value)[index];
          if(this.check_value_length!=null){
            count_check = count_check+1;
          }
        }
        if(count_check==4){
          for (var index = 0; index < Object.keys(form.value).length; ++index) {
            var hd_id  = Object.keys(form.value)[index].split("_")[0];
            var h_a  = Object.keys(form.value)[index].split("_")[1];
            var data_score = Object.values(form.value)[index];
            if(h_a=='home'){
              if(arrayData[hd_id]==null){
                arrayData[hd_id] = [];
              }
              arrayData[hd_id]['home'] = data_score;
            }else if(h_a=='away'){
              if(arrayData[hd_id]==null){
                arrayData[hd_id] = [];
              }
              arrayData[hd_id]['away'] = data_score;
            }
          }
          for (var index = 0; index < Object.keys(arrayData).length; ++index) {
            var hd_id  =  Object.keys(arrayData)[index];
            var data_score_home = arrayData[hd_id]['home'];
            var data_score_away = arrayData[hd_id]['away'];
            debugger;
            this.todoServcie.saveHandicapScore(this.member_id,hd_id,data_score_home,data_score_away).subscribe((response)=>{
            // debugger;
            this.start_page_game_score();
            });
          }
        }else{
          alert('ใส่ข้อมูลให้ครบ');
        }
    }
      
      // if(count_check!=6){
      //   alert('กรุณาเลือก "ทีมชนะ" ให้ครบ 6 ทีมก่อนส่งข้อมูล');
      //   return;
      // }else{
      //  // if (confirm("ส่งผลทายหรือไม่?")== true) {
      //     this.todoServcie.calDataGame_step(this.member_id,form.value).subscribe(data=>{
      //     //  debugger;
      //      this.steps = data['array_bill'];
      //      this.countGameStep = data['array_bill'].length;
      //     this.hand_steps = data.data;
      //      console.log(data.data);
      //       if(data.success==true){
      //        // alert(data.message);
      //       //  location.reload();
      //       }else{
      //         alert('บันทึกข้อมูลผิดพลาด');
      //       }
      //     });
      // //  }
      // }
    
    
  }
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

interface Handicap {
  score_home:any;
  score_away:any;
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
  hg_team_win:string
}

interface Step {
  sb_id :string;
  sb_ss_id :string;
  sb_m_id :string;
  sb_date :string;
  sb_code :string;
  sb_create_date :string;
  sb_update_date :string;
  date_bill:string;
}

interface HandStep {
  hgs_id :string;
  hgs_sb_id :string;
  hgs_date :string;
  hgs_hd_id	 :string;
  hgs_m :string;
  hgs_team_win :string;
  hgs_check :string;
  hgs_create_date :string;
  hgs_update_date :string;
  hd_home:string;
  hd_away:string;
  date_bill:string;
}