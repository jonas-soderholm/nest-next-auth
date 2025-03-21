import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: DatabaseService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signUp(signupDto: AuthDto) {
    return await this.prisma.user.create({
      data: {
        email: signupDto.email,
      },
    });
  }

  async signIn(email: string, req: Request): Promise<{ access_token: string }> {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      this.logger.warn(
        `Failed login attempt for email ${email} from IP: ${ip}`,
      );
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };

    const access_token = await this.jwtService.signAsync(payload);

    await this.emailService.sendMagicLink(user.email, access_token);

    return {
      access_token: access_token,
    };
  }

  async validateMagicLink(token: string): Promise<{ access_token: string }> {
    try {
      // Verify the token
      const payload = await this.jwtService.verifyAsync(token);

      // Find the user by ID from the token
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Return a new access token for frontend authentication
      return { access_token: token };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
