const express = require("express");
const app = express();
require("dotenv").config();
const nodeMailer = require("nodemailer");
const PORT = process.env.PORT || 8000;
const cors = require("cors");

app.use(
  cors({
    origin: "https://demiakinsola-my-personal-portfolio.onrender.com/",
  })
);

//to parse urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//create the sendMail function


//create the route for sending the mail
app.post("/send", (req, res) => {
      //create a SMTP transporter
      
    try {
        //get the content request body
        const { mailState } = req.body;
        const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
          user: process.env.GMAIL_USER,
          pass: process.env.PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
        },
      });

      //verify the transporter
      transporter.verify((err, success) => {
        err
          ? console.log(err)
          : console.log(`Server ready to take message = ${success}`);
      });

      //set up the mail options
      const mailOptions = {
        from: mailState.email,
        to: process.env.GMAIL_USER,
        subject: mailState.subject,
        text: `You got a message from:\n 
    Email: ${mailState.email}\n
    Name: ${mailState.name}\n
    Message: ${mailState.message}`,
      };
     
      //send the mail
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
          return err;
        } else {
           res.json({ status: "success" });
        }
      });
    } catch(err) {
        console.log("Error");
        return res.json({ status: "failed"})
    }
});



app.listen(PORT, () => {
    console.log(`Server runing on PORT ${PORT}`);
})