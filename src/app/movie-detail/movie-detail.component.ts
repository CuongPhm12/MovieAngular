import {Component, Input, OnInit} from '@angular/core';
import {Movie} from '../model/movie';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../movies/service/movie/movie.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
@Input() movie: Movie;
  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private location: Location) { }

  ngOnInit(): void {
    this.getMovieFromRoute();
  }
getMovieFromRoute(): void{
const id = +this.route.snapshot.paramMap.get('id');
console.log(`this.route.snapshot.paramMap=${JSON.stringify(this.route.snapshot.paramMap)}`);
// call service to "get movie from id"?
this.movieService.getMovieFromId(id).subscribe(movie => this.movie = movie);
}
// quay trở lại màn hình phía trước
goBack(): void{
    this.location.back();
}
save():void{
    this.movieService.updateMovie(this.movie).subscribe(() => this.goBack());
}
}
