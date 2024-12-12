import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  NotAllowAccess,
  UserNotMemberOfAgent,
} from 'src/exception/bad-request-exceptions';
import { UserType } from './user.enum';
import PaginatedResult from './paging';
import MemberDTO from './dto/member.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CreateMemberRequest } from './dto/create-member/create-member-request.dto';
import * as bcrypt from 'bcrypt';
import { UpdatePasswordRequest } from './dto/edit-member/UpdatePasswordDTO';
import { UpdatePassCodeRequest } from './dto/edit-member/UpdateSecureCodeDTO';
import { UpdateInfoRequest } from './dto/edit-member/UpdateInfoDTO';
import { UpdateCommissionRequest } from './dto/edit-member/ComissionDTO';
import { EditConditionTransferRequest } from './dto/edit-member/ConditionDTO';
import { CloneMemberRequest } from './dto/create-member/clone-member-request.dto';
import { UserDuplicate } from './user.exception';
@Injectable()
export class UsersService {
  async updateConditionTransfer(
    userRequestId: any,
    userTargetId: any,
    editConditiontransfer: EditConditionTransferRequest,
  ) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.transfer_config = editConditiontransfer.transfer_config;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async clone(
    userRequestId,
    cloneMemberRequest: CloneMemberRequest,
  ): Promise<any> {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userRequestId,
      );
      if (havePermission) {
        console.log('OK');
        let rs = [];
        let userSource = await this.usersRepository.findOneBy({
          id: cloneMemberRequest.memberSourceId,
        });
        const parrent = await this.usersRepository.findOneBy({
          id: userRequestId,
        });
        userSource.id = null;
        for (let i = 0; i < cloneMemberRequest.noNumber; i++) {
          let cloned = new User();
          cloned.credit_line = cloneMemberRequest.credit;
          cloned.password = cloneMemberRequest.password;
          cloned.secure_code = 'PLEASECHANGE';
          cloned.group = userSource.group;
          cloned.children = [];
          cloned.parent = parrent;
          cloned.first_name = '';
          cloned.last_name = '';
          cloned.token = await this.genToken();
          cloned.user_type = userSource.user_type;

          cloned.phone = '';
          cloned.commission_group_a = userSource.commission_group_a;
          cloned.commission_group_b = userSource.commission_group_b;
          cloned.commission_group_c = userSource.commission_group_c;
          cloned.commission_group_d = userSource.commission_group_d;
          cloned.commission_group_1x2 = userSource.commission_group_1x2;
          cloned.commission_group_orther = userSource.commission_group_orther;
          let nextUserName = cloneMemberRequest.userName;
          while (await this.existsUserName(nextUserName)) {
            nextUserName = this.generateNextID(nextUserName);
          }
          cloned.username = nextUserName;
          await this.usersRepository.save(cloned);
          rs.push(nextUserName);
        }
        return rs;
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async existsUserName(userName) {
    try {
      console.log(userName);
      return await this.usersRepository.exist({
        where: { username: userName },
      });
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  generateNextID(currentID) {
    // Tách chuỗi vào PREFIX, STRING1, STRING2 và STRING3
    const prefix = currentID.slice(0, -3);
    const string1 = currentID.charAt(currentID.length - 3);
    const string2 = currentID.charAt(currentID.length - 2);
    const string3 = currentID.charAt(currentID.length - 1);

    // Kiểm tra xem STRING3 có thể tăng được không
    if (string3 < '9') {
      // Tăng giá trị STRING3 lên 1 đơn vị
      const nextString3 = String.fromCharCode(string3.charCodeAt(0) + 1);
      return prefix + string1 + string2 + nextString3;
    }

    // Kiểm tra xem STRING2 có thể tăng được không
    if (string2 < 'Z') {
      // Đặt lại STRING3 thành '0' và tăng giá trị STRING2 lên 1 đơn vị
      const nextString2 = String.fromCharCode(string2.charCodeAt(0) + 1);
      return prefix + string1 + nextString2 + '0';
    }

    // Kiểm tra xem STRING1 có thể tăng được không
    if (string1 < 'Z') {
      // Đặt lại STRING2 và STRING3 thành '0' và tăng giá trị STRING1 lên 1 đơn vị
      const nextString1 = String.fromCharCode(string1.charCodeAt(0) + 1);
      return prefix + nextString1 + '0' + '0';
    }

    // Nếu không thể tăng STRING1, STRING2, STRING3 nữa, thì trả về -1 để biểu thị hết ID
    return null;
  }
  async suppend(userRequestId, userTargetId) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.is_suppended = true;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async revertsuppend(userRequestId, userTargetId) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.is_suppended = false;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }
  async block(userRequestId, userTargetId) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.is_close = true;
        // userTarget.children.forEach(u=>{
        //   u.t
        //   this.usersRepository.save()
        // })
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async revertblock(userRequestId, userTargetId) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.is_close = false;
        // userTarget.children.forEach(u=>{
        //   u.t
        //   this.usersRepository.save()
        // })
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async updateCommission(
    userRequestId: any,
    userTargetId: any,
    updateCommission: UpdateCommissionRequest,
  ) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.commission_group_a = updateCommission.group_a;
        userTarget.commission_group_b = updateCommission.group_b;
        userTarget.commission_group_c = updateCommission.group_c;
        userTarget.commission_group_d = updateCommission.group_d;
        userTarget.commission_group_1x2 = updateCommission.group_1x2;
        userTarget.commission_group_orther = updateCommission.group_orther;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async updateInfo(
    userRequestId: any,
    userTargetId: any,
    updateInfoRequest: UpdateInfoRequest,
  ) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.first_name = updateInfoRequest.first_name;
        userTarget.last_name = updateInfoRequest.last_name;
        userTarget.group = updateInfoRequest.group;
        userTarget.phone = updateInfoRequest.phone;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }
  async updatePassCode(
    userRequestId: any,
    userTargetId: any,
    updatePassCodeRequest: UpdatePassCodeRequest,
  ) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.secure_code = updatePassCodeRequest.secure_code;
        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(
    userRequestId: any,
    userTargetId: any,
    updatePassword: UpdatePasswordRequest,
  ) {
    try {
      const havePermission = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      if (havePermission) {
        const userTarget = await this.usersRepository.findOneBy({
          id: userTargetId,
        });
        userTarget.first_name = updatePassword.password || userTarget.password;

        return this.usersRepository.save(userTarget);
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }
  async checkCode(userRequestId: any, code: string): Promise<any> {
    try {
      const user = await this.findUser(userRequestId);
      if (user.secure_code === code) {
        return true;
      }
      return false;
    } catch (error) {
      throw new UserNotMemberOfAgent();
    }
  }
  async findOneByUserNamePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    return this.usersRepository.findOneBy({
      username,
      password,
      user_type: Not(UserType.MEMBER),
      is_suppended: false,
      is_close: false,
    });
  }

  async findOneByUserNamePasswordMember(
    username: string,
    password: string,
  ): Promise<User | null> {
    return this.usersRepository.findOneBy({
      username,
      password,
      user_type: UserType.MEMBER,
    });
  }

  async findUser(userid: number): Promise<User | null> {
    const userRequest = await this.usersRepository.findOneBy({
      id: userid,
    });
    if (userRequest.is_close == true || userRequest.is_suppended == true) {
      throw new NotAllowAccess();
    }
    return userRequest;
  }
  async findUserByUserName(memberName: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ username: memberName });
  }
  async update(user: User): Promise<User | null> {
    return this.usersRepository.save(user);
  }

  async checkPermission(userRequestId: number, userTargetId: number) {
    const userRequest = await this.usersRepository.findOne({
      where: { id: userRequestId },
      relations: {
        parent: true,
      },
    });
    if (
      userRequest.is_close == true ||
      userRequest.is_suppended == true ||
      userRequest.user_type === UserType.MEMBER
    ) {
      throw new NotAllowAccess();
    }
    const userTarget = await this.usersRepository.findOne({
      where: { id: userTargetId },
      relations: {
        parent: true,
      },
    });
    return this.isChildOf(userRequest, userTarget);
  }

  async isChildOf(userA: User, userC: User): Promise<boolean> {
    if (userA.id === userC.id) {
      // User C is the same as User A
      return true;
    }
    let current = userC;
    while (current.parent) {
      const parent = await this.usersRepository.findOne({
        where: { id: current.parent.id },
        relations: ['parent'],
      });
      if (!parent) {
        // Parent not found, User C is not a descendant of User A
        return false;
      }
      if (parent.id === userA.id) {
        // User A is the direct or indirect parent of User C
        return true;
      }
      current = parent;
    }

    // User C is not a descendant of User A
    return false;
  }
  async getChildren(
    userId: number,
    pageSize: number,
    pageNumber: number,
  ): Promise<[User[], number]> {
    const skip = pageSize * (pageNumber - 1);

    // const queryBuilder = this.usersRepository.createQueryBuilder('user');
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.where('user.parent.id = :userId');
    const [children, totalCount] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .setParameter('userId', userId)
      .getManyAndCount();
    return [children, totalCount];
  }

  async searchMemberByUserName(
    userId: number,
    userName: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<[User[], number]> {
    const skip = pageSize * (pageNumber - 1);

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder
      .where('user.username LIKE :userName', {
        userName: `%${userName}%`,
      })
      .andWhere('user.parent.id = :userId');

    const [children, totalCount] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .setParameter('userId', userId)
      .getManyAndCount();
    return [children, totalCount];
  }

  async findMemberV2(
    userRequestId: number,
    userTargetId: number,
    pageSize: number,
    pageNumber: number,
  ): Promise<PaginatedResult<MemberDTO>> {
    try {
      const isDescendant = await this.checkPermission(
        userRequestId,
        userTargetId,
      );
      // console.log(isDescendant);
      if (isDescendant) {
        const userRequest = await this.usersRepository.findOne({
          where: { id: userRequestId },
          relations: {
            parent: true,
            children: true,
          },
        });
        if (userRequest.user_type === UserType.MEMBER) {
          throw new NotAllowAccess();
        }
        const userTarget = await this.usersRepository.findOne({
          where: { id: userTargetId },
          relations: {
            parent: true,
            children: true,
          },
        });
        const result: PaginatedResult<MemberDTO> = {
          items: [],
          totalCount: 0,
          pageSize,
          pageNumber,
          totalPages: 0,
        };

        const [children, totalCount] = await this.getChildren(
          userTargetId,
          pageSize,
          pageNumber,
        );
        const mappedChildren = await this.mapper.mapArrayAsync(
          children,
          User,
          MemberDTO,
        );
        userTarget.children = [];
        result.items = mappedChildren;
        result.totalCount = totalCount;

        const totalPages = Math.ceil(totalCount / pageSize);
        result.totalPages = totalPages;

        // console.log(
        //   `Page ${pageNumber} of User ${userTargetId}'s children (pageSize: ${pageSize}):`,
        // );
        // console.log(result);

        return result;
      }

      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  async search(
    userRequestId: number,
    userName: string,
    pageSize: number,
    pageNumber: number,
  ): Promise<PaginatedResult<MemberDTO>> {
    try {
      const isDescendant = await this.checkPermission(
        userRequestId,
        userRequestId,
      );
      console.log(userName);
      const [children, totalCount] = await this.searchMemberByUserName(
        userRequestId,
        userName,
        pageSize,
        pageNumber,
      );
      const mappedChildren = await this.mapper.mapArrayAsync(
        children,
        User,
        MemberDTO,
      );
      const result: PaginatedResult<MemberDTO> = {
        items: [],
        totalCount: 0,
        pageSize,
        pageNumber,
        totalPages: 0,
      };
      result.items = mappedChildren;
      result.totalCount = totalCount;

      const totalPages = Math.ceil(totalCount / pageSize);
      result.totalPages = totalPages;

      // console.log(
      //   `Page ${pageNumber} of User ${userTargetId}'s children (pageSize: ${pageSize}):`,
      // );
      // console.log(result);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createMemberRequest(
    userRequestId: any,
    createMemberRequest: CreateMemberRequest,
  ): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({ id: userRequestId });
      const newUser = new User();
      newUser.group = createMemberRequest.member_info.group;
      newUser.children = [];
      newUser.parent = user;
      newUser.first_name = createMemberRequest.member_info.first_name;
      newUser.last_name = createMemberRequest.member_info.last_name;
      newUser.username = createMemberRequest.member_info.username;
      newUser.password = createMemberRequest.member_info.password;
      newUser.token = await this.genToken();
      newUser.user_type = user.getNextUserType();
      newUser.secure_code = createMemberRequest.member_info.secure_code;
      newUser.phone = createMemberRequest.member_info.phone;
      newUser.commission_group_a = createMemberRequest.commission.group_a;
      newUser.commission_group_b = createMemberRequest.commission.group_b;
      newUser.commission_group_c = createMemberRequest.commission.group_c;
      newUser.commission_group_d = createMemberRequest.commission.group_d;
      newUser.commission_group_1x2 = createMemberRequest.commission.group_1x2;
      newUser.commission_group_orther =
        createMemberRequest.commission.group_orther;
      return this.usersRepository.save(newUser);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new UserDuplicate();
      } else {
        throw error;
      }
    }
  }

  async updateBalance(userId, newAmount: number) {
    try {
      console.log(newAmount);
      await this.usersRepository
        .createQueryBuilder()
        .useTransaction(true)
        .setLock('pessimistic_write')
        .update()
        .set({ amount: newAmount })
        .execute();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findMember(userRequestId: number, userTargetId: number): Promise<User> {
    try {
      console.log(userRequestId);
      console.log(userTargetId);
      const me = await this.usersRepository.findOne({
        where: { id: userRequestId },
        relations: {
          parent: true,
          children: true,
        },
      });
      if (me.user_type === UserType.MEMBER) {
        throw new NotAllowAccess();
      }
      const userTarget = await this.usersRepository.findOne({
        where: { id: userTargetId },
        relations: {
          parent: true,
          children: true,
        },
      });
      const isDescendant = await this.isChildOf(me, userTarget);
      // console.log(isDescendant);
      if (isDescendant) {
        delete userTarget.parent;
        delete userTarget.children;
        return userTarget;
      }
      throw new NotAllowAccess();
    } catch (error) {
      throw error;
    }
  }

  getDescendantIds(tree: User): number[] {
    const descendantIds: number[] = [];
    for (const child of tree.children) {
      descendantIds.push(child.id);
      descendantIds.push(...this.getDescendantIds(child));
    }
    return descendantIds;
  }
  async genToken() {
    return await bcrypt.hash(
      Date.now().toString(),
      await bcrypt.genSaltSync(10),
    );
  }
}
