import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddnewListingComponent } from './addnew-listing/addnew-listing.component';
import { BookedListingComponent } from './booked-listing/booked-listing.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchListingComponent } from './search-listing/search-listing.component';
import { ViewAddedListingComponent } from './view-added-listing/view-added-listing.component';


const routes: Routes = [
  {path:'register',component:RegisterComponent}, 
  {path:'login',component:LoginComponent}, 
  {path:'',component:SearchListingComponent} , 
  {path:'addnew_listing',component:AddnewListingComponent}, 
  {path:'viewAdded_listing',component:ViewAddedListingComponent}, 
  {path:'booked_listing',component:BookedListingComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
