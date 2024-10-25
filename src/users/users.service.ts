import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto) {

    const hashedPw = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashedPw;
    
    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {id},
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {id}
    });
  }
}
