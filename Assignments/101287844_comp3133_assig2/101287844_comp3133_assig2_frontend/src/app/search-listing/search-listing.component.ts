import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable,Subscription } from 'rxjs';


const GET_LISTINGS = gql`
query{
  getListings {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    email
    username
  }
}
`;

const GET_LISTINGS_ByNAME = gql`
query ($listingTitle: String){
  getListingsByTitle(listing_title: $listingTitle) {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    username
   }
  }
`;



const GET_LISTINGS_ByCITY = gql`
query($city: String!){
  getListingsByCity(city: $city) {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    username
  }
}
`;

const GET_LISTINGS_ByPOSTALCODE = gql`
query($postalCode: String){
  getListingsByPostalcode(postal_code: $postalCode) {
    listing_id
    listing_title
    description
    street
    city
    postal_code
    price
    username
  }
}

`;

const ADD_BOOKING_BY_USR = gql`
mutation($listingId: String, $bookingId: String!, $bookingDate: String!, $bookingStart: String!, $bookingEnd: String!, $username: String!){
  addBooking(listing_id: $listingId, booking_id: $bookingId, booking_date: $bookingDate, booking_start: $bookingStart, booking_end: $bookingEnd, username: $username) {
    listing_id
    booking_id
    booking_date
    booking_start
    booking_end
    username
  }
}
`;



@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {


  SearchByNameControl = new FormControl('');
  SearchByCityControl = new FormControl('');
  SearchByPostalCodeControl = new FormControl('');


  BookingStartDate = new FormControl('',[Validators.required]);
  BookingEndDate = new FormControl('',[Validators.required]);
  BookingId = new FormControl('',[Validators.required]);

 // listing: any[] | undefined;
  loading = true;
  listings: any;
  bookedNotClicked = true;

  listingItemId: String | undefined;

  private querySubscription!: Subscription;
  private mutationSub!: Subscription;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    // this.listings = this.apollo
    // .watchQuery({
    //   query: GET_LISTINGS,
    // })
    // .valueChanges.pipe(
    //   map((result: any) => {
    //     console.log(result.data.listings);
    //     return result.data.listings;
    //   })
    // );

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_LISTINGS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.listings = data.getListings;
        console.log(this.listings);
      });
   
  }


getlisting(getListings: any[]) {
    if (getListings.length > 1)
        return getListings.reduce((acc, cur) => acc.listing_title + ", " + cur.listing_title);
    else return getListings[0].listing_title;
}

searchByName(){
  console.log("Search by name")
  console.log(this.SearchByNameControl.value)
 // let listing_title = this.SearchByNameControl.value

  this.querySubscription = this.apollo.watchQuery<any>({
    query: GET_LISTINGS_ByNAME,
    variables: {
      listing_title:this.SearchByNameControl.value ,
    }, 
  })
  .valueChanges.subscribe(({data}) => {
   console.log(data)
  },
  error => {
    console.log("there was an error sending the query", error);
  }
  
  
  );
  
}

searchByCity(){
  this.listings=[];
  console.log("Search by City")
  console.log(this.SearchByCityControl.value)
  this.querySubscription = this.apollo.watchQuery<any>({
    query: GET_LISTINGS_ByCITY,
    variables: {
      city: this.SearchByCityControl.value,
    }, 
  })
  .valueChanges.subscribe(({data}) => {
   console.log(data)
   this.listings = data.getListingsByCity;
  },
  error => {
    console.log("there was an error sending the query", error);
  }
  
  );
}

searchByPostalCode(){
  console.log("Search by Postal Code")
  console.log(this.SearchByPostalCodeControl.value)
  this.querySubscription = this.apollo.watchQuery<any>({
    query: GET_LISTINGS_ByPOSTALCODE,
    variables: {
      postal_code: this.SearchByPostalCodeControl.value,
    }, 
  })
  .valueChanges.subscribe(({data}) => {
   console.log(data)
   this.listings = data.getListingsByPostalcode;
  },
  error => {
    console.log("there was an error sending the query", error);
  }
  
  );
}

addBooking(desc: string){
  let token = localStorage.getItem("token");
  let user = token? JSON.parse(atob(token.split('.')[1])).username : ""
  let type = token? JSON.parse(atob(token.split('.')[1])).type : ""
 // let today: object = new Date();
  console.log("Book btn clicked")
  console.log(desc)

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  let currentdate = dd + '-' + mm + '-' + yyyy;

  console.log(this.listingItemId)
  console.log(this.BookingId.value)
  console.log(currentdate)
  console.log(this.BookingStartDate.value)
  console.log(this.BookingEndDate.value)
  console.log(user);
  console.log(type);
  // can implement booking 
  this.bookedNotClicked = !this.bookedNotClicked
 this.apollo.mutate({
    mutation: ADD_BOOKING_BY_USR,
    variables: {
      listing_id:this.listingItemId,
      bookingId:this.BookingId.value,
      bookingDate:currentdate,
      bookingStart:this.BookingStartDate.value,
      bookingEnd:this.BookingEndDate.value,
      username:user
    }
  }).subscribe(({ data }) => {
    console.log('got data', data);
  }, (error) => {
    console.log('there was an error sending the query', error);
  });

}

getErrorMessage_Start() {
  if (this.BookingStartDate.hasError('required')) {
    return 'Date should be MM-DD-YYYY';
  }
  return null;
}


getErrorMessage_End() {
  if (this.BookingEndDate.hasError('required')) {
    return 'Date should be MM-DD-YYYY';
  }
  return null;
}

getErrorMessage_Id(){
  if (this.BookingId.hasError('required')){
    return 'Id cannot be empty'
  }
  return null;
}

switchForms(listing:any) {
  this.bookedNotClicked = !this.bookedNotClicked
  this.listingItemId=listing.listing_id;
}

}
