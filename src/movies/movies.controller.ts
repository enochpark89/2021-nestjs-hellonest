import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import {MoviesService} from './movies.service';
// controls the entry point anything inside @Controller() will count as the URL.
import { Movie } from './entities/movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
    
    // Access to the MoviesService
    constructor(private readonly moviesService:MoviesService) {}

    // Return all movies available
    @Get()
    getAll() {
        // getAll movies from the moviesService.
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query('year') searchingYear: string){
        return `We are searching for a movie made after year: ${searchingYear}`;
    }

    // Return only one movie. 
    // NestJS will take the id part from the string of URL and show it.
    
    @Get(':id')
    getOne(@Param('id') movieId: number): Movie {
        return this.moviesService.getOne(movieId);
    }

    // Create a new movie
    @Post()
    // Transform movieData that it receives from a user into CreateMovieDto format.
    create(@Body() movieData: CreateMovieDto) {
        return this.moviesService.create(movieData);
    }

    // Delete a movie with an ID.
    @Delete()
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }
        
    // Update a new movie
    
    @Patch(':id')
    patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }
}