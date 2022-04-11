const User = require('./models/Users');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');
const jwt =require('jsonwebtoken');
const { UserInputError,AuthenticationError} = require('apollo-server-express');
require('dotenv').config();



function generateToken(user){
    return jwt.sign({
        id: user.id,
        email:user.email,
        username:user.username,
        type:user.type
    },process.env.JWT_KEY,{expiresIn: '1h'});
}

function checkAuth(context){
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token,process.env.JWT_KEY)
                return user;
            }catch(err){
                    throw new AuthenticationError('Invalid/Expired token');
            }
        }
        throw new AuthenticationError('Authentication token must be \'Bearer [token]');
    }
    throw new AuthenticationError('Authorization header must be provided');
};

function validateLoginInput (username,password){
    const errors = {};
    if(username.trim()===''){
        errors.username = 'Username must not be empty';
    }
    if(password.trim()===''){
        errors.username = 'Password must not be empty';
    }

    return{
        errors,
        valid: Object.keys(errors).length<1
    };

}



exports.resolvers = {
    Query: {

        //View Users
        getUser: async (parent, args) => {
            return await User.find({});
        },

        //View Listings
        getListings: async (parent, args) => {
            return await Listing.find({});
        },

        //View a Listing
        async getListing(_,{listing_id}){
            try{
                const Listing1 = await Listing.findById(listing_id)
                if(Listing1){
                    return Listing1;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },

         //Search listing by Title(Listing Name)
         async getListingsByTitle(_,{listingtitle}){
            try{
                const ListingByName = await Listing.find({listingtitle});
                if(ListingByName){
                    return ListingByName;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },        

        //Search listing by City
        async getListingsByCity(_,{city}){
            try{
                const ListingByCity = await Listing.find({city});
                if(ListingByCity){
                    return ListingByCity;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },

         //Search listing by Postal code
         async getListingsByPostalcode(_,{postal_code}){
            try{
                const ListingByPostalcode = await Listing.find({postal_code});
                if(ListingByPostalcode){
                    return ListingByPostalcode;
                }else{
                    throw new Error('Listing not found');
                }
            }catch(err){
                throw new Error(err);
            }
        },

        //View Listings by admin user
        async getListingAsAdmin(_,{username},context) {
            const user = checkAuth(context);
            const ListingByAdmin = await Listing.find({username})
            if(user.type=='admin'){
                if(ListingByAdmin){
                    return ListingByAdmin;
                }else{
                    throw new Error('Listing not found');
                }  
            }
            else{
                throw new Error("Please login as a Admin");
            }
            
        },
      


        //List all User bookings
        async getBooking(_,{username},context) {
            const user = checkAuth(context);
            const BookingByCustomer = await Booking.find({username})
            if(user.type=='customer'){
                if(BookingByCustomer){
                    return BookingByCustomer;
                }else{
                    throw new Error('Booking not found');
                }  
            }
            else{
                throw new Error("Please login as a customer");
            }
            
        },
        //Login
        async login(_,{username,password}){
            const {errors,valid} = validateLoginInput(username,password);
            const user = await User.findOne({username});
    
            if(!valid){
                throw new UserInputError('Errors',{errors});
            } 
    
    
            if(!user){
                errors.general ="User not found";
                throw new UserInputError('User not found',{errors});
            }
    
            if(!password.includes(user.password)){
                errors.general ="Wrong credentials";
                throw new UserInputError('Wrong credentials',{errors});
            }
    
            const token = generateToken(user);
    
            return{
                ...user._doc,
                id:user._id,
                token
            };
        },
        
    },
    
   
    Mutation: {

        //Login
    //     async login(_,{username,password}){
    //     const {errors,valid} = validateLoginInput(username,password);
    //     const user = await User.findOne({username});

    //     if(!valid){
    //         throw new UserInputError('Errors',{errors});
    //     } 


    //     if(!user){
    //         errors.general ="User not found";
    //         throw new UserInputError('User not found',{errors});
    //     }

    //     if(!password.includes(user.password)){
    //         errors.general ="Wrong credentials";
    //         throw new UserInputError('Wrong credentials',{errors});
    //     }

    //     const token = generateToken(user);

    //     return{
    //         ...user._doc,
    //         id:user._id,
    //         token
    //     };
    // },

    //Add user
      addUser: async (parent, args) => {
        console.log(args)
        const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
        
        if(!isValidEmail){
            throw new Error("email not in proper format")
        }

            let newUser = new User({
                username: args.username,
                firstname:args.firstname,
                lastname:args.lastname,
                password:args.password,
                email: args.email,
                type:args.type

            });
        const res = await newUser.save();

        const token = generateToken(res);

        return{
            ...res._doc,
            id:res._id,
            token
        };


        },
        //Create Listing
        createListing: async (parent, args,context) => {
           
                const user = checkAuth(context);
                console.log(user)
                if(user.type=='admin'){
                    
                    let newListing = new Listing({

                    listing_id : args.listing_id ? args.listing_id :'L001'+args.price,
                    listing_title: args.listing_title ? args.listing_title :'Sea face home for rent',
                    description:args.description,
                    street: args.street,
                    city:args.city,
                    postal_code:args.postal_code ? args.postal_code: 'M1X0Y5',
                    price: args.price ? args.price:150,
                    email: args.email,
                    username: args.username
    
                });


                return  await newListing.save();
                }

                else{
                    throw new Error("Customer cannot create a listing");
                }

            },

            addBooking: async (parent, args,context) => {
           
                const user = checkAuth(context);
                console.log(user)
                if(user.type=='customer'){
                    
                    let newBooking = new Booking({

                    listing_id : args.listing_id,
                    booking_id: args.booking_id,
                    booking_date:args.booking_date,
                    booking_start: args.booking_start,
                    booking_end:args.booking_end,
                    username:args.username,
    
                });


                return  await newBooking.save();
                }

                else{
                    throw new Error("Please login as a customer");
                }

            },



    }
  }