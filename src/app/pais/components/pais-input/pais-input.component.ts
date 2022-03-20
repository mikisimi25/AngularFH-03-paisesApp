import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();
  @Input() placeholder: string = '';

  //Subject es un Observable
  //Debouncer se emita cuando se deja de escribir
  debouncer: Subject<string> = new Subject();

  termino: string = '';

  //ngOnInit, cuando el componente es creado y ya está inicializado
  //Nos estamos suscribiendo al debouncer
  ngOnInit(): void {
    this.debouncer
      //Nos permite transformar la salida del subscribe
      .pipe(
        //debounceTime, cuanto quiero esperar antes de emitir el siguiente valor
        //Le estoy diciendo que no emita valores hasta que el observable no emita valores por 300ms
        debounceTime(300)
      )
      .subscribe({
        next: valor => {
          this.onDebounce.emit(valor)
        }
      })
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  //Cada vez que alguien presione una tecla va llamar al next, el next está suscrito en el debouncer.subscribe, ahí se va a recibir un nuevo valor 
  //Cada vez que se pulsa una tecla se pasa su valor al next() el cual le dice al debouncer que ha habido un cambio(lo sabe pq está suscrito) y hace clg del cambio 
  teclaPresionada(event: any) {
    this.debouncer.next(this.termino);
  }

}