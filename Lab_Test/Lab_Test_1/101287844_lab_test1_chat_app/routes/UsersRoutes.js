const express = require('express');
const app = express();
const userModel = require('../model/User')

app.get('/', async (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get('/chatroom', async (req, res)=>{
    res.sendFile(__dirname+"/chat.html")
})

app.get('/select', async (req, res)=>{
    res.sendFile(__dirname+"/select.html")
})

app.get('/signup', async(req, res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/signup", async (req, res) => {
    const newUser = new userModel({
      username: req.body.username,
      password: req.body.password
    });
  
    await userModel.findOne({ username: newUser.username })
      .then(async info => {
        if (!info) {
          await newUser
            .save()
            .then(() => {
              res.status(200).send(newUser);
            })
            .catch(err => {
              console.log("Error is ", err.message);
            });
        } else {
          res.send("User already exists...");
        }
      })
      .catch(err => {
        console.log("Error is", err.message);
      });
  });

app.post('/', async(req, res)=>{
    let newUser = {};
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    await userModel.findOne({username: newUser.username})
        .then(info =>{
            if(!info){
                res.send("User not found!")
            }
            else{
                if(info.password == newUser.password){
                    res.sendFile(__dirname+"/select.html")
                }
                else{
                    res.send("Invalid Password")
                }
            }
        })
        .catch(err=>{
            res.status(500).send(err);                                                                                                          
        })
})

app.post(`/chatroom`,
    async (req, res) => {
        const chat = new Chat({
            "from": req.body.username,
            "room": req.body.room,
            "message": req.body,
            "date": req.body
        })
        try {
            const saveChat = await chat.save()
            res.json(saveChat)
        } catch (err) {
            res.json({ message: err })
        }
    }

)


module.exports = app