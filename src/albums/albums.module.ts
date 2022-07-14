import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
