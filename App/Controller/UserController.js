const {User} = require("../../models/")

exports.createUser =  async(req, res) =>{
    const firstName = req?.body?.firstName;
    const email = req?.body?.email;

    const Data = {
        firstName:firstName,
        email:email
    }

    const insertUser = await User.create(Data)
    if (insertUser) {
        return res.status(200).send({
            Data:insertUser,
            message: "Data Saved Sucessfully !!"
        })
    }
}