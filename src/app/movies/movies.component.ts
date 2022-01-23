import { Component, OnInit } from '@angular/core';
import {Movie} from '../model/movie';
import {fakemovies} from '../fake-movies';
import {MovieDetailComponent} from '../movie-detail/movie-detail.component';
import {MovieService} from './service/movie/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  // movies = fakemovies;

  movies: Movie[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMoviesFromService();
  }
  getMoviesFromService(): void{
    // this.movies=this.movieService.getMovies()
    this.movieService.getMovies().subscribe ((updateMovies) => {
      this.movies = updateMovies;
      // console.log(`this.movies = ${JSON.stringify(this.movies)}`)
  }
    );
  }
  add(name:string, releaseYear: string):void{
    name: name.trim();
    if(Number.isNaN(Number(releaseYear))||!name||Number(releaseYear)===0){
      alert('Name must not be blank, Release year must be a number');
      return;
    }
    const newMovie: Movie = new Movie();
    newMovie.name = name;
    newMovie.releaseYear= Number(releaseYear);
    this.movieService.addMovie(newMovie).subscribe(insertedMovie=>{
        this.movies.push(insertedMovie)
      });
  }
  delete(movieId:number):void{
    this.movieService.deleteMovie(movieId).subscribe(_=>{
      this.movies = this.movies.filter(eachMovie => eachMovie.id !== movieId);
    })
  }


//Action when select a movie in list item
//   selectedMovie : Movie;
//   onSelect(movie:Movie):void{
//     this.selectedMovie = movie;
//     console.log(`selectedMovie = ${JSON.stringify(this.selectedMovie)}`);
    // alert(`selectedMovie=${JSON.stringify(this.selectedMovie)}`)
  // }
}
