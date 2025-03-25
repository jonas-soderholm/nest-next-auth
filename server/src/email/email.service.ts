import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
  }

  // Send magic link to the user's email
  async sendMagicLink(email: string, token: string): Promise<void> {
    const magicLink = `${process.env.NEXT_PUBLIC_FRONTEND_ORIGIN}/auth/callback?token=${token}`;

    await this.transporter.sendMail({
      to: email,
      subject: 'Your Magic Login Link',
      html: `<p>Click <a href="${magicLink}">here</a> to log in.</p>`,
    });
  }
}
