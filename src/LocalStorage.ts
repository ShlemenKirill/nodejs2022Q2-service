import { UserSchema } from './users/schemas/user.schema';
import { TrackSchema } from './tracks/schemas/track.schema';
import { ArtistSchema } from './artists/schemas/artist.schema';
import { AlbumsSchema } from './albums/schemas/albums.schema';
import { FavoritesSchema } from './favorites/schemas/favorites.schema';

export const localStorage: ILocalStorage = {
  users: [],
  tracks: [],
  artists: [],
  albums: [],
  favorites: {
    artists: [],
    tracks: [],
    albums: [],
  },
};

export interface ILocalStorage {
  users: UserSchema[];
  tracks: TrackSchema[];
  artists: ArtistSchema[];
  albums: AlbumsSchema[];
  favorites: FavoritesSchema;
}
