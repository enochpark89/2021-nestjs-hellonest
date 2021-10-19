import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AppModule } from './../app.module'

@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}