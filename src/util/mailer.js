const nodemailer = require('nodemailer');

module.exports = {
    addresses: "locomovunifor@gmail.com",
    transport: nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        },

        tls: {
            rejectUnauthorized: false,
        }
    }),
}