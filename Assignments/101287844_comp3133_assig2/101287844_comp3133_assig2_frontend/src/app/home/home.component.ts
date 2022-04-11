import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    if (localStorage.getItem("token")) this.isAuthenticated.next(true);
    else this.isAuthenticated.next(false);
    console.log("isAuthenticated "+ this.isAuthenticated.value);
   }

  ngOnInit(): void {
  }

}
