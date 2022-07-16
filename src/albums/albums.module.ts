import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';
import { FavoritesService } from '../favorites/services/favorites.service';

@Module({
  imports: [],
  controllers: [AlbumsController],
  providers: [AlbumsService, FavoritesService],
})
export class AlbumsModule {}
