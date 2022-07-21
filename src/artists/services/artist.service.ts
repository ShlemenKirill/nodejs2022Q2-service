import { Injectable } from '@nestjs/common';
import { ArtistSchema } from '../schemas/artist.schema';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<ArtistSchema[]> {
    return this.prisma.artist.findMany();
  }
  async getById(id): Promise<ArtistSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    return artist;
  }
  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistSchema> {
    const { name, grammy } = createArtistDto;
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    await this.prisma.artist.create({ data: artist });
    return artist;
  }
  async updateArtist(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, grammy } = updateArtistDto;
    const artistToUpdate = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artistToUpdate) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    const resultArtist = {
      id,
      name,
      grammy,
    };
    await this.prisma.artist.update({
      where: { id },
      data: artistToUpdate,
    });
    return resultArtist;
  }
  async deleteArtist(id: string): Promise<ArtistSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artistToDelete = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artistToDelete) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    await this.prisma.artist.delete({ where: { id } });
    const trackToUpdate = await this.prisma.track.findFirst({
      where: { artistId: id },
    });
    await this.prisma.track.update({
      where: { id: trackToUpdate.id },
      data: {
        artistId: null,
      },
    });
    return artistToDelete;
  }
}
