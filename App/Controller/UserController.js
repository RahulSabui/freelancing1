const {User} = require("../../models/")
const {OAuth2Client} = require('google-auth-library');


exports.createUser =  async(req, res) =>{
    let updatetUser;
    let insertUser;
    const firstName = req.User.name;
    const email =  req.User.email;
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

exports.verifyToken = async(req, res) =>{
    try {
        const token = req?.headers?.token
        const client = new OAuth2Client("977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com");
        if (token) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com",
            });
            
            const payload = ticket.getPayload();
            
            if (payload) {
                const UserExsits = await User.findOne({where:{email:email}})
                if (UserExsits) {
                    return res.status(200).json({
                        isData:true,
                        status:true,
                        message: "Verified"
                    })
                }else{
                    return res.status(200).json({
                        status:true,
                        message: "Verified"
                    })
                }
                
            }
        }else{
            return res.status(400).json({
                message: "Please provide a valide token !"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went Wrong !"
        })
    }
}