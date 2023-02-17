const { User,Details  } = require("../../models/")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com");

exports.verifyUser = async (req, res, next) => {
    try {
        const userJson = req?.body?.user
        if (userJson) {

            const UserData = await User.findOne({ where: { email: userJson.email } })
            req.User = UserData;
            next()
        } else {
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

