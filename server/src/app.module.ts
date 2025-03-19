import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot(),
    EmailModule,
  ],
})
export class AppModule {}
