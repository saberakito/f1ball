import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.component.html',
  styleUrls: ['./livescore.component.css']
})
export class LivescoreComponent implements OnInit {
 public variable_name:any;
  constructor(private _sanitizationService: DomSanitizer) {
    
  }
  public link = location.protocol+'//www.score108.com/Soccer/iframeAPI/todaymatch';
  
  ngOnInit() {
    this.variable_name=this._sanitizationService.bypassSecurityTrustResourceUrl(location.protocol+'//www.score108.com/Soccer/iframeAPI/todaymatch'); 
  }

  // getLink(){
    
  //   return this.variable_name;
  // }

}
