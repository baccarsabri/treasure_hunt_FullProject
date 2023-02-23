import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:AuthServiceService,private router:Router,) { }

  username:any;
  password:any;
   a = this.service.isAuthenticated();
  ngOnInit(): void {
 if(this.service.getToken!=null){
  this.router.navigate(['/home']);
 }
    
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

  logIn(){

    

    if(this.username=="" || this.password==""){
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'veuillez Remplir vos informations!',  
        footer: ''  
      })  
      return 
    }
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


}
