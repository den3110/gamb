import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('category')
@ApiBearerAuth()
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  private readonly logger = new Logger(CategoryController.name);

  @UseGuards(AuthGuard(['member']))
  @Get('/')
  async category(@Req() req): Promise<any> {
    return this.categoryService.getCategory();
  }

  @Get('/:catId')
  @HttpCode(200)
  @UseGuards(AuthGuard('member'))
  // @UseInterceptors(MapInterceptor(User, MemberDTO))
  async details(@Req() req, @Param('catId') catId: string): Promise<any> {
    return this.categoryService.getSub(catId);
  }
}
