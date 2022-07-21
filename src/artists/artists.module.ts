import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistService } from './services/artist.service';
import { FavoritesService } from '../favorites/services/favorites.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistsController],
  providers: [ArtistService, FavoritesService],
})
export class ArtistsModule {}
