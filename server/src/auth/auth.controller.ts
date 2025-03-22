import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @Post('signin')
  signIn(@Body('email') email: string, @Req() req: Request) {
    return this.authService.signIn(email, req);
  }

  @Get('validate-magic-link')
  async validateMagicLink(@Query('token') token: string) {
    return this.authService.validateMagicLink(token);
  }
}
