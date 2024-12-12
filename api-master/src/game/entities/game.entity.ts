import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import TransactionRequest from '../dto/transaction/TransactionRequest.dto';
import { classToPlain, instanceToPlain, plainToClass } from 'class-transformer';

@Entity()
export class Game {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @AutoMap()
  id: number;
  @AutoMap()
  @Column({ unique: true, nullable: true })
  TransactionID: string;
  @AutoMap()
  @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
  TransactionAmount: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  BetAmount: number;

  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  ValidBetAmount: number;

  @AutoMap()
  @Column({ nullable: true })
  SettlementDate: Date;

  @AutoMap()
  @Column()
  ModifiedOn: Date;

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      to(value: object[]): string {
        return JSON.stringify(value);
      },
      from(value: string): object[] {
        return JSON.parse(value);
      },
    },
  })
  Data?: object[];
  @AutoMap()
  @Column()
  CreatedOn: Date;

  @AutoMap()
  @Column({ type: 'bigint' })
  Status: number;

  @AutoMap()
  @Column({ type: 'bigint', nullable: true })
  WagerID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  ProviderLineID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  ProviderID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  ProductID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  OperatorID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  MemberID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  CurrencyID: number;

  @AutoMap()
  @Column({ type: 'bigint' })
  GameType: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  JPBet: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  JackpotAmount: number;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  CommisionAmount: number;

  @AutoMap()
  @Column({ nullable: true })
  GameID: string;

  @AutoMap()
  @Column({ nullable: true })
  GameRoundID: string;

  @AutoMap()
  @Column({ nullable: true, type: 'longtext' })
  BetDetail: string;

  @AutoMap()
  @Column({ nullable: true, type: 'longtext' })
  PayoutDetail: string;

  @AutoMap()
  @Column({
    type: 'decimal',
    precision: 18,
    scale: 6,
    default: 0,
    nullable: true,
  })
  PayoutAmount: number;

  static toModel(game: TransactionRequest): Game {
    const data = instanceToPlain(game);
    return plainToClass(Game, data);
  }
}
