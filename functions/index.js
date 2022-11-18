const functions = require("firebase-functions");
const admin = require("firebase-admin")
const nodemailer = require('nodemailer');
admin.initializeApp()

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'pgkdemo1996@gmail.com',
        pass: `${process.env.GOOGLE_APP_PASS}`
    }
});

exports.sendEmail = functions.firestore
    .document('inquires/{inquiryId}')
    .onCreate((snap, context) => {
        const mailOptions = {
            from: `pgkdemo1996@gmail.com`,
            to: snap.data().email,
            subject: 'contact form message',
            html: `<h1>Message Recieved Confirmation</h1>
             <p> <b>Message: </b>${snap.data().message} </p>
             <p> <b>Email: </b>${snap.data().email} </p>`
        };
        return transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error)
                return
            }
            console.log("Sent!")
        });
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});
