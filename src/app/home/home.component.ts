import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../service/appService/app.service';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private service:AuthServiceService,private appSerivce:AppService) { }

  questions:any;
  user:any;
  score : any;
  a = this.service.isAuthenticated();
  username:any;

  myQuestions:any;
  user_id:any;
  grey="grey";
  red="red";
  green="green";

 
 




  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    
    this.user = this.service.getUser();
    this.user_id=this.user._id;
  
     
   

    this.appSerivce.getQuestions().subscribe(
      res=>{
        if(res.success==true){
          this.questions=res.q;
        }
      }
    );

    this.appSerivce.getUserById(this.user._id).subscribe(
      res=>{
        this.myQuestions=res.user.questions;
        this.username=res.user.username;
        this.score = res.user.score;

        for(let i=0;i<this.myQuestions.length;i++){
        if(this.myQuestions){
          setInterval(() => {
            if(this.myQuestions[i].statut == true){
            
          
          
              var a= document.getElementById(this.myQuestions[i]._id) as HTMLButtonElement | null;
        
        
        
           
           
              if(a!=null){
               a?.setAttribute("style", "background-color: green;");
               a.disabled = true;
              }
            
             
             
              
             }else if(this.myQuestions[i].statut == false){
               var a= document.getElementById(this.myQuestions[i]._id) as HTMLButtonElement | null;
               if(a!=null){
                 a?.setAttribute("style", "background-color: red;");
                 a.disabled = true;
                }
             }
          
          }, 300);
       
          
        }

        }

       
        

        
      }
    )



  }

  

  logout(){
    this.service.signOut();
    this.router.navigate(['/login']);

  }

  goToQ(id:any,time:any){
    localStorage.setItem('time',time);
    this.router.navigate(['question', id ]);
  }


  checkQ(idQ:any){
    
    this.appSerivce.checkQst(this.user_id,idQ).subscribe(
      res=>{
        if(res.success==true){
          if(res.check==true){
            return "green"
          }else {
            return "red"
          }
        }else {
          return "grey"
        }
      }

     
    )

    return "grey"
  }

}
