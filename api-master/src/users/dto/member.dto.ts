import { AutoMap } from '@automapper/classes';
import { UserType } from '../user.enum';
import { DayOfWeeb } from '../user_transfer.enum';

export default class MemberDTO {
  @AutoMap()
  id: number;
  @AutoMap()
  first_name: string;
  @AutoMap()
  last_name: string;
  @AutoMap()
  username: string;
  @AutoMap(() => [MemberDTO])
  children: MemberDTO[];

  @AutoMap()
  is_close: boolean;

  @AutoMap()
  group: string;

  @AutoMap()
  user_type: UserType;
  @AutoMap()
  phone: string;
  @AutoMap()
  is_online: boolean;

  @AutoMap()
  is_suppended: boolean;

  @AutoMap()
  credit_line: number;

  @AutoMap()
  amount: number;

  @AutoMap()
  transfer_config: DayOfWeeb;

  @AutoMap()
  discount_asian: number;

  @AutoMap()
  discount_1x2: number;

  @AutoMap()
  discount_cs: number;

  @AutoMap()
  discount_number: number;

  @AutoMap()
  discount_hr_fix_odds: number;

  @AutoMap()
  commission_group_a: number;

  @AutoMap()
  commission_group_b: number;

  @AutoMap()
  commission_group_c: number;

  @AutoMap()
  commission_group_d: number;

  @AutoMap()
  commission_group_1x2: number;

  @AutoMap()
  commission_group_orther: number;
}
