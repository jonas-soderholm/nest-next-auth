import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 1 minute
          limit: 75, // limit each IP to 75 requests per ttl
        },
      ],
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    ConfigModule.forRoot(),
    EmailModule,
  ],
})
export class AppModule {}
