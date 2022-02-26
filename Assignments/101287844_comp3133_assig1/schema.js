const { gql } = require('apollo-server-express');
 
exports.typeDefs = gql `
    type User {
      id: ID!
      username: String!
      firstname:String!
      lastname:String!
      password:String!
      email:String!
      type:String!
      token: String!
    }

    type Listing {
      id: ID!
      listing_id: String!
      listing_title:String!
      description:String!
      street:String!
      city:String!
      postal_code:String!
      price: Float!
      email: String!
      username: String!
    }

    type Booking{
      id:ID!
      listing_id:String!
      booking_id:String!
      booking_date:String!
      booking_start:String!
      booking_end:String!
      username:String!
    }
    
    type Query {
     
      getUser:[User]
      getListings:[Listing]
      getListing(listing_id: ID!):Listing
      getListingAdmin(username: String!):[Listing]
      getListingCity(city: String!):[Listing]
      getListingPostalcode(postal_code: String!):[Listing]
      getListingTitle(listing_title: String!):[Listing]
      getBooking(username: String!):[Booking]

    }
    type Mutation {
      addUser(
        username: String!
        firstname:String!
        lastname:String!
        password:String!
        email:String!
        type:String!):User  

        login(username:String!,password:String!):User
        
        createListing(
          listing_id: String!
          listing_title:String!
          description:String!
          street:String!
          city:String!
          postal_code:String!
          price: Float!
          email: String!
          username: String!
        ):Listing

        addBooking(
          listing_id:String!
          booking_id:String!
          booking_date:String!
          booking_start:String!
          booking_end:String!
          username:String!):Booking
    },
 ` 