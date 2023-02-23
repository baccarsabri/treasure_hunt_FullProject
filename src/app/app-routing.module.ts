import { GuardService } from './guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent,
    
  },
  {
    path: 'register',
    component:RegisterComponent,
    
  },
  {
    path: 'home',
    component:HomeComponent,
    canActivate:[GuardService]
    
  },

  {
    path: 'question/:id',
    component:QuestionComponent,
    canActivate:[GuardService]
    
  },
  {
    path: '**', pathMatch: 'full',
    component:HomeComponent,
    canActivate:[GuardService]
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
