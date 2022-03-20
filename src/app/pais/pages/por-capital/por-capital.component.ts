import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
  }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarCapital(termino)
    .subscribe({
      next: res => {
        this.paises = res;

        console.log(res);
      },
      error: err => {
        this.hayError = true;
        this.paises = [];

        console.log(err);
      },
      complete: () => console.log('Buscado correctamente')
    });
  }

  sugerencias(termino: string) {
    console.log(termino);
  }
}
