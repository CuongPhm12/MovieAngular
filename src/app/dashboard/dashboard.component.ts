import { Component, OnInit } from '@angular/core';
import {Movie} from '../model/movie';
import {MovieService} from '../movies/service/movie/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
movies: Movie[];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  this.getMovie();
  }
getMovie(): void{
this.movieService.getMovies().subscribe(movies => this.movies = movies.slice(0, 4));
}
}
