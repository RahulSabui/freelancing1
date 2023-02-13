
const {
    User,
    matching
} = require("../../models/");
const {sendSubmitApplicationMail} = require("../Helper/mail")
const bcrypt = require('bcrypt');

exports.createAdmin = async(req, res) =>{
    try {
        const email = req?.body?.email;
        const pass = bcrypt.hashSync(req?.body?.password, 10);
        const checkExist = await User.findOne({where:{email:email}})
        if (checkExist) {
            return res.status(200).json({
                status:false,
                response:"Already Exsist Email"
            })
        }
        const adminCreate = await User.create({
            email:email,
            password:pass,
        })
        if (adminCreate) {
            return res.status(200).json({
                status:true,
                response:"success"
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })
    }
}

exports.loginAdmin = async(req, res) =>{
    try {
        const email = req?.body?.email;
        const pass = req?.body?.password;

        const userCheck = await User.findOne({where:{email:email}})
        if (userCheck.password == pass) {
           
                return res.status(200).json({
                    status:true,
                    response:"Login success"
                })

        }else{
            return res.status(200).json({
                status:false,
                response:"Unauthorized"
            })
        }

        // const pass = bcrypt.hash(req?.body?.password);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })  
    }
}


exports.makeMatches = async(req, res) =>{
    try {
        const matchersId = req?.body?.matchersId;
        const matchingId = req?.body?.matchingId;
        const bodyTemplate = req?.body?.bodyTemplate;

        const matchingUserEmail = await User.findOne({id:matchingId})

        if (matchingId && matchersId) {
            await matching.create({
                matchersId : matchersId,
                matchingId : matchingId
            })

            await sendSubmitApplicationMail(matchingUserEmail?.email, bodyTemplate)
        }else{

            await sendSubmitApplicationMail(matchingUserEmail?.email, bodyTemplate)
            
        }

        if (MailSend) {
            return res.status(200).json({
                status:true,
                response:"success"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })
    }
}