import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signUp(signupDto: AuthDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);
    return await this.prisma.user.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
      },
    });
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    await this.emailService.sendMagicLink(user.email, access_token);

    return {
      access_token: access_token,
    };
  }
}
