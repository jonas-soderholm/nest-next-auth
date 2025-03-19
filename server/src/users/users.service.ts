import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async deleteUser(id: number) {
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user?.email;
  }
}
