# HelloNest

- Create an enterprise ready API. 

# Set up
- Delete AppService and AppController from the default app.module.ts

# REST API

1.  Create Movie Controller

- Use NextJS CLI to create a new controller. 
```
nest generate controller
// or nest g co
```
- App module.ts imported MoviesController that is newly created.
- Automatically, it will create movie.controller.ts

movie.controller.ts:
```ts
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
```
*In nest JS, if you want something you have to ASK FOR IT!*