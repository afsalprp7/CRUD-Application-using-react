

const userModel  = require('../model/userModel');

module.exports ={
    getAdminHome : async (req,res)=>{
        try {
            const users = await userModel.find();
            res.json(users);
        } catch (error) {
            console.log(error)
        }

    },

    getEdituser : async(req,res) =>{
        try {
           const { id } = req.params ;
           const userDetails = await userModel.findOne({_id : id});

           res.json({user : userDetails});

        } catch (error) {
            console.log(error)
        }

    },

    doEditUser : async (req,res)=>{
        try {
            const {id } = req.params ;
            const {firstName ,lastName ,email } = req.body
            await userModel.updateOne({_id : id},{$set:{
                firstName : firstName,
                lastName : lastName,
                email : email
            }});
            res.status(200).send('success');
        } catch (error) {
            console.log(error)
        }

    },

    deleteUser : async (req,res)=>{
        try {
            const {id} = req.params ;
            await userModel.deleteOne({_id : id});
            res.status(200).send('success');
        } catch (error) {
            console.log(error)
        }
    },

    searchUser :async (req,res)=>{
        try {
            const {string} = req.body ;
          const results = await userModel.find({
            $or: [
                { firstName: { $regex: string, $options: 'i' } },
                { lastName: { $regex: string, $options: 'i' } },
                { email: { $regex: string, $options: 'i' } }
              ]
          })  ;
          console.log(results)

          res.json({results});
        } catch (error) {
            console.log(error)
        }
    }
}