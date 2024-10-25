import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1d'},
    })
  ]
})
export class AuthModule {}
