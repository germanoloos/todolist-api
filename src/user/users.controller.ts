import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ReqUser } from '../common/decorators/req-user.decorator';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<unknown> {
    return this.usersService.findById(id);
  }

  @Post()
  async create(@Body() body: UserDto): Promise<unknown> {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserDto,
    @ReqUser() user: User,
  ): Promise<unknown> {
    if (id !== user.id) throw new UnprocessableEntityException();
    return this.usersService.update({
      id,
      name: body.name,
    });
  }
}
