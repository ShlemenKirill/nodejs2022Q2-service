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
  UseGuards,
} from '@nestjs/common';
import { TrackSchema } from './schemas/track.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './services/track.service';
import { ErrorsMessages } from '../_core/constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from '../favorites/services/favorites.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tracks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/track')
export class TracksController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}
  @Get()
  @HttpCode(200)
  async all(): Promise<TrackSchema[]> {
    return await this.trackService.getAll();
  }
  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string): Promise<TrackSchema> {
    try {
      return await this.trackService.getById(id);
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
      return await this.trackService.createTrack(createTrackDto);
    } catch (error) {
      console.error(error.message);
    }
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): Promise<TrackSchema> {
    try {
      return await this.trackService.updateTrack(id, updateTrackDto);
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
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<TrackSchema> {
    try {
      await this.favoritesService.deleteTrack(id);
      return await this.trackService.deleteTrack(id);
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
