const nodemailer = require('nodemailer');
const http = require('http');
const ojp = require("ojparty");
const app = ojp.ojparty.app();
const forms = ojp.ojparty.forms

const server = http.createServer((req,res)=>{
        const url = req.url.toString().split("?")[0];
if(url == "/gmail"){

        res.setHeader('Access-Control-Allow-Origin','*');
    forms(req,(data)=>{
        req.query = data.query;
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "login", //
            user: req.headers['username'],
            pass: req.headers['password']
        }
    });
    
    let mailOptions = {
        from: '"'+req.query.senderName+'" <'+req.query.from+'>',
        to: req.query.to,
        subject: req.query.subject,
        text: req.query.content,
        //html: '<b>Hello world?</b>'
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.write('Error occurred:', error)
            res.end();
            return console.log('Error occurred:', error);
            
        }
        res.write('Message sent: %s', info.messageId);
        res.end();
        
    });
    });
}else if(url == "/mail"){
       forms(req,(data)=>{
               
       
// Replace these with your email service provider's SMTP details
const transporter = nodemailer.createTransport({
  host: req.query.host, // SMTP server address
  port: req.query.port,                // Usually 587 for TLS, 465 for SSL, or 25 for non-secure
  secure: false,            // true for 465, false for other ports
  auth: {
     user: req.headers['username'],
     pass: req.headers['password']   // Your email password
  },
  tls: {
    // Optional, depending on your provider's requirements
    rejectUnauthorized: false,
  },
});

// Example of sending an email
const mailOptions = {
 from: '"'+req.query.senderName+'" <'+req.query.from+'>',
to: req.query.to,
 subject: req.query.subject,
text: req.query.content,
  // html: '<b>Hello!</b> This is a test email.', // For HTML emails
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
          res.write(error);
    return console.log(error);
  }
        res.write('Email sent: ' + info.response);
  console.log('Email sent: ' + info.response);
});
 });
}else{
res.write("not allowed!");
res.end();
}

});



server.listen(8080)
