import { Injectable } from '@nestjs/common';
import { ArtistSchema } from '../schemas/artist.schema';
import { localStorage } from '../../LocalStorage';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';

@Injectable()
export class ArtistService {
  getAll(): ArtistSchema[] {
    return localStorage.artists;
  }
  getById(id): ArtistSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artist = localStorage.artists.find((el) => el.id === id);
    if (!artist) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    return artist;
  }
  createArtist(createArtistDto: CreateArtistDto): ArtistSchema {
    const { name, grammy } = createArtistDto;
    const artist = {
      id: uuidv4(),
      name,
      grammy,
    };
    localStorage.artists.push(artist);
    return artist;
  }
  updateArtist(id: string, updateArtistDto: UpdateArtistDto): ArtistSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, grammy } = updateArtistDto;
    const artistToUpdate = localStorage.artists.find((el) => el.id === id);
    if (!artistToUpdate) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    const indexOfArtistToUpdate = localStorage.artists.findIndex((el) => {
      return el.id === id;
    });
    const resultArtist = {
      id,
      name,
      grammy,
    };
    localStorage.artists.splice(indexOfArtistToUpdate, 1, resultArtist);
    return resultArtist;
  }
  deleteArtist(id: string): ArtistSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const artistToDelete = localStorage.artists.find((el) => el.id === id);
    if (!artistToDelete) {
      throw new Error(ErrorsMessages.artistNotExist);
    }
    const indexOfArtistToDelete = localStorage.artists.findIndex(
      (el) => el.id === id,
    );
    localStorage.artists.splice(indexOfArtistToDelete, 1);
    localStorage.tracks.map((track) => {
      const { artistId, ...rest } = track;
      if (artistId === id) {
        return {
          artistId: null,
          ...rest,
        };
      }
    });
    return artistToDelete;
  }
}
