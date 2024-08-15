const express = require ('express');
const jwt = require('jsonwebtoken');
const z = require('zod');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

// user-registeration route
app.get('/register', async(req,res)=>{
    const{name,username,email,password} = req.body;

    // now check if the user exists in the database
    try{
        const emailExists = await User.findone({email});
        if(emailExists) return res.status(400).send("email already exists");

        const user = new User({
            name,
            username,
            email,
            password
        });

        // create another object to save it.
        const saveuser = await user.save();
        res.send({msg :'user created succesfully'});
    }catch(err){
        res.status(400).send(err);
    }
})





app.listen(3000, ()=> {
    console.log("server created succesfully");
});