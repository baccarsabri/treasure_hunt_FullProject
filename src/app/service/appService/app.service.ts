import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  url=environment.urlBackend;

  constructor(private http:HttpClient) { }


  //get user by id 

  getUserById(id:any):Observable<any>{
    return this.http.get(this.url+'/api/user/get/'+id
    )
    
  }


  getQuestions():Observable<any>{
    return this.http.get(this.url+'/api/question/Questions'
    )
    
  }

  getQst(id:any):Observable<any>{
    return this.http.get(this.url+'/api/question/get/'+id
    )
    
  }

  addQst(id:any,idQ:any):Observable<any>{
    return this.http.post(this.url+'/api/user/addQ', 
     {
       id,
       idQ,
      
     }
    )
  }


  submitQst(id:any,idQ:any,statut:any,points:any):Observable<any>{
    return this.http.post(this.url+'/api/user/submitQ', 
     {
       id,
       idQ,
       statut,
       points
     }
    )
  }


  checkQst(id:any,idQ:any):Observable<any>{
    return this.http.post(this.url+'/api/user/checkQ', 
     {
       id,
       idQ,
       
     }
    )
  }

  checkEtat(id:any,idQ:any):Observable<any>{
    return this.http.post(this.url+'/api/user/etat', 
     {
       id,
       idQ,
       
     }
    )
  }
  getUserbyUsername(username:string):Observable<any>{
    return this.http.post(this.url+'/api/user/username', 
     {
       username
       
     }
    )
  }


  




}
