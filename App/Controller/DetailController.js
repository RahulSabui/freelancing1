
const {
    Details
} = require("../../models/")


exports.createDetails = async (req, res) => {
    try {
        const role = req?.body?.role;
        const user_id = req?.User.id;
        const projectName = req?.body?.projectName;
        const startupsInvesting = req?.body?.startupsInvesting;
        const fName = req?.body?.fName;
        const lName = req?.body?.lName;
        const email = req?.body?.email;
        const linkdinId = req?.body?.linkdinId;
        const teamMembers = req?.body?.teamMembers;
        const additionalRead = req?.body?.additionalRead;
        const profileImageUrl = req?.body?.profileImageUrl;
        const isAdmin = req?.body?.isAdmin;
        const isStarred = req?.body?.isStarred;
        let createDetails;

        const jsonData = {
            role: role,
            user_id: user_id,
            projectName: projectName,
            startupsInvesting: startupsInvesting,
            fName: fName,
            lName: lName,
            email: email,
            linkdinId: linkdinId,
            teamMembers: teamMembers,
            additionalRead: additionalRead,
            profileImageUrl: profileImageUrl,
            isAdmin: isAdmin,
            isStarred: isStarred
        }

        const getDetails = await Details.findOne({ where: { user_id: user_id } })

        if (getDetails) {
            const UpdateDetails = await Details.update(jsonData, { where: { user_id: user_id } })
        } else {
            createDetails = await Details.create(jsonData)
        }

        return res.status(200).send({
            message: "Data Saved Sucessfully !!"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })
    }

}

exports.getDetail = async (req, res) => {
    try {
        const user_id = req?.User.id;
        console.log(req?.User);
        // const user_id = req?.params?.user_id;
        const getDetails = await Details.findOne({ where: { user_id: user_id } })


        return res.status(200).send({
            response: getDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })
    }
}


