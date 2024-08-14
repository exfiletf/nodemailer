const nodemailer = require('nodemailer');
const ojp = require("ojparty");
const app = ojp.ojparty.app();
const forms = ojp.ojparty.forms
app.get("/",async(req,res)=>{
forms(req,(data)=>{
    req.query = data.query;
res.setHeader('Access-Control-Allow-Origin','*');
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
})
});


app.listen(8080)
