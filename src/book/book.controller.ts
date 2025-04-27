import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleDec } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/enum/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiQuery } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Page size',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by book name',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    description: 'Sort by field',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    type: String,
    enum: ['asc', 'desc'],
    description: 'Order direction',
  })
  findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('name') name?: string,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    return this.bookService.findAll(page, pageSize, name, sortBy, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @RoleDec(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
