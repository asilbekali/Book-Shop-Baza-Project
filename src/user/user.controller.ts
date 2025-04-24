import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Post('/login')
  @ApiBody({
    description: 'Login credentials',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Alex' },
        password: { type: 'string', example: 'StronPassword_1' },
      },
    },
  })
  async login(@Body() data: UpdateUserDto) {
    return this.userService.login(data);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async meUser() {
    return this.userService.getUserData();
  }
}
