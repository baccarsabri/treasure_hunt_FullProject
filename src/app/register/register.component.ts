import { AppService } from './../service/appService/app.service';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:any;
  password:any;

  constructor(private service:AuthServiceService,private router:Router , private AppService:AppService) { }

  ngOnInit(): void {
  }

  erroalert()  
  {  
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'veuillez vérifier vos informations!',  
      footer: ''  
    })  
  } 

  register(){

    if(this.username==""){
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: "l'identifiant est obligatoire ",  
        footer: ''  
      }) 
      return
    }
    else{
      if(this.password.length<8){
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: "le mot de passe doit contenir au moins 8 caractéres ",  
          footer: ''  
        }) 

      }else{
        this.AppService.getUserbyUsername(this.username).subscribe(
          r =>{
            console.log(r);
            if(r.user!=null){
              Swal.fire({  
                icon: 'error',  
                title: 'Oops...',  
                text: "Username Existe Deja !!  ",  
                footer: ''  
              }) 
            }
            else{
              this.service.register(this.username,this.password).subscribe(
                a =>{
                  this.service.login(this.username,this.password).subscribe(
                    res=>{
                     
                          if (res.success==true){
                            this.service.storeUserData(res.token,res.result);
                            this.router.navigate(['/home']);
                          }
                          else{
                            this.erroalert();
                          }        
                    }
                  )
                 
                }
              )
            }

          });
      
      }
    }
 


  }

}
