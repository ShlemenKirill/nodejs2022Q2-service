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
import { ArtistSchema } from './schemas/artist.schema';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistService } from './services/artist.service';
import { ErrorsMessages } from '../_core/constants';

@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistService: ArtistService) {}
  @Get()
  @HttpCode(200)
  async all(): Promise<ArtistSchema[]> {
    return this.artistService.getAll();
  }
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<ArtistSchema> {
    try {
      return this.artistService.getById(id);
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
  @Post()
  @HttpCode(201)
  async create(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistSchema> {
    try {
      return this.artistService.createArtist(createArtistDto);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.emptyFields:
          throw new HttpException(
            ErrorsMessages.emptyFields,
            HttpStatus.BAD_REQUEST,
          );
      }
    }
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistSchema> {
    try {
      return this.artistService.updateArtist(id, updateArtistDto);
    } catch (error) {
      switch (error.message) {
        case ErrorsMessages.emptyFields:
          throw new HttpException(
            ErrorsMessages.emptyFields,
            HttpStatus.BAD_REQUEST,
          );
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
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<ArtistSchema> {
    try {
      return this.artistService.deleteArtist(id);
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
