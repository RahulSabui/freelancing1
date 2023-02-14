const { User,Details  } = require("../../models/")
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com");

exports.verifyUser = async (req, res, next) => {
    try {
        const token = req?.headers?.token
        if (token) {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: "977959450221-3dsvofuc5otbh632sua2ef6940lq8u37.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const UserData = await User.findOne({ where: { email: payload.email } })
            req.User = UserData;
            console.log(UserData.id);
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

