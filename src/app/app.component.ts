import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Turno } from './turno';
import { Formateador } from './formateador';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {

  title = 'FormatoTextoTurnos';
  nuevoFormateador = new Formateador();
  arrayGuardado: Turno[] = [];
  textoGuardado: string = ``;
  textoCopiado: any;

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  tamañoDeArrayGuardado = this.arrayGuardado.length;

  arrayVacio() {
    return this.arrayGuardado.length == 0;
  }

  arrayNoVacio() {
    return !this.arrayVacio();
  }

  mandarAFormatear(textoGuardado: string) {
    if (this.arrayGuardado.length > 0)
      this.arrayGuardado = [];
    this.arrayGuardado = this.nuevoFormateador.formatearTodos(textoGuardado);
  }

  constructor(private clipboardService: ClipboardService) { }

  copyContent() {
    //console.log(document.getElementById('turnos')?.innerText);
    this.textoCopiado = document.getElementById('turnos')?.innerText;
    //console.log(this.textoCopiado);
    this.clipboardService.copyFromContent(this.textoCopiado);
    this.Toast.fire({
      icon: 'success',
      title: 'Turnos copiados'
    })
  }

  allMsgChangeLogs: string[] = [];
  allEmployeeChangeLogs: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    
    //this.mandarAFormatear(this.textoGuardado);

  console.log("Cambia algo, si si.");

  }

}
