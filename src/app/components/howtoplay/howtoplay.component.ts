import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-howtoplay',
  templateUrl: './howtoplay.component.html',
  styleUrls: ['./howtoplay.component.css']
})
export class HowtoplayComponent implements OnInit {
  public todoHowtoplayText:HowtoplayText[];
  constructor(private todoServcie:TodoService) { }

  ngOnInit() {
    
  }

}

interface HowtoplayText {
  howtoplay_text_id :string;
  howtoplay_text_title :string;
  howtoplay_text_detail :string;
  howtoplay_text_sort :string;
  howtoplay_text_hide :string;
  howtoplay_text_delete :string;
  howtoplay_text_create_by :string;
  howtoplay_text_update_by :string;
  howtoplay_text_create_date :string;
  howtoplay_text_update_date :string;
}