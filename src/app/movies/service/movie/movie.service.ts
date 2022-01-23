import { Injectable } from '@angular/core';
import {fakemovies} from '../../../fake-movies';
import {Movie} from '../../../model/movie';
import {Observable, of} from 'rxjs';
import {MessageService} from '../message/message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError,map, tap} from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesURL = 'http://127.0.0.1:3000/movies'
getMovies(): Observable<Movie[]> {
  // this.messageService.add(`${new Date().toLocaleString()}.Get movie list`);
  // return of (fakemovies);
  return this.http.get<Movie[]>(this.moviesURL).pipe(
    tap(receivedMovies => console.log(`receivedMovies = ${JSON.stringify(receivedMovies)}`)),
    catchError(error=>of([]))
  );
}
getMovieFromId(id: number): Observable<Movie>{
  // return of(fakemovies.find(movie => movie.id === id));
  const url = `${this.moviesURL}/${id}`;
  return this.http.get<Movie>(url).pipe(
    tap(selectedMovie => console.log(`selected Movie = ${JSON.stringify(selectedMovie)}`)),
    catchError(error => of(new Movie()))
  );
}
updateMovie(movie:Movie):Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
  };
    return this.http.put(`${this.moviesURL}/${movie.id}`,movie,httpOptions).pipe(
      tap(updateMovie => console.log(`update movie = ${JSON.stringify(updateMovie)}`)),
      catchError(error => of(new Movie()))
    )
}
addMovie(newMovie:Movie):Observable<Movie>{
    return this.http.post<Movie>(this.moviesURL,newMovie,httpOptions).pipe(
      tap((movie:Movie)=>console.log(`insert movie = ${JSON.stringify(movie)}`)),
      catchError(error=>of(new Movie)));
}
deleteMovie(movieId:number):Observable<Movie>{
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url,httpOptions).pipe(
      tap(_=>console.log(`Delete movie with id = ${movieId}`)),
      catchError(error=>of(null))
    )
}
searchMovie(typedString:string):Observable<Movie[]>{
    if(!typedString.trim()){
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundedMovies =>console.log(`founded Movies = ${JSON.stringify(foundedMovies)}`)),
      catchError(error => of(null))
  )
}
  constructor(private http:HttpClient,
    public messageService: MessageService) { }
}
