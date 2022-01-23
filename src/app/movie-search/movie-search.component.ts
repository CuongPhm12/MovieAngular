import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Movie} from '../model/movie';
import {MovieService} from '../movies/service/movie/movie.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent implements OnInit {
movies$ : Observable<Movie[]>
  private searchedSubject = new Subject<string>();
  constructor(private movieService: MovieService) {
  }


  search(searchedString: string):void{
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }
  ngOnInit(): void {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchedString: string)=>this.movieService.searchMovie(searchedString))
    );
  }

  searchMovie(searchedString: string): any {
        throw new Error('Method not implemented.');
    }

  searchMovies(searchedString: string): any {
        throw new Error('Method not implemented.');
    }

}
