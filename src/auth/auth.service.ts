import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {username}
    });

    const hashedPw = await bcrypt.hash(pass, 10);

    // if (user?.password !== bcryp)

    // const user = await this.usersService.findOne(username);

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
