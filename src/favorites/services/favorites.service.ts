import { Injectable } from '@nestjs/common';
import { ErrorsMessages } from '../../_core/constants';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { PrismaService } from '../../prisma/prisma.service';

const STATIC_UUID = '5c1d6636-7db2-427f-8337-96f1d968ca90';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}
  private async createIfNotExist() {
    await this.prisma.favorites.upsert({
      where: { id: STATIC_UUID },
      update: {},
      create: {
        id: STATIC_UUID,
      },
    });
  }
  async getAll() {
    return await this.prisma.favorites.findFirst({
      where: { id: STATIC_UUID },
      select: {
        tracks: { where: { NOT: [{ favoritesId: null }] } },
        albums: { where: { NOT: [{ favoritesId: null }] } },
        artists: { where: { NOT: [{ favoritesId: null }] } },
      },
    });
  }
  async addTrack(trackId: string) {
    if (!isUUID(trackId)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    await this.createIfNotExist();
    const track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });
    if (!track) throw new Error(ErrorsMessages.trackNotExist);
    await this.prisma.track.update({
      where: {
        id: trackId,
      },
      data: {
        favoritesId: STATIC_UUID,
      },
    });
    return track;
  }
  async deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isTrackExist = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!isTrackExist) throw new Error(ErrorsMessages.trackNotExist);
    await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
  async addArtist(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    await this.createIfNotExist();

    const artist = await this.prisma.artist.findFirst({
      where: { id },
    });
    if (!artist) throw new Error(ErrorsMessages.artistNotExist);
    await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        favoritesId: STATIC_UUID,
      },
    });
    return artist;
  }
  async deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isArtistExist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!isArtistExist) throw new Error(ErrorsMessages.artistNotExist);
    await this.prisma.artist.update({
      where: {
        id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
  async addAlbum(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    await this.createIfNotExist();
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) throw new Error(ErrorsMessages.albumsNotExist);
    await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        favoritesId: STATIC_UUID,
      },
    });
    return album;
  }
  async deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isAlbumExist = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!isAlbumExist) throw new Error(ErrorsMessages.albumsNotExist);
    await this.prisma.album.update({
      where: {
        id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
}
