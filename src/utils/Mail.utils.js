import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

// const options = {
//     from: 'Fred Foo <foo@blurdybloop.com>',
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com',
//     subject: 'Hello',
//     text: 'Hello world',
//     html: '<b>Hello world</b>'
// };

export function sendMail(options) {
  transporter.sendMail(options, (error, info) => {
    if (error) { return console.log(error); }

    console.log('Message sent: ' + info.response);
  });
};
