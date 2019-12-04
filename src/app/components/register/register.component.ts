import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import {ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) { }
  public todoRegisterText:RegisterText[];
  id:any;
  sub:any;
  public data_deatail:string = "<img src='/assets/images/loading/05.gif'>";
  public data_title:string;
  public user_name:string;
  public user_tel:string;
  public user_line:string;
  public email:string;
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'];
     // this.id =  params['id'];
     
    });
    //call service
    // this.todoServcie.getTextRegister().subscribe((response)=>{
      
    //   this.todoRegisterText = response;
    // });
    
  }
  onSubmit(form: NgForm): void {
   
  }

}

interface RegisterText {
  register_text_id :string;
  register_text_title :string;
  register_text_detail :string;
  register_text_sort :string;
  register_text_hide :string;
  register_text_delete :string;
  register_text_create_by :string;
  register_text_update_by :string;
  register_text_create_date :string;
  register_text_update_date :string;
}
