import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent {

  artistas: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    console.log(termino);

    this.loading = true;
    this.spotify.buscarArtistas( termino )
          .subscribe( (data: any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
          });
  }

}
