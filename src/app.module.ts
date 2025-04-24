import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserGuard } from './user/user.guard';

@Module({
  imports: [UserModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserGuard],
})
export class AppModule {}
