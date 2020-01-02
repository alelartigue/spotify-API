import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { ArtistaComponent } from './components/artista/artista.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'buscar', component: BuscarComponent},
  { path: 'artist/:id', component: ArtistaComponent },
    { path: '', pathMatch: 'full', redirectTo: '' },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
