# HelloNest

- Create an enterprise ready API. 

# Set up
- Delete AppService and AppController from the default app.module.ts

# REST API

# 1.0  Create Movie Controller

- Use NextJS CLI to create a new controller. 
```
nest generate controller
// or nest g co
```
- App module.ts imported MoviesController that is newly created.
- Automatically, it will create movie.controller.ts

movie.controller.ts that contains below:
  - @Get() and @Post
  - getAll(), getOne(), create(), @Delete(), @Patch()
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

# 2.0 More Routes

a. @Post() should get the body of the request. 

- if you send the body, you want to add it to the API.
- In order to do that, add @Body() in the create() as below

```ts
// Get the body and console log it.
 @Post()
    create(@Body() moviedata) {
        console.log(movieData);
        return 'This will create a movie';
    }
```
input:
{
  	"title":"Tenet",
		"year":2020
}

output:
{ title: 'Tenet', year: 2020 }
- on the console of bash or node.

b. Fix @Patch() to update the movie in the movie pool.

```ts
// Update a new movie
......    
    @Patch(':id')
    patch(@Param('id') movieId: string, @Body() updateData) {
      return {
        updatedMovie: movieId,
        ...updateData,
      };
    }
```
input: 

body - 
{
  	"title":"Tenet",
		"director":"Nolan"
}

output:
{
  "updatedMovie": "12",
  "title": "Tenet",
  "director": "Nolan"
}

# 3.0 Search item

- You can create a search function by using @Get - search(@Query) as below:

```ts
    @Get("search")
    search(@Query('year') searchingYear:string){
        return `We are searching for a movie made after year ${searchingYear}} `
    }
```

input:
GET http://localhost:3000/movies/search?year=2000

output:
We are searching for a movie made after year: 2000

# 4.0 Movie Service

- **Single Responsibility Principle**: Thing should do one and thing and do it well
- service handles the logic of the movies.
a. Create a service

```
nest generate service
// or nest g s
```
- Then, service gets created.
- This is going to be like our database. 
*Here, we are going to implement the fake database.*

- Set the movies.service.ts as below:

movies.service.ts:
```ts
import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    // return a Movie.
    getAll(): Movie[] {
        return this.movies;
    }

    // Find a movie from the movies array. 
    getOne(id: string): Movie {
        return this.movies.find(movie => movie.id === +id);
    }

    // Delete a movie with a specific id.
    deleteOne(id:string): boolean {
        this.movies.filter(movie => movie.id !== +id);
        return true;
    }

    // Push a new movie into a movieData array.
    create(movieData){
        this.movies.push({
            id: this.movies.length + 1, 
            ...movieData
        })
    }
}

```

- If you turn off the server, or save things from the insomnia, data will disappear.

- You can use the NotFound

movies.service.ts - getOne item.
```
   getOne(id: string): Movie {
        const movie = this.movies.find(movie => movie.id === +id);
        // if movie is not found, you throw an NotFoundException from NestJS
        if (!movie) {
          throw new NotFoundException(`Movie with ID ${id} not found.`);
        }
        return movie;    
    }
```
- you can use NotFoundException to show that the movie was not found because there is no matching id.

- Now that you have created a successful getOne() function, you can also create deleteOne utiliing getOne() function.

```
    // Delete a movie with a specific id.
    deleteOne(id:string) {
        // this itself will throw an error, if not found.
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== +id);
    }
```

- However, this update function is not safe because anybody can update and put in anything inside the movie array. We need to validate the information that is users put in.

# 5.0 DTOs and Validation 


A. Create DTO called dto/create-movie.dto.ts
- DTO (Data Transfer Object)

- Create a dto folder inside movie
    - To create, you need to install class-validator package.
    ```
    npm i class-validator class-transformer
    ```


- Use pipe in main.ts to check whether they are in a correct type. 
```ts
```


- NestJS also can transform the type of the input as you state it.
```ts
    // transform movieId received into a number before passes it to the moviesService
  @Delete()
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }
```

B. Create another DTO called update-movie.dto.ts

- you can use **partial type** to repeat some of the similar code.

update.movie.dto.ts
```ts
import { IsString, IsNumber } from 'class-validator';


// ? indicates read-only
export class UpdateMovieDto {
  @IsString()
  readonly title?: string;

  @IsNumber()
  readonly year?: number;

  @IsString({ each: true })
  readonly genres?: string[];
}
```
*How to install a partial type?*
```ts
npm i @nestjs/mapped-types
```
- There are also @nestjs/graphql and @nestjs/swagger.

After you install them, set up the update-movie.dto.ts as below

```ts
import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
```
