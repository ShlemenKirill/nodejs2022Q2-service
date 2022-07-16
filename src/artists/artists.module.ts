import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistService } from './services/artist.service';
import { FavoritesService } from '../favorites/services/favorites.service';

@Module({
  imports: [],
  controllers: [ArtistsController],
  providers: [ArtistService, FavoritesService],
})
export class ArtistsModule {}
