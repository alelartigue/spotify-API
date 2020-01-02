import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = 'https://api.spotify.com/v1/';

    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('token')
    });

    return this.http.get(url + query, { headers });
  }

  getToken() {
    const serverHeroku = 'https://spotifitoken.herokuapp.com/spotify/';
    const clientId = '3c5ee87868bf4b828ecfaf3562a9008a';
    const clientSecret = '8d28fce715bf46889e4159b2bd8ddfc3';
    console.log(serverHeroku + clientId + '/' + clientSecret);
    return this.http.get(serverHeroku + clientId + '/' + clientSecret).pipe(
      // tslint:disable-next-line:no-string-literal
      map((data: any) => data['access_token'])
      );
  }

  getLanzamientos() {
    return this.getQuery('browse/new-releases?country=US&offset=0&limit=20').pipe(
      // tslint:disable-next-line:no-string-literal
      map(data => data['albums'].items)
    );
  }

  buscarArtistas(keyword: string) {
    return this.getQuery(
      'search?query=' + keyword + '&type=artist&market=US'
    // tslint:disable-next-line:no-string-literal
    ).pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery('artists/' + id);
  }

  getTopCanciones(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      // tslint:disable-next-line:no-string-literal
      map(data => data['tracks'])
    );
  }
}
