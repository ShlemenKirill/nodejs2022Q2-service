import { Injectable } from '@nestjs/common';
import { TrackSchema } from '../schemas/track.schema';
import { localStorage } from '../../LocalStorage';
import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { ErrorsMessages } from '../../_core/constants';

@Injectable()
export class TrackService {
  getAll(): TrackSchema[] {
    return localStorage.tracks;
  }
  getById(id): TrackSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const user = localStorage.tracks.find((el) => el.id === id);
    if (!user) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    return user;
  }
  createTrack(createTrackDto: CreateTrackDto): TrackSchema {
    const { name, albumId, duration, artistId } = createTrackDto;
    const track = {
      id: uuidv4(),
      name,
      duration,
      albumId: albumId || null,
      artistId: artistId || null,
    };
    localStorage.tracks.push(track);
    return track;
  }
  updateTrack(id: string, updateTrackDto: UpdateTrackDto): TrackSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const { name, albumId, duration, artistId } = updateTrackDto;
    const trackToUpdate = localStorage.tracks.find((el) => el.id === id);
    if (!trackToUpdate) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    const indexOfUserToUpdate = localStorage.tracks.findIndex((el) => {
      return el.id === id;
    });
    const resultUser = {
      id,
      name,
      albumId,
      duration,
      artistId,
    };
    localStorage.tracks.splice(indexOfUserToUpdate, 1, resultUser);
    return resultUser;
  }
  deleteTrack(id: string): TrackSchema {
    if (!isUUID(id)) {
      throw new Error(ErrorsMessages.notValidUuid);
    }
    const trackToDelete = localStorage.tracks.find((el) => el.id === id);
    if (!trackToDelete) {
      throw new Error(ErrorsMessages.trackNotExist);
    }
    const indexOfTrackToDelete = localStorage.tracks.findIndex(
      (el) => el.id === id,
    );
    localStorage.tracks.splice(indexOfTrackToDelete, 1);
    return trackToDelete;
  }
}
