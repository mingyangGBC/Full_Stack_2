import { HttpParams,HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const ADD_LISTING = gql`
mutation($listingId: String, $listingTitle: String, $description: String!, $street: String!, $city: String!, $postalCode: String, $price: String, $email: String!, $username: String!){
  createListing(listing_id: $listingId, listing_title: $listingTitle, description: $description, street: $street, city: $city, postal_code: $postalCode, price: $price, email: $email, username: $username) {
    listing_id
    listing_title
  }
}
`;


@Injectable({
  providedIn: 'root'
})
class AddListingService {
  constructor(private apollo: Apollo) {}

  createListing(listing_id: string, listing_title: string, description: string, street: string, city: string, postal_code: string, price: string, email:string, username: string) {
    return this.apollo.mutate({
      mutation: ADD_LISTING,
      variables: {
        listing_id,
        listing_title,
        description,
        street,
        email,
        city,
        postal_code,
        price,
        username
      }
    });
  }
}
@Component({
  selector: 'app-addnew-listing',
  templateUrl: './addnew-listing.component.html',
  styleUrls: ['./addnew-listing.component.css']
})
export class AddnewListingComponent implements OnInit {

  constructor(private addListingService: AddListingService,private http: HttpClient, private router: Router,private _snackBar: MatSnackBar,private apollo: Apollo) { }
  
  ListingIdControl = new FormControl('',[Validators.required]);
  ListingTitleControl = new FormControl('',[Validators.required]);
  DescriptionControl = new FormControl('',[Validators.required]);
  StreetControl = new FormControl('',[Validators.required]);
  CityControl = new FormControl('',[Validators.required]);
  PostalCodeControl = new FormControl('',[Validators.required]);
  PriceControl = new FormControl('',[Validators.required]);

  loading = true;
  users: any;

  ngOnInit(): void {
  }

  getErrorMessage_ListingId() {
    if (this.ListingIdControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_Street(){
    if (this.StreetControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_City(){
    if (this.CityControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_ListingTitle(){
    if (this.ListingTitleControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_Description(){
    if (this.DescriptionControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_PostalCode(){
    if (this.PostalCodeControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  getErrorMessage_Price(){
    if (this.PriceControl.hasError('required')) {
      return 'You must enter a value';
    }
    return null;
  }

  add(){
    let body = new HttpParams({
      fromObject:{
          'listingId': this.ListingIdControl.value,
          'password': this.ListingTitleControl.value,
          'firstname': this.StreetControl.value,
          'lastname': this.CityControl.value,
         
      }
    });

    if(this.ListingIdControl.value=="" || this.ListingTitleControl.value=="" || 
    this.DescriptionControl.value=="" || this.StreetControl.value=="" || this.CityControl.value==""|| this.PostalCodeControl.value==""
    || this.PriceControl.value==""){
      alert("Listing added Unsuccessfully !!!");
    }

    else {
     let token = localStorage.getItem("token");
     if (token==null) token = ""
     let user = JSON.parse(atob(token.split('.')[1])).username
     let email = JSON.parse(atob(token.split('.')[1])).email
     console.log(user)
     console.log(email)
     this.addListingService.createListing(this.ListingIdControl.value,this.ListingTitleControl.value,this.DescriptionControl.value,this.StreetControl.value,this.CityControl.value,this.PostalCodeControl.value,this.PriceControl.value,email,user)
     .subscribe(({ data }) => {
       console.log(data);
     }, (error) => {
       console.log(error);
     });
    }
  }
}
