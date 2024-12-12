import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Config } from './config/entities/config.entity';
import { ConfigModule } from '@nestjs/config';
import { ConfigModule as MyConfigModule } from './config/config.module';
import { GameModule } from './game/game.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from './core/ExceptionsLoggerFilter';
import { Game } from './game/entities/game.entity';
import { PlayModule } from './play/play.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DATABASE_HOST}`,
      port: parseInt(`${process.env.DATABASE_PORT}`),
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [User, Config, Game, Category],
      synchronize: true,
    }),
    ConfigModule,
    MyConfigModule,
    GameModule,
    PlayModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
