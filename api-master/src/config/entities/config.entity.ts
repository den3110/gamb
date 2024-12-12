import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('config')
export class Config {
  @PrimaryColumn()
  key: string;
  @Column('longtext')
  value: string;
}
