import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesSchema } from './schemas/favorites.schema';
import { FavoritesService } from './services/favorites.service';
import { ErrorsMessages } from '../_core/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @HttpCode(200)
  async all(): Promise<FavoritesSchema> {
    return this.favoritesService.getAll();
  }
  @Post('/track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    try {
      return this.favoritesService.addTrack(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.trackNotExist:
          throw new HttpException(
            ErrorsMessages.trackNotExist,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }
  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteTrack(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.trackNotExist:
          throw new HttpException(
            ErrorsMessages.trackNotExist,
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
  @Post('/album/:id')
  @HttpCode(201)
  async addAlbum(@Param('id') id: string) {
    try {
      return this.favoritesService.addAlbum(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.albumsNotExist:
          throw new HttpException(
            ErrorsMessages.albumsNotExist,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }
  @Delete('/track/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteAlbum(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.albumsNotExist:
          throw new HttpException(
            ErrorsMessages.albumsNotExist,
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
  @Post('/artist/:id')
  @HttpCode(201)
  async addArtist(@Param('id') id: string) {
    try {
      return this.favoritesService.addArtist(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.artistNotExist:
          throw new HttpException(
            ErrorsMessages.artistNotExist,
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
      }
    }
  }
  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    try {
      return this.favoritesService.deleteArtist(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
        case ErrorsMessages.artistNotExist:
          throw new HttpException(
            ErrorsMessages.artistNotExist,
            HttpStatus.NOT_FOUND,
          );
      }
    }
  }
}
