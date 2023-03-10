const {User,Details} = require("../../models/")
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
        const userJson = req?.body?.user
        if (userJson) {
            // const ticket = await client.verifyIdToken({
            //     idToken: token,
            //     audience: "977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com",
            // });

            // const payload = ticket.getPayload();
            
            if (userJson) {
                const UserExsits = await User.findOne({where:{email:userJson.email}})
                if (UserExsits) {
                    const onBoardingData = await Details.findOne({where:{user_id:UserExsits.id}})
                    return res.status(200).json({
                        isData:true,
                        status:true,
                        isfilledUp:onBoardingData ? true: false,
                        role: onBoardingData ? onBoardingData.role : "",
                        message: "Verified",
                        statusCode:200
                    })
                }else{
                    // const checkUserExist = await User.findOne({where:{email:payload.email},raw:true,nest:true})
                    // if (checkUserExist) {
                    //      updatetUser = await User.update(Data,{where:{email:email}})
                    // }else{
                    // }
                    const Data = {
                        firstName:UserExsits?.name,
                        email:UserExsits?.email
                    }
                    insertUser = await User.create(Data)
                
                    // if (insertUser ) {
                    //     return res.status(200).send({
                    //         Data:insertUser,
                    //         message: "Data Saved Sucessfully !!"
                    //     })
                    // }
                    return res.status(200).json({
                        status:true,
                        message: "Verified",
                        statusCode:200
                    })
                }
                
            }
        }else{
            return res.status(400).json({
                message: "Please provide a valide token !",
                statusCode:400

            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went Wrong !",
            statusCode:500
        })
    }
}




