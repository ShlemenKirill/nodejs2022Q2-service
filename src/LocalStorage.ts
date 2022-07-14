import { UserSchema } from './users/schemas/user.schema';
import { TrackSchema } from './tracks/schemas/track.schema';

export const localStorage: ILocalStorage = {
  users: [],
  tracks: [],
};

export interface ILocalStorage {
  users: UserSchema[];
  tracks: TrackSchema[];
}
