import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    //Primero obtengo el id del país de la url, con activatedRoute, que se pasan con params
    this.activatedRoute.params
      .pipe(
        //Con switchMap, perimite recibir un observable y regresar otro observable
        //Pasamos el params id al método de getPaisPorAlpha y nos suscribimos a él
        switchMap(params => this.paisService.getPaisPorAlpha(params['id'])),
        tap(console.log)
      )
      .subscribe(pais => this.pais = pais)

  }

}
