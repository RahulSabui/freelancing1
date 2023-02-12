const { raw } = require("mysql2");
const { where } = require("sequelize");
const {User} = require("../../models/")

exports.createUser =  async(req, res) =>{
    let updatetUser;
    let insertUser;
    const firstName = req?.body?.firstName;
    const email = req?.body?.email;

    const Data = {
        firstName:firstName,
        email:email
    }

    const checkUserExist = await User.findOne({where:{email:email},raw:true,nest:true})
    if (checkUserExist) {
         updatetUser = await User.update(Data,{where:{email:email}})
    }else{
         insertUser = await User.create(Data)
    }

    
    if (insertUser || updatetUser) {
        return res.status(200).send({
            Data:insertUser,
            message: "Data Saved Sucessfully !!"
        })
    }
}