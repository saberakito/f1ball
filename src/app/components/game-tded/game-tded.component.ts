import { Component, OnInit, ViewChild} from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router , NavigationEnd} from "@angular/router";
import {ActivatedRoute } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-game-tded',
  templateUrl: './game-tded.component.html',
  styleUrls: ['./game-tded.component.css']
})

export class GameTdedComponent implements OnInit {

  constructor(private route:ActivatedRoute,private todoServcie:TodoService,private router:Router) { }
  @ViewChild('nav') slider: NgImageSliderComponent;
  public todoList:Todo[];
  public users: Handicap[];
  public steps:any;
  public hand_steps:any;
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
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[2];
        if(check_url=='register'||check_url=='deposit'||check_url=='withdraw'){
          this.showHeader = false;
        }else{
          this.showHeader = true;
        }
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
    });

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

    
    this.bsInlineValue = new Date();
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_code;
      this.member_id = objArray.member_id;
      this.member_code_tran = objArray.member_code_tran;


      this.todoServcie.check_play_step(this.member_id).subscribe((response1)=>{
      //  debugger;
        if(response1.data==true){
          this.todoServcie.get_step(this.member_id).subscribe((response)=>{
            if(response.success!=false&&response.success!=null){
              if(response.data[0].hg_team_win!=null && response.data[0].hg_team_win!=''){
                this.checkBtn = '1';
              }
              this.countGameStep = response.data.length;
              this.steps = response.data;
              this.check_game_start = '1';
              this.todoServcie.getHandicap_game_play_step(this.member_id).subscribe((response)=>{
                  this.hand_steps = response.data;
         //         console.log(this.hand_steps);
              });
            }else{
              this.checkBtn = '1';
            }
          });
        }else{
          this.todoServcie.getHandicap_game_step(this.member_id).subscribe((response)=>{
            if(response.success!=false&&response.success!=null){
              if(response.data[0].hg_team_win!=null && response.data[0].hg_team_win!=''){
                this.checkBtn = '1';
              }
           //   console.log(response.data[0]);
              this.check_game_start = '1';
            //  this.countGameStep = response.data.length;
              this.users = response.data;
            }else{
         //     console.log(1);
              
              this.checkBtn = '1';
            }
          });
        }
      });
    }

    this.todoServcie.getDateGame_played(this.member_id).subscribe((response)=>{
     // debugger;
      this.checkHaveGame = response.data.length;
      this.btnCheckGames = response.data;
    });


    

    //this.member_id = '1';
    

    

    this.todoServcie.getCredit(this.member_id).subscribe((response)=>{
      this.credit_member = response.data.member_credit;
      //this.users = response.data;

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
      for (var index = 0; index < Object.keys(form.value).length; ++index) {
        this.check_value_length = Object.values(form.value)[index];
        if(this.check_value_length.length==1){
          count_check = count_check+1;
        }
      }
      if(count_check!=6){
        alert('กรุณาเลือก "ทีมชนะ" ให้ครบ 6 ทีมก่อนส่งข้อมูล');
        return;
      }else{
       // if (confirm("ส่งผลทายหรือไม่?")== true) {
          this.todoServcie.calDataGame_step(this.member_id,form.value).subscribe(data=>{
          //  debugger;
           this.steps = data['array_bill'];
           this.countGameStep = data['array_bill'].length;
          this.hand_steps = data.data;
           console.log(data.data);
            if(data.success==true){
             // alert(data.message);
            //  location.reload();
            }else{
              alert('บันทึกข้อมูลผิดพลาด');
            }
          });
      //  }
      }
    
    
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