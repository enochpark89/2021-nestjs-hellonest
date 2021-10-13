import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';

// controls the entry point anything inside @Controller() will count as the URL.

@Controller('movies')
export class MoviesController {
    
    // Return all movies available.
    @Get()
    getAll() {
        return 'This will return all movies';
    }

    // Return only one movie. NestJS will take the id part from the string of URL and show it.
    @Get("/:id")
    getOne(@Param('id') movieid:string){
        return `This will return one movie with the id: ${movieid}`;
    }

    // Create a new movie
    @Post()
    create() {
        return 'This will create a movie';
    }

    // Delete a movie with an ID.
    @Delete()
    remove(@Param('id') movieid:string){
        return `This will delete a movie with the id: ${movieid}`;
    }
    
    // Update a new movie
    @Patch('/:id')
    patch(@Param('id') movieid:string){
        return `This will delete a movie with the id: ${movieid}`;
    }


}