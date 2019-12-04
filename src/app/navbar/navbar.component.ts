import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {Router} from "@angular/router"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private serviceMenu:TodoService) { }
  public menus:Todo[];
  public member_name:string;
  public member_id:string;
  public string_secur:string;
  ngOnInit() {
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_name+' '+objArray.member_lastname;
      this.member_id = objArray.member_id;
      this.string_secur = "ออกจากระบบ";
    }else{
      this.string_secur = "เข้าสู่ระบบ";
    }
    // this.serviceMenu.getMenu().subscribe((response)=>{
    //   this.menus = response;
    // });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    this.string_secur = "เข้าสู่ระบบ";
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_name+' '+objArray.member_lastname;
      this.member_id = objArray.member_id;
    }
  }

}

interface Todo{
  menu_id:number;
  menu_name:string;
  menu_detail:string;
  menu_route:string;
  menu_type:string;
  menu_sort:string;
}
