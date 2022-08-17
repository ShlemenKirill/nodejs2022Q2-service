import { Injectable } from '@nestjs/common';
import { AlbumsSchema } from '../schemas/albums.schema';
import { localStorage } from '../../LocalStorage';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { ErrorsMessages } from '../../_core/constants';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class AlbumsService {
  getAll(): AlbumsSchema[] {
    return localStorage.albums;
  }
  getById(id: string): AlbumsSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artist = localStorage.albums.find((el) => el.id === id);
    if (!artist) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    return artist;
  }
  createAlbum(createAlbumDto: CreateAlbumDto): AlbumsSchema {
    const { name, year, artistId } = createAlbumDto;
    const album = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null,
    };
    localStorage.albums.push(album);
    return album;
  }
  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): AlbumsSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, year, artistId } = updateAlbumDto;
    const albumToUpdate = localStorage.albums.find((el) => el.id === id);
    if (!albumToUpdate) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    const indexOfAlbumToUpdate = localStorage.albums.findIndex((el) => {
      return el.id === id;
    });
    const album = {
      id,
      name,
      year,
      artistId: artistId || null,
    };
    localStorage.albums.splice(indexOfAlbumToUpdate, 1, album);
    return album;
  }
  deleteAlbum(id: string): AlbumsSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const albumToDelete = localStorage.albums.find((el) => el.id === id);
    if (!albumToDelete) {
      throw new Error(ErrorsMessages.albumsNotExist);
    }
    const indexOfAlbumToDelete = localStorage.albums.findIndex(
      (el) => el.id === id,
    );
    localStorage.albums.splice(indexOfAlbumToDelete, 1);
    const indexOfTrackToUpdate = localStorage.tracks.findIndex(
      (el) => el.albumId === id,
    );
    localStorage.tracks[indexOfTrackToUpdate] = {
      ...localStorage.tracks[indexOfTrackToUpdate],
      albumId: null,
    };
    return albumToDelete;
  }
}
