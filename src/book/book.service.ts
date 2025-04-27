import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    const bazaBook = await this.prisma.book.findFirst({
      where: { name: createBookDto.name },
    });

    if (!bazaBook) {
      return await this.prisma.book.create({
        data: createBookDto,
      });
    } else {
      return {message: "user already exists"}
    }
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    name?: string,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'asc',
  ) {
    const skip = (page - 1) * pageSize;

    const where: Prisma.BookWhereInput = name
      ? {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        }
      : {};

    const books = await this.prisma.book.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: {
        [sortBy]: order,
      },
    });

    const total = await this.prisma.book.count({ where });

    return {
      data: books,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
