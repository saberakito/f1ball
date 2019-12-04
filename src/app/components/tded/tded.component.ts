import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router,NavigationEnd} from "@angular/router"
@Component({
  selector: 'app-tded',
  templateUrl: './tded.component.html',
  styleUrls: ['./tded.component.css']
})
export class TdedComponent implements OnInit {

  constructor(private todoServcie:TodoService,private router:Router) { }
  public users: Handicap[];
  
  ngOnInit() {
    this.todoServcie.getHandicap_tded('').subscribe((response)=>{
      //debugger;
      this.users = response.data;
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
