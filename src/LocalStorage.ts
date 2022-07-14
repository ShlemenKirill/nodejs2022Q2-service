import { UserSchema } from './users/schemas/user.schema';
import { TrackSchema } from './tracks/schemas/track.schema';
import { ArtistSchema } from './artists/schemas/artist.schema';

export const localStorage: ILocalStorage = {
  users: [],
  tracks: [],
  artists: [],
};

export interface ILocalStorage {
  users: UserSchema[];
  tracks: TrackSchema[];
  artists: ArtistSchema[];
}
