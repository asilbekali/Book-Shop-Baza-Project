import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TgModule } from './tg/tg.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    UserModule,
    TgModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BookModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
