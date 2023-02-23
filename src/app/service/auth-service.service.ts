import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url=environment.urlBackend;


  constructor(private http:HttpClient,private jwtHelper:JwtHelperService) { }

  login(username:any,password:any):Observable<any>{
    return this.http.post(this.url+'/api/user/login', 
     {
       username,
       password
     }
    )
  }

  register(username:any,password:any):Observable<any>{
    return this.http.post(this.url+'/api/user/register', 
     {
       username,
       password
     }
    )
  }


  storeUserData(token:any, user:any) {
    localStorage.setItem('auth' , token);
    localStorage.setItem('user',JSON.stringify(user));
    
  }

  public getUser(): any {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public getToken(): any {
    return localStorage.getItem('auth');
  }

  getIdfromToken(): string{
    const jwtData = this.getToken().split('.')[1] ;
    const decodedJwtJsonData = window.atob(jwtData) ;
    const decodedJwtData = JSON.parse(decodedJwtJsonData) ;
    return decodedJwtData.user_id;
  }


  isAuthenticated(): boolean {
    
    const token:any = localStorage.getItem('auth');
    return !this.jwtHelper.isTokenExpired(token);
}
signOut(){

  localStorage.clear();
 
  
}


}
