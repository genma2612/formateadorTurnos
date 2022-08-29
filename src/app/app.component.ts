import { Component } from '@angular/core';
import { Turno } from './turno';
import { Formateador } from './formateador';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FormatoTextoTurnos';
  nuevoFormateador = new Formateador();
  arrayGuardado: Turno[] = [];
  textoGuardado:string = ``;

  mandarAFormatear(textoGuardado:string){
    if(this.arrayGuardado.length > 0)
      this.arrayGuardado = [];
    this.arrayGuardado = this.nuevoFormateador.formatearTodos(textoGuardado);
  }
}
