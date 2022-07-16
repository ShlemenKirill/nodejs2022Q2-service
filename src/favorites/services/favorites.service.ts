import { Injectable } from '@nestjs/common';
import { FavoritesSchema } from '../schemas/favorites.schema';
import { localStorage } from '../../LocalStorage';
import { ErrorsMessages } from '../../_core/constants';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class FavoritesService {
  getAll(): FavoritesSchema {
    return localStorage.favorites;
  }
  addTrack(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const track = localStorage.tracks.find((el) => el.id === id);
    if (!track) throw new Error(ErrorsMessages.trackNotExist);
    localStorage.favorites.tracks.push(track);
  }
  deleteTrack(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isTrackExist = localStorage.tracks.find((el) => el.id === id);
    if (!isTrackExist) throw new Error(ErrorsMessages.trackNotExist);
    const indexOfTrack = localStorage.favorites.tracks.findIndex(
      (el) => el.id === id,
    );
    localStorage.favorites.tracks.splice(indexOfTrack, 1);
  }
  addArtist(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artist = localStorage.artists.find((el) => el.id === id);
    if (!artist) throw new Error(ErrorsMessages.artistNotExist);
    localStorage.favorites.artists.push(artist);
  }
  deleteArtist(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isArtistExist = localStorage.artists.find((el) => el.id === id);
    if (!isArtistExist) throw new Error(ErrorsMessages.artistNotExist);
    const indexOfTrack = localStorage.favorites.artists.findIndex(
      (el) => el.id === id,
    );
    localStorage.favorites.artists.splice(indexOfTrack, 1);
  }
  addAlbum(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const album = localStorage.albums.find((el) => el.id === id);
    if (!album) throw new Error(ErrorsMessages.albumsNotExist);
    localStorage.favorites.albums.push(album);
  }
  deleteAlbum(id: string) {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const isAlbumExist = localStorage.albums.find((el) => el.id === id);
    if (!isAlbumExist) throw new Error(ErrorsMessages.albumsNotExist);
    const indexOfTrack = localStorage.favorites.albums.findIndex(
      (el) => el.id === id,
    );
    localStorage.favorites.albums.splice(indexOfTrack, 1);
  }
}
