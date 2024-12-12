import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CheckCodeRequest from './dto/checkcoderequest.dto';
import MemberDTO from './dto/member.dto';
import { User } from './user.entity';
import { MapInterceptor } from '@automapper/nestjs';
import { CreateMemberRequest } from './dto/create-member/create-member-request.dto';
import { UpdatePasswordRequest } from './dto/edit-member/UpdatePasswordDTO';
import { UpdatePassCodeRequest } from './dto/edit-member/UpdateSecureCodeDTO';
import { UpdateInfoRequest } from './dto/edit-member/UpdateInfoDTO';
import { UpdateCommissionRequest } from './dto/edit-member/ComissionDTO';
import { EditConditionTransferRequest } from './dto/edit-member/ConditionDTO';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
import { CloneMemberRequest } from './dto/create-member/clone-member-request.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private userServices: UsersService) {}

  @Get('/me')
  @UseGuards(AuthGuard(['jwt', 'member']))
  me(@Req() req): any {
    return this.userServices.findUser(req.user.userId);
  }

  @Post('/checkcode')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  checkcode(@Req() req, @Body() checkcode: CheckCodeRequest): any {
    return this.userServices.checkCode(req.user.userId, checkcode.code);
  }

  @Post('/member')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  createMemberRequest(
    @Req() req,
    @Body() createMemberRequest: CreateMemberRequest,
  ): any {
    return this.userServices.createMemberRequest(
      req.user.userId,
      createMemberRequest,
    );
  }
  @Post('/member/clone')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  // @UseInterceptors(MapInterceptor(User, MemberDTO))
  clone(@Req() req, @Body() clone: CloneMemberRequest): any {
    return this.userServices.clone(req.user.userId, clone);
  }
  @Get('/:memberId')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async details(@Req() req, @Param('memberId') memberId: string): Promise<any> {
    const user = await this.userServices.findMember(
      req.user.userId,
      parseInt(memberId),
    );
    return user;
  }

  @Get('/member/:memberId')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(MapInterceptor(User, MemberDTO))
  async member(
    @Req() req,
    @Param('memberId') memberId: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ): Promise<any> {
    const user = await this.userServices.findMemberV2(
      req.user.userId,
      parseInt(memberId),
      parseInt(size) || 10,
      parseInt(page) || 1,
    );
    return user;
  }

  @Get('/search/member')
  @HttpCode(200)
  @UseGuards(AuthGuard(['jwt']))
  // @UseInterceptors(MapInterceptor(User, MemberDTO))
  async search(
    @Req() req,
    @Query('userName') userName: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ): Promise<any> {
    // return 1
    const user = await this.userServices.search(
      req.user.userId,
      userName,
      parseInt(size) || 10,
      parseInt(page) || 1,
    );
    return user;
  }

  @Put('/member/:memberId/password')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async updatePassword(
    @Req() req,
    @Param('memberId') memberId: string,
    @Body() updatePassword: UpdatePasswordRequest,
  ) {
    return this.userServices.updatePassword(
      req.user.userId,
      memberId,
      updatePassword,
    );
  }

  @Put('/member/:memberId/securecode')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async updateSecureCode(
    @Req() req,
    @Param('memberId') memberId: string,
    @Body() updatePassCodeRequest: UpdatePassCodeRequest,
  ) {
    return this.userServices.updatePassCode(
      req.user.userId,
      memberId,
      updatePassCodeRequest,
    );
  }
  @Put('/member/:memberId/info')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async updateInfo(
    @Req() req,
    @Param('memberId') memberId: string,
    @Body() updateInfoRequest: UpdateInfoRequest,
  ) {
    return this.userServices.updateInfo(
      req.user.userId,
      memberId,
      updateInfoRequest,
    );
  }

  @Put('/member/:memberId/commission')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async updateCommission(
    @Req() req,
    @Param('memberId') memberId: string,
    @Body() updateCommission: UpdateCommissionRequest,
  ) {
    return this.userServices.updateCommission(
      req.user.userId,
      memberId,
      updateCommission,
    );
  }

  @Put('/member/:memberId/conditiontransfer')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async conditiontransfer(
    @Req() req,
    @Param('memberId') memberId: string,
    @Body() editConditiontransfer: EditConditionTransferRequest,
  ) {
    return this.userServices.updateConditionTransfer(
      req.user.userId,
      memberId,
      editConditiontransfer,
    );
  }

  @Delete('/member/:memberId/block')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async block(@Req() req, @Param('memberId') memberId: string) {
    return this.userServices.block(req.user.userId, memberId);
  }

  @Delete('/member/:memberId/suppend')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async suppend(@Req() req, @Param('memberId') memberId: string) {
    return this.userServices.suppend(req.user.userId, memberId);
  }

  @Put('/member/:memberId/revertblock')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async revertblock(@Req() req, @Param('memberId') memberId: string) {
    return this.userServices.revertblock(req.user.userId, memberId);
  }

  @Put('/member/:memberId/revertsuppend')
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(MapInterceptor(User, MemberDTO))
  async revertsuppend(@Req() req, @Param('memberId') memberId: string) {
    return this.userServices.revertsuppend(req.user.userId, memberId);
  }
}
