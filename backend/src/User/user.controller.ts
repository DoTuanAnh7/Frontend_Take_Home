import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(
      userId,
      updateUserDto,
    );
    return updatedUser;
  }

  @Get(':userId')
  async getUserById( @Param('userId') userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
