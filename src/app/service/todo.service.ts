import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
interface registerData{
  success:boolean,
  message:string,
  data:string,
  register_text_detail:string,
  type:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http:Http, private http2: HttpClient) { }

  //private local = window.location.origin;
  private local = "http://localhost:80";
  //private local = "http://betufa55.com";

  getCredit(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getCredit",member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicap(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap"}).pipe(map((res)=>res.json()));
  }
  getHandicap_result_from_date(date){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_result_from_date",date:date}).pipe(map((res)=>res.json()));
  }
  getHandicap_member_id(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_member",member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicap_tded(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_tded",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_by_id(member_id,id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_by_id",member_id:member_id,id:id}).pipe(map((res)=>res.json()));
  }


  getHandicap_game(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_play(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_play",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicap_game_play_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicap_game_play_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  get_step(member_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"get_step",member_id:member_id}).pipe(map((res)=>res.json()));
  }

  getHandicapFromDate(data,member_id){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicapFromDate",date:data,member_id:member_id}).pipe(map((res)=>res.json()));
  }
  getHandicapGraph(){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getHandicapGraph"}).pipe(map((res)=>res.json()));
  }

 
  

  saveHandicap(id,member_id){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveHandicap",hd_id:id,member_id:member_id});
  }

  saveDataGame(m_id,data){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveDataGame",m_id:m_id,data:data});
  }
  saveDataGame_step(m_id,data){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveDataGame_step",m_id:m_id,data:data});
  }


  getDataGame(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDataGame",m_id:m_id}).pipe(map((res)=>res.json()));
  }


  

  saveMember(member_code,member_code_tran){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"saveMember",member_code:member_code,member_code_tran:member_code_tran});
  }

  autoLogin(scode){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"autoLogin",scode:scode});
  }

  getChart(){
      
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return true;
  }

  updateCredit(member_code,member_code_tran){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=updateCredit',{mem_code:member_code,mem_codeTrans:member_code_tran});
  }
  updateCreditSave(member_code,member_code_tran,object){
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=updateCreditSave',{mem_code:member_code,mem_codeTrans:member_code_tran,creditArray:object});
  }

  getDateGame_played(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"getDateGame_played",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  check_play(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"check_play",m_id:m_id}).pipe(map((res)=>res.json()));
  }

  check_play_step(m_id){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"check_play_step",m_id:m_id}).pipe(map((res)=>res.json()));
  }
  checkWinGame(m_id,date){
    //return this.httpjson.post('http://localhost:4800',{ac:"getMember"}).pipe(map((res)=>res.json()));
    return this.http.post(this.local+'/api/dataAdjustSport.php',{ac:"checkWinGame",m_id:m_id,date_data:date}).pipe(map((res)=>res.json()));
  }

  loggedInStatus = false;
  setLoggedIn(value: boolean){
    localStorage.setItem("login", 'success');
    this.loggedInStatus = value;
  }
  get isLoggedIn(){
    return this.loggedInStatus
  }
  ValidateUser(username,password){
   // return this.http2.get<myData>('http://wbox.xyz/apis/memlogin.z?mem_code='+username+'&mem_codeTrans='+password+'&fbclid=IwAR25LK6mq1AJT099GRF7TzxAXk1be7eBOcZ1Me-R9yMrhajasm4kM3IYz2w');
   // return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=loginMember',{username:username,password:password});
   return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=checkMember',{mem_code:username,mem_codeTrans:password});
  }

  ValidateUserLink(scode:string){
    // return this.http2.get<myData>('http://wbox.xyz/apis/memlogin.z?mem_code='+username+'&mem_codeTrans='+password+'&fbclid=IwAR25LK6mq1AJT099GRF7TzxAXk1be7eBOcZ1Me-R9yMrhajasm4kM3IYz2w');
    // return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php?ac=loginMember',{username:username,password:password});
    return this.http2.post<myData>(this.local+'/api/dataAdjustSport.php',{ac:"checkMemberLink",scode:scode});
   }
  
}
interface myData{
  data:string,
  success:any,
  message:string,
  result:any
}
interface contactData{
  success:boolean,
  message:string,
  data:string,
  contact_text_detail:string,
  type:string
}
