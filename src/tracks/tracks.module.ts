import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from './services/track.service';
import { FavoritesService } from '../favorites/services/favorites.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TrackService, FavoritesService],
})
export class TracksModule {}
