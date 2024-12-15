import { Controller, Post, Body, Param, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('admin')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id/role')
  @Roles('admin')
  async updateUserRole(@Param('id') userId: number, @Body('role') role: string) {
    return this.userService.updateUserRole(userId, role);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteUser(@Param('id') userId: number) {
    return this.userService.deleteUser(userId);
  }

  @Get()
  @Roles('admin')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
