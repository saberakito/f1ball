import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { TodoService } from 'src/app/service/todo.service';
import { IImage } from 'ng-simple-slideshow';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router"

import * as $ from 'jquery';
import * as AOS from 'aos';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private router:Router, private loginService: TodoService){}
  public username:string;
  public password:string;
  infoMessage = '';
  public member_name:string;
  public member_id:string;
  ngOnInit() {
    if(localStorage.getItem("login")=="success"&&localStorage.getItem("data_member")!=null){
      this.router.navigate(['/']);
      
    }
    if(localStorage.data_member!=null){
      var objArray = JSON.parse(localStorage.data_member);
      this.member_name = objArray.member_name+' '+objArray.member_lastname;
      this.member_id = objArray.member_id;
    }
  }
  Validateuser(){
    this.loginService.ValidateUser($("[name='username']").val(),$("[name='password']").val()).subscribe(data => {
      if(data.result=='Y'){
        this.loginService.saveMember($("[name='username']").val(),$("[name='password']").val()).subscribe(data => {
          localStorage.setItem("data_member",JSON.stringify(data));
          this.router.navigateByUrl('/');
          this.loginService.setLoggedIn(true);
          this.infoMessage = '';
          location.reload();
        });
        
      }else{
        this.infoMessage = 'Login Failed. Please Try Again.';
        this.router.navigate(['login']);
      }
    });
  }
}
