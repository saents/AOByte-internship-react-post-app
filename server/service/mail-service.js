const nodemailer = require('nodemailer');
const {IdentityUrlController} = require('../constants/api-routes');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        const activationLink = `${process.env.API_URL}/api${IdentityUrlController.activate}/${link}`
        try {
            await this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Activate your account on Posts Page',
                text: '',
                html: `
        <div>
          <h1>Click the link below to activate your account</h1>
          <a href="${activationLink}">${activationLink}</a>
        </div>
      `,
            });
        } catch (err) {
            console.error('Error sending activation email:', err);
        }
    }
}

module.exports = new MailService();