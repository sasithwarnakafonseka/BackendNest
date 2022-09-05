import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import configuration from 'src/core/config/configuration';
import { CurrentUser } from 'src/core/decorators';
import { ITokenUser } from 'src/core/interface';
import { IPagination, Pager } from 'src/core/pagination';
import { AuthRoles } from 'src/modules/auth/decorators';
import { RolesGuard } from 'src/modules/auth/guards';
import { FilterUserDto } from '../dto/user-filter.dto';
import { UpdateUserPasswordDto } from '../dto/user-update.dto';
import { UserDto } from '../dto/user.dto';
import { UserRole } from '../enum';
import { UserService } from '../services/user.service';
import { UserModule } from '../user.module';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: UserDto) {
    return await this.userService.create(userDto);
  }

  @Post('welcome/mail/:user')
  @UseGuards(JwtAuthGuard)
  async welcomeMail(@Param('user', ParseIntPipe) id: number) {
    return await this.userService.welcomeMail(id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('profile_picture', 20, {
      limits: { fileSize: Number(configuration().app.maxUploadSize) },
    }),
  )
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() filter: FilterUserDto, @Pager() page: IPagination) {
    const [data, total] = await this.userService.findAll(filter, page);
    page.totalCount = total;
    return { data, pageInfo: page };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  public findOne(@Param('id', ParseIntPipe) id: number): UserModule {
    return this.userService.findOne(id);
  }

  @Put('status/:id/:status')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @AuthRoles(UserRole.SuperAdmin, UserRole.Broker)
  public setStatus(@Param('id', ParseIntPipe) id: number, @Param('status', ParseIntPipe) status: number): UserModule {
    return this.userService.setStatus(id, status);
  }

  @Patch('profile/change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() changePasswordDto: UpdateUserPasswordDto, @CurrentUser() user: ITokenUser) {
    console.log(5);
    return await this.userService.changePassword(user.id, changePasswordDto);
  }
}
