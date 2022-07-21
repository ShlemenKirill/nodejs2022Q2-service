import { Injectable } from '@nestjs/common';
import { TrackSchema } from '../schemas/track.schema';
import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<TrackSchema[]> {
    return await this.prisma.track.findMany();
  }
  async getById(id): Promise<TrackSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    return track;
  }
  async createTrack(createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    const { name, albumId, duration, artistId } = createTrackDto;
    const track = {
      id: uuidv4(),
      name,
      duration,
      albumId: albumId || null,
      artistId: artistId || null,
    };
    await this.prisma.track.create({ data: track });
    return track;
  }
  async updateTrack(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, albumId, duration, artistId } = updateTrackDto;
    const trackToUpdate = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!trackToUpdate) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    const resultUser = {
      id,
      name,
      albumId,
      duration,
      artistId,
    };
    await this.prisma.track.update({
      where: { id },
      data: resultUser,
    });
    return resultUser;
  }
  async deleteTrack(id: string): Promise<TrackSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const trackToDelete = await this.prisma.track.findUnique({ where: { id } });
    if (!trackToDelete) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    await this.prisma.track.delete({ where: { id } });
    return trackToDelete;
  }
}
