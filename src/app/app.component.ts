import { Component } from '@angular/core';
import { Turno } from './turno';
import { Formateador } from './formateador';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'FormatoTextoTurnos';
  nuevoFormateador = new Formateador();
  arrayGuardado: Turno[] = [];
  arrayGuardadoFiltrado: any = [[], 0, 0, 0, ""];
  textoGuardado: string = ``;
  textoCopiado: any;
  totalFiltrado: string = "";

  retornoFecha = this.fechaDeHoy();

  ///

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
    this.arrayGuardadoFiltrado = this.nuevoFormateador.filtrarYContarFormateados(this.arrayGuardado);
    this.armadoDeCadenaTotales();
  }

  armadoDeCadenaTotales() {
    let cadenaTotales = "";
    if (this.arrayGuardadoFiltrado[1] != 0)
      cadenaTotales += this.arrayGuardadoFiltrado[1] + "dx ";
    if (this.arrayGuardadoFiltrado[2] != 0)
      cadenaTotales += this.arrayGuardadoFiltrado[2] + "dxpromo ";
    if (this.arrayGuardadoFiltrado[3] != 0)
      cadenaTotales += this.arrayGuardadoFiltrado[3] + "blanq";
    this.arrayGuardadoFiltrado[4] = cadenaTotales;
  }

  fechaDeHoy(){
    const today = new Date();
    let mm = today.getMonth() + 1; // Months start at 0!
    let mms = ""
    let dd = today.getDate();
    let dds = "";
    if(dd < 10) 
      dds = '0' + dd;
    if(mm < 10) 
      mms = '0' + mm; 
    return dds + '/' + mms;
  }


  constructor(private clipboardService: ClipboardService) { }

  copyContent(id: string) {
    //console.log(document.getElementById('turnos')?.innerText);
    this.textoCopiado = document.getElementById(id)?.innerText;
    //console.log(this.textoCopiado);
    this.clipboardService.copyFromContent(this.textoCopiado);
    this.Toast.fire({
      icon: 'success',
      title: 'Turnos copiados'
    })
  }

}
