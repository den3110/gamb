import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Tree,
} from 'typeorm';
import { UserType } from './user.enum';
import { AutoMap } from '@automapper/classes';
import { NotAllowAccess } from 'src/exception/bad-request-exceptions';
import { ColumnNumericTransformer } from 'src/core/ColumnNumericTransformer';
import { DayOfWeeb } from './user_transfer.enum';
@Entity()
@Tree('nested-set')
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  first_name: string;

  @Column()
  @AutoMap()
  last_name: string;
  @Column()
  @AutoMap()
  phone: string;

  @Column({ default: true })
  @AutoMap()
  is_active: boolean;

  @Column({ default: false })
  @AutoMap()
  is_close: boolean;

  @Column({ default: -1 })
  @AutoMap()
  transfer_config: DayOfWeeb;

  @AutoMap()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  token: string;

  @TreeParent()
  parent: User;

  @AutoMap(() => [User])
  @TreeChildren()
  children: User[];

  // @ManyToOne((type) => User, (user) => user.children)
  // parent: User;

  // @OneToMany((type) => User, (user) => user.parent)
  // children: User[];
  @AutoMap()
  @Column({ nullable: true })
  group: string;

  @AutoMap()
  @Column()
  user_type: UserType;

  @Column()
  secure_code: string;
  @AutoMap()
  @Column({ default: false })
  is_online: boolean;

  @AutoMap()
  @Column({ default: false })
  is_suppended: boolean;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  credit_line: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount_asian: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount_1x2: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount_cs: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount_number: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  discount_hr_fix_odds: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_a: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_b: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_c: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_d: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_1x2: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0.0025,
    transformer: new ColumnNumericTransformer(),
  })
  commission_group_orther: number;

  getNextUserType() {
    if (this.user_type === UserType.MEMBER) {
      throw new NotAllowAccess();
    }
    switch (this.user_type) {
      case UserType.ADMIN:
        return UserType.SUPER;
      case UserType.SUPER:
        return UserType.MASTER;
      case UserType.MASTER:
        return UserType.AGENT;
      case UserType.AGENT:
        return UserType.MEMBER;
    }
  }
}
