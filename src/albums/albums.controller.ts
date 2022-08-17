import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumsSchema } from './schemas/albums.schema';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsService } from './services/albums.service';
import { ErrorsMessages } from '../_core/constants';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FavoritesService } from '../favorites/services/favorites.service';

@ApiTags('Albums')
@Controller('/album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    type: AlbumsSchema,
    description: 'Albums records returns successfully',
    isArray: true,
  })
  async all(): Promise<AlbumsSchema[]> {
    return this.albumsService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: AlbumsSchema,
    description: 'Album record returns successfully',
  })
  @ApiBadRequestResponse({
    description: 'Incorrect input',
  })
  @ApiNotFoundResponse({
    description: "Album don't exist",
  })
  async getById(@Param('id') id: string): Promise<AlbumsSchema> {
    try {
      return this.albumsService.getById(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.albumsNotExist:
          throw new HttpException(
            ErrorsMessages.albumsNotExist,
            HttpStatus.NOT_FOUND,
          );
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: AlbumsSchema,
  })
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumsSchema> {
    try {
      return this.albumsService.createAlbum(createAlbumDto);
    } catch (error) {
      console.error(error.message);
    }
  }

  @Put(':id')
  @HttpCode(200)
  @ApiOkResponse({
    type: AlbumsSchema,
    description: 'Album record updates successfully',
  })
  @ApiNotFoundResponse({
    description: "Album don't exist",
  })
  @ApiBadRequestResponse({
    description: 'Not valid UUID',
  })
  @ApiForbiddenResponse({
    description: 'Incorrect password',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumsSchema> {
    try {
      return this.albumsService.updateAlbum(id, updateAlbumDto);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.albumsNotExist:
          throw new HttpException(
            ErrorsMessages.albumsNotExist,
            HttpStatus.NOT_FOUND,
          );
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNotFoundResponse({
    description: 'Album deletes successfully',
  })
  @ApiBadRequestResponse({
    description: 'Not valid UUID',
  })
  @ApiNotFoundResponse({
    description: "Album don't exist",
  })
  async remove(@Param('id') id: string): Promise<AlbumsSchema> {
    try {
      this.favoritesService.deleteAlbum(id);
      return this.albumsService.deleteAlbum(id);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.albumsNotExist:
          throw new HttpException(
            ErrorsMessages.albumsNotExist,
            HttpStatus.NOT_FOUND,
          );
        case ErrorsMessages.notValidUuid:
          throw new HttpException(
            ErrorsMessages.notValidUuid,
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }
}
