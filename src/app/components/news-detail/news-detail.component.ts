import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
id:any;
sub:any;
  constructor(private route:ActivatedRoute,private todoServcie:TodoService) { }
  public todoNewsDetail:Todo[];
  public adjust_page_title:string;
  public adjust_page_image_url:string;
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  public adjust_page_description:string;
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id'].split("-")[1];
     // this.id =  params['id'];
     
    });
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