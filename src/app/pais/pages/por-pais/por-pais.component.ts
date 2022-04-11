import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `]
})
export class PorPaisComponent {

  constructor(
    private paisService: PaisService
  ) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (resp) => {
          this.paises = resp;

          console.log(resp);
        },
        error: (err) => {
          this.hayError = true;
          this.paises = [];

          console.log('Error: ', err);
        },
        complete: () => console.log('País buscado')
      })
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(termino)
      .subscribe({
        next: paises => this.paisesSugeridos = paises.splice(0, 3),
        error: err => this.paisesSugeridos = []
      });

  }

  buscarSugerido(termino: string) {
    this.buscar(termino);
  }
}
