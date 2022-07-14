import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TrackService } from './services/track.service';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TrackService],
})
export class TracksModule {}
