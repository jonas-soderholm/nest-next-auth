import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail', // Use environment variable or default to 'gmail'
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_APP_PASSWORD, // Your email password
      },
    });
  }

  // Send magic link to the user's email
  async sendMagicLink(email: string, token: string): Promise<void> {
    console.log(process.env.EMAIL_USER);
    const magicLink = `${process.env.BASE_URL}/auth/verify?token=${token}`; // Use BASE_URL env variable

    await this.transporter.sendMail({
      to: email,
      subject: 'Your Magic Login Link',
      html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
    });
  }
}
