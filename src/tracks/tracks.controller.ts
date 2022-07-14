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
import { TrackSchema } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './services/track.service';
import { ErrorsMessages } from '../_core/constants';

@Controller('/track')
export class TracksController {
  constructor(private readonly trackService: TrackService) {}
  @Get()
  @HttpCode(200)
  async all(): Promise<TrackSchema[]> {
    return this.trackService.getAll();
  }
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<TrackSchema> {
    try {
      return this.trackService.getById(id);
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
  @Post()
  @HttpCode(201)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<TrackSchema> {
    try {
      return this.trackService.createTrack(createTrackDto);
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
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    try {
      return this.trackService.updateTrack(id, updateTrackDto);
    } catch (error) {
      if (error.message === ErrorsMessages.trackNotExist) {
        throw new HttpException(
          ErrorsMessages.trackNotExist,
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.message === ErrorsMessages.notValidUuid) {
        throw new HttpException(
          ErrorsMessages.notValidUuid,
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<TrackSchema> {
    try {
      return this.trackService.deleteTrack(id);
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
}