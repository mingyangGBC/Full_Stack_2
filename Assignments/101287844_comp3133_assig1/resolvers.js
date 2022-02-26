const User = require('./models/Users');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');
const jwt =require('jsonwebtoken');
const { UserInputError,AuthenticationError } = require('apollo-server-express');
require('dotenv').config();



function generateToken(user){
    return jwt.sign({
        id: user.id,
        email:user.email,
        username:user.username,
        type:user.type
    },process.env.JWT_KEY,{expiresIn: '1h'});
}

const auth = (context) =>{
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token,process.env.JWT_KEY)
                return user;
            }catch(err){
                    throw new AuthenticationError('Token is not available');
            }
        }
        throw new AuthenticationError('Authentication token must be \'Bearer [token]');
    }
    throw new AuthenticationError('Header is missing');
};

const validate = (username,pwd) =>{
    const errors = {};
    if(username.trim()===''){
        errors.username = 'Enter username please';
    }
    if(pwd.trim()===''){
        errors.username = 'Enter password please';
    }

    return{
        errors,
        valid: Object.keys(errors).length<1
    };

}



exports.resolvers = {
    Query: {

        getUser: async (parent, args) => {
            return await User.find({});
        },

        getListings: async (parent, args) => {
            return await Listing.find({});
        },

        async getListing(_,{id}){
            try{
                const list = await Listing.findById(id)
                if(list){
                    return list;
                }else{
                    throw new Error('No listing found');
                }
            }catch(err){
                throw new Error(err);
            }
        },


        async getListingAdmin(_,{username},context) {
            const user = auth(context);
            const listingAdmin = await Listing.find({username})
            if(user.type=='admin'){
                if(listingAdmin){
                    return listingAdmin;
                }else{
                    throw new Error('No listing found');
                }  
            }
            else{
                throw new Error("You are not admin");
            }
            
        },

        
        async getListingTitle(_,{listing_title}){
            try{
                const getTitle = await Listing.find({listing_title});
                if(getTitle){
                    return getTitle;
                }else{
                    throw new Error('No listing found');
                }
            }catch(err){
                throw new Error(err);
            }
        },        

        async getListingCity(_,{city}){
            try{
                const getCity = await Listing.find({city});
                if(getCity){
                    return getCity;
                }else{
                    throw new Error('No listing found');
                }
            }catch(err){
                throw new Error(err);
            }
        },

        async getListingPostalcode(_,{postal_code}){
            try{
                const getPostalCode = await Listing.find({postal_code});
                if(getPostalCode){
                    return getPostalCode;
                }else{
                    throw new Error('No listing found');
                }
            }catch(err){
                throw new Error(err);
            }
        },
      
        async getBooking(_,{username},context) {
            const user = auth(context);
            const booking = await Booking.find({username})
            if(user.type=='customer'){
                if(booking){
                    return booking;
                }else{
                    throw new Error('No booking found');
                }  
            }
            else{
                throw new Error("You are not customer");
            }
            
        },
    },
    
   
    Mutation: {
        async login(_,{username,password}){
            const {errors,valid} = validate(username,password);
            const user = await User.findOne({username});

            if(!valid){
                throw new UserInputError('Error',{errors});
            } 


            if(!user){
                errors.general ="No user found";
                throw new UserInputError('No user found',{errors});
            }

            if(!password.includes(user.password)){
                errors.general ="Wrong credentials";
                throw new UserInputError('Invalid password',{errors});
            }

            const token = generateToken(user);

            return{
                ...user._doc,
                id:user._id,
                token
            };
        },

        addUser: async (parent, args) => {
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("Please enter valid email")
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

        createListing: async (parent, args,context) => {
            
            const user = auth(context);
            if(user.type=='admin'){
                
                let newListing = new Listing({

                listing_id : args.listing_id,
                listing_title: args.listing_title,
                description:args.description,
                street: args.street,
                city:args.city,
                postal_code:args.postal_code,
                price: args.price,
                email: args.email,
                username: args.username

            });


            return  await newListing.save();
            }

            else{
                throw new Error("You cannot add a listing as a customer ");
            }

        },

        addBooking: async (parent, args,context) => {
        
            const user = auth(context);
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
                throw new Error("You are not a customer");
            }

        },
    }
  }