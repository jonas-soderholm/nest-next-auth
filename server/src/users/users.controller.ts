import { Req, Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReqAuthSub } from './interfaces/user.interface';

@Controller('')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('allusers')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: ReqAuthSub) {
    const userId = req.user.sub;
    return this.usersService.getProfile(userId);
  }
}
