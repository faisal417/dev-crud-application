
const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config()





// create a mail
const verifyAccountMail= async (to, sub, data= { }) =>{
     
    //create a transport
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    await transport.sendMail({
        from: `'Verify Account' <${process.env.EMAIL_HOST}>`,
        to : to,
        subject: sub,
        text: 'Verify Account',
        html : `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
        
                body{
                    padding: 0;
                    margin: 0;
                    font-family: Arial;
                }
                p{
                    color: #81868f;
                }
                .main-wrapper{
                    background-color: #f2f5f7;
                    height: 100vh;
                    overflow: hidden;
                }
                .wrapper{
                    width: 400px;
                    background-color: #fff;
                    padding: 50px;
                    margin: 20% auto;
                }
        
                .logo{
                    text-align: center;
                }
                .logo img{
                    width: 150px;
                    object-fit: cover;
                }
                .massageBox h2{
                    color: #37517e;
                    font-weight: 500;
                }
                button{
                    background-color: #04b1f0;
                    border: none;
                    padding: 15px 25px;
                    border-radius: 4px;
                    margin-top: 15px;
                    margin-bottom: 15px;
                }
                button:hover{
                    background-color: #00a4df;
                }
                button > a{
                    text-decoration: none;
                    color: #fff !important;
                    font-size: 17px;
                    font-weight: 600;
                }
                .massageBox h4{
                    color: #81868f;
                }
                .footer h4{
                    margin-bottom: 0;
                    color: #81868f;
                    font-weight: 500;
                }
                .team{
                    margin-top: 0;
                }
            </style>
        </head>
        <body>
        
            <div class="main-wrapper">
                <div class="wrapper">
                    <div class="logo">
                        <img src="https://ci5.googleusercontent.com/proxy/BE2ZluKLx2ZpwLbrKyE-Umfz4wNPTv6DiETqnL4F7L3GCOHyn8KQtcvGWH2EJi-3Trym_9PDn-OJOX-gA126p69CSLtxUrzZY7aD2QEG4eKIZ-PAYK_uPgMdUH7XBi04FBGalD6V32IIbnJLQlm3zQ=s0-d-e1-ft#https://transferwise.com/public-resources/assets/notification-service/images/wftw_logo-v1.png" alt="">
                    </div>
                    <div class="massageBox">
                        <h4>Hello ${data.name} </h4>
                        <h2>It is time to confirm your email address. This is your email ${data.email} </h2>
                        <p>Have we got the right email address to reach you on? To confirm that you can get our emails, just click the button below.</p>
        
                        <button><a href="http://localhost:5050/devs/verify/${data.token}">Confirm your email</a></button>
        
                        <p>If you don???t know why you got this email, please <a href="#">get in touch with us</a> so we can fix this for you.</p>
        
                        <hr>
        
                        <div class="footer">
                            <h4>Thanks,</h4>
                            <h4 class="team">The Wise Team</h4>
                        </div>
                    </div>
                </div>
            </div>
            
        </body>
        </html>
        `
    })
}


//export mail
module.exports = verifyAccountMail;