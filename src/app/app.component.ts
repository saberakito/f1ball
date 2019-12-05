import { Component,ViewChild } from '@angular/core';

import { AuthService } from './service/auth.service';
import { Router,NavigationEnd } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
import { CookieService } from 'ngx-cookie-service';
import { TodoService } from 'src/app/service/todo.service';
import * as AOS from 'aos';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'casino';
  constructor(private todoServcie:TodoService,private _authService:AuthService, private _router:Router, private cookie:CookieService,private router:Router){}
  @ViewChild('nav') slider: NgImageSliderComponent;
  public close_popup = "0";
  public adjust_page_image_name:string;
  public adjust_page_image_type:string;
  public website_title:string;
  imageObject: Array<object> = [{
      image: '/assets/images/content/slide1.jpg',
      thumbImage: '/assets/images/content/slide2.jpg'
  }, {
      image: '/assets/images/content/slide2.jpg',
      thumbImage: '/assets/images/content/slide1.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  },{
      image: '/assets/images/content/slide3.jpg',
      thumbImage: '/assets/images/content/slide3.jpg',
      //title: 'Image with title' //Optional: You can use this key if you want to show title
  }
  ];
  prevImageClick() {
      this.slider.prev();
  }

  nextImageClick() {
      this.slider.next();
  }

  closePopup() {
    this.cookie.set("close_popup", "1",1);
    this.close_popup = '1';
  }
  public class_checkShow:string;
  showHeader = true;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var check_url = event.url.split("/")[1];
        if(check_url=='game'||check_url=='game_tded'){
          this.showHeader = false;
          $('body').css('background','unset');
         // this.class_checkShow = "content_100";
        }else{
          this.showHeader = true;
         // this.class_checkShow = "container bg_content";
        // this.class_checkShow = "container bg_content";
        }
        
      //  this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
      }
    });

    
   
    AOS.init();
   
    var close_popup_value =  this.cookie.get("close_popup");
    if(close_popup_value=='1'){
      this.close_popup = '1';
    }
    document.body.classList.add('bg-img');
    if(localStorage.getItem('web_status')=='2'){
      this._router.navigate(['/404']);
      return false;
    }
      
  }
}

