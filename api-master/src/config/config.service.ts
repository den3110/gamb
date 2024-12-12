import { Injectable } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config) private configRepository: Repository<Config>,
  ) {}
  findConfig(key: string): Promise<Config> {
    return this.configRepository.findOneBy({ key: key });
  }
}
