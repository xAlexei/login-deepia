const UserModel = require("../models/UserModel");
require("dotenv").config({ path: "../.env" });
const jwt = require('jsonwebtoken');


module.exports = {
    create: async(req, res) =>{
        try{            
            let { name, username, password } = req.body;
            let User = new UserModel({
                name, 
                username,
                password
            })
            await User.save()
            .then(result =>{
                res.json({ success: true, result: result})
            })
            .catch(error => {
                res.json({ success: false, result: error})
            })
        }catch (error){        
            console.log(error);
        }
    },

    retrieve: async (req, res) =>{
        try{
            await UserModel.find()
            .then(result =>{
                if(!result) res.json({success: false, result: "No results found"});            
    
                res.json({ succes: true, result: result});
            })
            .catch(err => res.json({success: false, rsult: err}));
        }catch (error){
            return res.status(400).send(error)
        }
        
    },

    login: async (req, res) =>{
        try{            
            let user = await UserModel.findOne({ username: req.body.username});            
            if(!user) return res.json({ success: false, result: "Could not find username"});            

            let validPass = await UserModel.findOne({ password: req.body.password});
            if(!validPass) return res.json({ success: false, result: "Invalid Password" });               

            const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.EXPIRE_SECRET,
            });

            res.json({
                message: "Welcome",
                user: user.username,
                id: user._id,
                token,
                expiresIn: process.env.EXPIRE_SECRET,
            })            

        }catch (error){
            res.json({ 
                message: "Error",
                error: error
            })
        }
    }

    
}

