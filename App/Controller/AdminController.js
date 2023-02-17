
const {
    User,
    Details,
    Matching
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
            return res.status(400).json({
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

exports.listDetail = async(req, res) =>{
    try {
        const getDetails = await Details.findAll()
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

exports.sendMessage = async(req, res) =>{
    try {
        const email = req?.body?.email;
   
        const bodyTemplate = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        
        <body style="display: flex; align-items: center; justify-content: center;">
        
            <div className="h-screen w-screen p-6  flex items-center flex-col" style="
               width: 50rem;
                padding: 1.25rem;
                display: flex;
                align-items: center;
                flex-direction: column;
              ">
                <div className='w-fit h-fit p-2 md:p-3  flex flex-col items-center' style="
                width: fit-content;
                height: fit-content;
                padding: .5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                ">
                    <img src="./logo.png" alt="pistachio" className='lg:h-fit lg:w-fit md:h-28 md:w-28 h-20 w-20' style="
                    height: 5rem;
                    width: 5rem;
                    " />
                    <h3 className='lg:text-4xl md:text-3xl text-xl' style="
                    font-size: 1.25rem;
                    ">Pistachio</h3>
                </div>
                <h2 className="mt-2 text-2xl font-bold text-center" style="
                  margin-top: 0.5rem;
                  font-size: 1.5rem;
                  font-weight: bold;
                  text-align: center;
                ">
                    It' s A Match! Marcus Would Like to make an intro
                </h2>
                <h2 className="mt-2 text-2xl font-bold text-center" style="
                  margin-top: 0.5rem;
                  font-size: 1.5rem;
                  font-weight: bold;
                  text-align: center;
                ">
                    Ben Doherty Via Pistachio RE:Conversation with
                </h2>
                <p className="w-full p-3 text-lg" style="width: 100%; padding: 0.75rem; font-size: 1.25rem">
                    Hi [First name],
                    <br />
                    I hope this email finds you well. My name is Marcus and I have been
                    fortunate enough to review both Startup A and Startup B, I am an AI for
                    web3 startup matching. I strongly believe that the missions and goals of
                    both of your companies align and that there is potential for a valuable
                    collaboration. Startup A [link to Pistachio page], led by [Name], is a
                    company that focuses on building global well-being governed agriculture
                    models designed to scale exponentially. Startup B [link to Pistachio
                    page] is a clean energy launchpad enabled by a climate trust protocol.
                    Feel free to head to Pistachio and continue the conversation using this
                    link. Best regards, [Third Party Name] P.S. How was this match? please
                    rank me here
                </p>
                <button className="px-3 py-2 border border-black rounded-md mt-3 text-base" style="
                  padding: 0.5rem 0.75rem;
                  border: 1px solid black;
                  border-radius: 0.375rem;
                  margin-top: 0.75rem;
                  font-size: 1rem;
                  background-color: transparent;
                  cursor: pointer;
                ">
                    Go To Intro page!
                </button>
                <footer className=" bottom-0 w-full p-6 flex flex-col items-center justify-center mt-4" style="
                  bottom: 0;
                  width: 100%;
                  padding: 1.5rem;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  margin-top: 1rem;
                ">
                    <p className="text-center text-sm" style="text-align: center; font-size: 0.875rem">
                        Corporation
                    </p>
                    <p className="text-center text-sm" style="text-align: center; font-size: 0.875rem">
                        You are receiving this email because you opted in via our website.
                    </p>
                    <div className="mt-3 flex gap-3" style="display: flex; gap: 0.75rem; margin-top: 0.75rem">
                        <!-- <div class="mt-3 flex gap-3"> -->
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z">
                                </path>
                            </svg>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z">
                                </path>
                            </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z">
                                </path>
                            </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M854.4 800.9c.2-.3.5-.6.7-.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-.2-.3-.5-.5-.7-.8-1.1-1.3-2.1-2.5-3.2-3.7-.4-.5-.8-.9-1.2-1.4l-4.1-4.7-.1-.1c-1.5-1.7-3.1-3.4-4.6-5.1l-.1-.1c-3.2-3.4-6.4-6.8-9.7-10.1l-.1-.1-4.8-4.8-.3-.3c-1.5-1.5-3-2.9-4.5-4.3-.5-.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-.3-.3-.7-.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-.3.3-.7.6-1 1-1 .9-2 1.9-3 2.9-.5.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-.3.3-4.8 4.8-.1.1c-3.3 3.3-6.5 6.7-9.7 10.1l-.1.1c-1.6 1.7-3.1 3.4-4.6 5.1l-.1.1c-1.4 1.5-2.8 3.1-4.1 4.7-.4.5-.8.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-.2.3-.5.5-.7.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c.2.3.5.6.7.9l3.1 3.7c.4.5.8.9 1.2 1.4l4.1 4.7c0 .1.1.1.1.2 1.5 1.7 3 3.4 4.6 5l.1.1c3.2 3.4 6.4 6.8 9.6 10.1l.1.1c1.6 1.6 3.1 3.2 4.7 4.7l.3.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2a300 300 0 0 0 10-9.6l.3-.3c1.6-1.6 3.2-3.1 4.7-4.7l.1-.1c3.3-3.3 6.5-6.7 9.6-10.1l.1-.1c1.5-1.7 3.1-3.3 4.6-5 0-.1.1-.1.1-.2 1.4-1.5 2.8-3.1 4.1-4.7.4-.5.8-.9 1.2-1.4a99 99 0 0 0 3.3-3.7zm4.1-142.6c-13.8 32.6-32 62.8-54.2 90.2a444.07 444.07 0 0 0-81.5-55.9c11.6-46.9 18.8-98.4 20.7-152.6H887c-3 40.9-12.6 80.6-28.5 118.3zM887 484H743.5c-1.9-54.2-9.1-105.7-20.7-152.6 29.3-15.6 56.6-34.4 81.5-55.9A373.86 373.86 0 0 1 887 484zM658.3 165.5c39.7 16.8 75.8 40 107.6 69.2a394.72 394.72 0 0 1-59.4 41.8c-15.7-45-35.8-84.1-59.2-115.4 3.7 1.4 7.4 2.9 11 4.4zm-90.6 700.6c-9.2 7.2-18.4 12.7-27.7 16.4V697a389.1 389.1 0 0 1 115.7 26.2c-8.3 24.6-17.9 47.3-29 67.8-17.4 32.4-37.8 58.3-59 75.1zm59-633.1c11 20.6 20.7 43.3 29 67.8A389.1 389.1 0 0 1 540 327V141.6c9.2 3.7 18.5 9.1 27.7 16.4 21.2 16.7 41.6 42.6 59 75zM540 640.9V540h147.5c-1.6 44.2-7.1 87.1-16.3 127.8l-.3 1.2A445.02 445.02 0 0 0 540 640.9zm0-156.9V383.1c45.8-2.8 89.8-12.5 130.9-28.1l.3 1.2c9.2 40.7 14.7 83.5 16.3 127.8H540zm-56 56v100.9c-45.8 2.8-89.8 12.5-130.9 28.1l-.3-1.2c-9.2-40.7-14.7-83.5-16.3-127.8H484zm-147.5-56c1.6-44.2 7.1-87.1 16.3-127.8l.3-1.2c41.1 15.6 85 25.3 130.9 28.1V484H336.5zM484 697v185.4c-9.2-3.7-18.5-9.1-27.7-16.4-21.2-16.7-41.7-42.7-59.1-75.1-11-20.6-20.7-43.3-29-67.8 37.2-14.6 75.9-23.3 115.8-26.1zm0-370a389.1 389.1 0 0 1-115.7-26.2c8.3-24.6 17.9-47.3 29-67.8 17.4-32.4 37.8-58.4 59.1-75.1 9.2-7.2 18.4-12.7 27.7-16.4V327zM365.7 165.5c3.7-1.5 7.3-3 11-4.4-23.4 31.3-43.5 70.4-59.2 115.4-21-12-40.9-26-59.4-41.8 31.8-29.2 67.9-52.4 107.6-69.2zM165.5 365.7c13.8-32.6 32-62.8 54.2-90.2 24.9 21.5 52.2 40.3 81.5 55.9-11.6 46.9-18.8 98.4-20.7 152.6H137c3-40.9 12.6-80.6 28.5-118.3zM137 540h143.5c1.9 54.2 9.1 105.7 20.7 152.6a444.07 444.07 0 0 0-81.5 55.9A373.86 373.86 0 0 1 137 540zm228.7 318.5c-39.7-16.8-75.8-40-107.6-69.2 18.5-15.8 38.4-29.7 59.4-41.8 15.7 45 35.8 84.1 59.2 115.4-3.7-1.4-7.4-2.9-11-4.4zm292.6 0c-3.7 1.5-7.3 3-11 4.4 23.4-31.3 43.5-70.4 59.2-115.4 21 12 40.9 26 59.4 41.8a373.81 373.81 0 0 1-107.6 69.2z">
                                </path>
                            </svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024"
                                class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z">
                                </path>
                            </svg>
                        <!-- </div> -->
                        <!-- <AiOutlineTwitter className="text-xl" />
                        <AiFillInstagram className="text-xl" />
                        <AiFillYoutube className="text-xl" />
                        <AiOutlineGlobal className="text-xl" />
                        <AiFillLinkedin className="text-xl" /> -->
                    </div>
                    <p className="text-center mt-2" style="
                    text-align: center;
                    margin-top: .5rem;
        
                    ">Address, #PC City, State.</p>
                    <p className="text-center underline" style="
                    text-align: center;
                    text-decoration: underline;
                    ">Unsubscribe</p>
                    <h2 className="text-3xl mt-2" style="
                    font-size: 1.875;
                    margin-top: .5rem;
                    ">Pistachio</h2>
                </footer>
            </div>
        </body>
        
        </html>`;


        const MailSend =  await sendSubmitApplicationMail(email, bodyTemplate)
        if (MailSend) {
            return res.status(200).json({
                status:true,
                response:"success"
            })
        }else{
            return res.status(200).json({
                status:false,
                response:"not success"
            })
        }
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
            await Matching.create({
                matchersId : matchersId,
                matchingId : matchingId
            })
            let MailSend= await sendSubmitApplicationMail(matchingUserEmail?.email, bodyTemplate)
            if (MailSend) {
                return res.status(200).json({
                    status:true,
                    response:"success"
                })
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Something Went Wrong"
        })
    }
}
