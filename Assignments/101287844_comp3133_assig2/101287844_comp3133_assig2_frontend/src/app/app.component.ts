import { Component, NgModule } from '@angular/core';
import {Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '101054615_comp3133_assig2';
  userRole = "guest"
  ngOnInit(){
    this.userRole = this.detUserRole()
    console.log(this.userRole)
  }
  
  hide=false;
  isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private _router: Router,private authService: AuthService) {
    if (localStorage.getItem("token")) this.isAuthenticated.next(true);
    else this.isAuthenticated.next(false);
    console.log("isAuthenticated "+ this.isAuthenticated.value);
  }

  token = localStorage.getItem("token")
  

  toSignUp() {
    console.log("signUp clicked");
    this._router.navigateByUrl('/register')
  }

  toLogin() {
    console.log("Login Clicked");
    this._router.navigateByUrl('/login')
  }

  toLogout(){
    this.authService.signout();
  }
  

  detUserRole(){
    let token = localStorage.getItem("token")
    if (token==null) token = ""
    let userRole = (token)? JSON.parse(atob(token.split('.')[1])).type: "guest"
    if (userRole == "admin") userRole = "admin"
    else if (userRole == "user") userRole = "user"
    return userRole
  }
}

function constructor() {
  throw new Error('Function not implemented.');
}

