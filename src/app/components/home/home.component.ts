import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {

  nuevosLanzamientos: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotifyService: SpotifyService ) {

    this.loading = true;
    this.error = false;

    if (!localStorage.getItem('token')) {
      this.getToken();
    } else {
      this.getLanzamientos();
    }
  }

  getToken() {
    this.spotifyService.getToken()
      .subscribe( (data: any) => {
        localStorage.setItem('token', 'Bearer ' + data);
        this.getLanzamientos();
      }, (errorServicio => {
        this.loading = false;
        this.error = errorServicio;
      }));

  }

  getLanzamientos() {
    this.spotifyService.getLanzamientos()
    .subscribe( (data: any) => {
      this.nuevosLanzamientos = data;
      console.log ( this.nuevosLanzamientos);
      this.loading = false;
    }, ( errorServicio ) => {

      this.loading = false;
      this.error = true;
      this.mensajeError = errorServicio.error.error.message;

    });
  }



}
