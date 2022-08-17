import { IsArray } from 'class-validator';
import { TrackSchema } from '../../tracks/schemas/track.schema';
import { ArtistSchema } from '../../artists/schemas/artist.schema';
import { AlbumsSchema } from '../../albums/schemas/albums.schema';

export class FavoritesSchema {
  @IsArray()
  artists: ArtistSchema[]; // favorite artists ids
  @IsArray()
  albums: AlbumsSchema[]; // favorite albums ids
  @IsArray()
  tracks: TrackSchema[]; // favorite tracks ids
}
