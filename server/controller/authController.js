const {ObjectId} = require('mongoose')
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
module.exports = {
 
    doUserSignUp : async (req,res)=>{
        try{
            const data = req.body;
            const hashedPassword = await bcrypt.hash(data.password,10);
            const userExist = await userModel.findOne({email:data.email});
            if(userExist){
                res.status(409).json({message:'User registered successfully'});
            }else{
                await userModel.collection.insertOne({
                    firstName : data.firstName,
                    lastName : data.lastName,
                    email : data.email,
                    password : hashedPassword
                });
                res.send('data addedsuccessfully')
            }
        }catch(error){
            console.log(error);
        }
    },

    doUserLogin : async (req,res)=>{
        const {email ,password} = req.body ;
        const user = await userModel.findOne({email : email});
        if(user){
            const compare = await bcrypt.compare(password,user.password);
            if(compare){
                res.status(200).json({user});
            }else{
                res.status(401).send('Password Incorrect')
            }
        }else{
            res.status(401).send('No user Found');
        }
    },



    uploadImage : async (req,res)=>{
        try{
            const { id } = req.body
            const {filename} = req.file
          await userModel.updateOne({_id : id },{$set:{image : filename}});
          const data = await userModel.findOne({_id : id});

          res.status(200).json({result : data})
            
        }catch(error){
            console.log(error)
        }

    }
}