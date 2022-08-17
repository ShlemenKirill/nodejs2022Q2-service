import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from './services/track.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TracksController],
  providers: [TrackService, FavoritesService],
})
export class TracksModule {}
