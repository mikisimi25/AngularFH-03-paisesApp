import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent {

  constructor(
    private paisService: PaisService
  ) { }

  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

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
    
  }
}
