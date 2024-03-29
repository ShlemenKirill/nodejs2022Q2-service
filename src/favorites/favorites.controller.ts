import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { ErrorsMessages } from '../_core/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Favorites')
@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  @HttpCode(200)
  async all() {
    const allValues = await this.favoritesService.getAll();
    return {
      albums: allValues?.albums || [],
      tracks: allValues?.tracks || [],
      artists: allValues?.artists || [],
    };
  }
  @Post('/track/:id')
  @HttpCode(201)
  async addTrack(@Param('id') id: string) {
    try {
      await this.favoritesService.addTrack(id);
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
      await this.favoritesService.deleteTrack(id);
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
      await this.favoritesService.addAlbum(id);
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
  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    try {
      await this.favoritesService.deleteAlbum(id);
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
      await this.favoritesService.addArtist(id);
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
      await this.favoritesService.deleteArtist(id);
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
