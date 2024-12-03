// book/src/app.module.ts
import { Module } from '@nestjs/common';
import { BookModule } from './book.module';

@Module({
  imports: [BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
