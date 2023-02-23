import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../service/appService/app.service';
import { AuthServiceService } from '../service/auth-service.service';
import { environment } from "../../environments/environment";

import { DomSanitizer } from '@angular/platform-browser';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  url : any;
  

  constructor(private activatedRoute: ActivatedRoute,private router:Router,private service:AuthServiceService,private appSerivce:AppService,private domSanitizer: DomSanitizer) {this.url=environment.urlBackend }

  

  label : any;
  r1:any;
  r2:any;
  r3:any;
  r4:any;
  correct:any;
  statut:any;
  idQ:any;
  points:any;

  id_user:any;

  checked:any;

  timeLeft: any ;
  interval:any;
  time: any;
  image:any;
  im:any="";

startTimer() {
  
  

  this.timeLeft=window.localStorage.getItem("time");
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        localStorage.setItem("time",this.timeLeft);
        
      }else{
        if(this.timeLeft==0){
          this.submit();
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
            localStorage.removeItem("time");

          });
          
        }
      }
    },1000)}



  ngOnInit(): void {

    this.id_user=this.service.getUser()._id;
    
   

   
    let id = this.activatedRoute.snapshot.params['id'];

    this.appSerivce.checkEtat(this.id_user,id).subscribe(
      res=>{
      
        if(res.check=="terminer"){
          this.successNotification('Error','Vous pouvez pas repasser la question  ','error');
        }else{
          this.appSerivce.getQst(id).subscribe(
            res =>{
            
              this.label=res.questionD.label;
              this.r1=res.questionD.r1;
              this.r2=res.questionD.r2;
              this.r3=res.questionD.r3;
              this.r4=res.questionD.r4;
              this.correct=res.questionD.correct_answer;
              this.idQ=res.questionD._id;
              this.points=res.questionD.points;
              this.time=res.questionD.time;
              if(res.questionD.image!=""){
                this.im=this.url+'/public/uploads/image-'+res.questionD.image;
              }
             
      
      
      
              
              
             
                this.timeLeft=window.localStorage.getItem("time");
                
            
          
               
               
              this.appSerivce.addQst(this.id_user,this.idQ).subscribe(
                res=>{
               
                }
              )
          
              
              this.startTimer();
            }
          );
        }
      });
    
    


    
   
 
  }

  successNotification(title:any,msg:any,icon:any) {
    Swal.fire(title, msg, icon).then((result)=>{
      if(result.value){
        this.router.navigate(['/home']);
      }
    });
  }

  

  submit(){

    

    if(this.correct==this.checked){
      this.statut=true;

      //notif

    }else{
      this.statut=false;
      this.points=0;
    }
 
    this.appSerivce.submitQst(this.id_user,this.idQ,this.statut,this.points).subscribe(
      res=>{

      
        if(res.success==true){
          
          
          if(this.statut==true){
            
            this.successNotification('Bonne Repense','vous avez reussi ','success');
            
            //notif
            
          }else{
            
            this.successNotification('Fausse Repense','vous avez perdu ','error');
          }

        //  this.router.navigate(['/home']);
        }
      }
    )



  }


  onItemChange(e:any){

    this.checked=e.target.value;
     }


   

}
