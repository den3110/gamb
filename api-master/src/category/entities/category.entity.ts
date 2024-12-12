import { AutoMap } from '@automapper/classes';
import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  @AutoMap()
  id: number;
  @AutoMap()
  @Column({ unique: true, nullable: true })
  ProductCode: string;
  @AutoMap()
  @Column({ nullable: true })
  ProductName: string;
  @AutoMap()
  @Column({ type: 'bigint', nullable: true })
  ProductId: number;
  @AutoMap()
  @Column({ type: 'bigint', nullable: true })
  GameType: number;
  @AutoMap()
  @Column({ default: false })
  isList: boolean;

  @AutoMap()
  @Column({ default: false, nullable: true })
  isDefault: boolean;

  @AutoMap()
  @Column({ default: '' })
  vi: string;

  @AutoMap()
  @Column({ default: '' })
  en: string;

  @AutoMap()
  @Column({ default: false })
  isNewTab: boolean;

  @AutoMap()
  @Column({ default: false })
  isPlay: boolean;

  @AutoMap()
  @Column({ default: false, nullable: true })
  isNew: boolean;

  @AutoMap()
  @Column({ default: '', nullable: true })
  color: string;

  @AutoMap()
  @Column({ unique: true, nullable: true })
  GameCode: string;

  @AutoMap()
  @Column({ default: '', nullable: true })
  catId: string;

  @AutoMap()
  @Column({ default: false })
  isProduct: boolean;

  @AutoMap()
  @Column({ default: false })
  isCategory: boolean;

  @AutoMap()
  @Column({ default: '', nullable: true })
  cssKey: string;

  @AutoMap()
  @Column({ default: '', nullable: true })
  imageKey: string;

  @Column('simple-json', { nullable: true })
  images: string[];

  @Column('simple-json', { nullable: true })
  logoImages: string[];

  @AutoMap()
  @Column({ default: '', nullable: true })
  bgImage: string;

  @AutoMap()
  @Column({ type: 'bigint', nullable: true, default: 0 })
  number: number;
}
