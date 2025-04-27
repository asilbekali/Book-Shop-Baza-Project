import { Module } from '@nestjs/common';
import { Tgupdate } from './tg.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookService } from 'src/book/book.service';

@Module({
    imports: [TelegrafModule.forRoot({
        token: "7568918477:AAF0kNEWu8NP39uFSjpro5cfXYJxkjCbnqM"
    })],
    providers: [Tgupdate, PrismaService, BookService]
})
export class TgModule {}
