import { Injectable } from '@nestjs/common';
import { AlbumsSchema } from '../schemas/albums.schema';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ErrorsMessages } from '../../_core/constants';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}
  async getAll(): Promise<AlbumsSchema[]> {
    return await this.prisma.album.findMany();
  }
  async getById(id: string): Promise<AlbumsSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artist = await this.prisma.album.findUnique({ where: { id } });
    if (!artist) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    return artist;
  }
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumsSchema> {
    const { name, year, artistId } = createAlbumDto;
    const album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    await this.prisma.album.create({ data: album });
    return album;
  }
  async updateAlbum(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumsSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, year, artistId } = updateAlbumDto;
    const albumToUpdate = await this.prisma.album.findUnique({ where: { id } });
    if (!albumToUpdate) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    const album = {
      id,
      name,
      year,
      artistId: artistId || null,
    };
    await this.prisma.album.update({
      where: { id },
      data: album,
    });
    return album;
  }
  async deleteAlbum(id: string): Promise<AlbumsSchema> {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const albumToDelete = await this.prisma.album.findUnique({ where: { id } });
    if (!albumToDelete) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    await this.prisma.album.delete({ where: { id } });
    const trackToUpdate = await this.prisma.track.findFirst({
      where: { albumId: id },
    });
    await this.prisma.track.update({
      where: { id: trackToUpdate.id },
      data: {
        albumId: null,
      },
    });
    return albumToDelete;
  }
}
