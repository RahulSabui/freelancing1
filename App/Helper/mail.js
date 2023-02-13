const nodemailer  = require("nodemailer")

exports.sendSubmitApplicationMail = async(email, body) =>{
    try {
      let transporter = nodemailer.createTransport({
        service: 'SendinBlue',
        auth: {
          user: "sabuirahul90@gmail.com", // generated ethereal user
          pass: "WU10ykIT3rSFZYw7", // generated ethereal password
        },
      });
      let info = await transporter.sendMail({
        from: 'sabuirahul90@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Demo",
        html: body,
      });
    //   console.log(info);
    return true;
    } catch (error) {

      return false;  
    }
      
  }
  