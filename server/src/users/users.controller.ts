import { Req, Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('allusers')
  findAll() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    const userId = req.user.sub;
    return this.usersService.getProfile(userId);
  }
}
