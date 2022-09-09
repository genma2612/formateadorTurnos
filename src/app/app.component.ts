import { Component, OnInit } from '@angular/core';
import { Turno } from './turno';
import { Formateador } from './formateador';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2'
import { json } from 'express';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FormatoTextoTurnos';
  nuevoFormateador = new Formateador();
  arrayGuardado: Turno[] = [];
  arrayGuardadoFiltrado: any = [[], 0, 0, 0, ""];
  textoGuardado: string = ``;
  textoCopiado: any;
  totalFiltrado: string = "";

  retornoFecha = this.fechaDeHoy();

  ///



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

  swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  tamañoDeArrayGuardado = this.arrayGuardado.length;

  arrayVacio() {
    return this.arrayGuardado.length == 0;
  }

  arrayNoVacio() {
    return !this.arrayVacio();
  }

  arrayFiltradoVacio() {
    return this.arrayGuardadoFiltrado[0].length == 0;
  }

  arrayFiltradoNoVacio() {
    return !this.arrayFiltradoVacio();
  }

  mandarAFormatear(textoGuardado: string) {
    if (this.arrayGuardado.length > 0)
      this.arrayGuardado = [];
    this.arrayGuardado = this.nuevoFormateador.formatearTodos(textoGuardado);
    this.arrayGuardadoFiltrado = this.nuevoFormateador.filtrarYContarFormateados(this.arrayGuardado);
    this.armadoDeCadenaTotales();
    localStorage.setItem("cadenaTexto", textoGuardado);
    localStorage.setItem("arrayGuardado", JSON.stringify(this.arrayGuardado));
    localStorage.setItem("arrayGuardadoFiltrado", JSON.stringify(this.arrayGuardadoFiltrado));
  }

  mandarAFormatearConBoton(textoGuardado: string) {
    if (textoGuardado != "") {
      if (localStorage.getItem("arrayGuardado") == null) {
        this.mandarAFormatear(textoGuardado);
        this.Toast.fire({
          icon: 'success',
          title: 'Tablas generadas'
        })
      }
      else {
        this.Toast.fire({
          icon: 'info',
          title: 'Ya hay tablas generadas'
        })
    }
    }
    else {
      this.Toast.fire({
        icon: 'error',
        title: 'No hay texto para generar las tablas'
      })
    }

  }

  borrarLocalStorage() {
    if (localStorage.getItem("arrayGuardado") != null) {
      this.swalWithBootstrapButtons.fire({
        title: 'Borrar tablas?',
        text: "Esta acción no se puede deshacer...",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem("arrayGuardado");
          this.arrayGuardado = [];
          localStorage.removeItem("arrayGuardadoFiltrado");
          this.arrayGuardadoFiltrado[0] = [];
          this.swalWithBootstrapButtons.fire(
            'Confirmado!',
            'Las tablas fueron borradas',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            'Cancelado!',
            'Las tablas no se borraron',
            'error'
          )
        }
      })
    }
    else {
      this.Toast.fire({
        icon: 'error',
        title: 'No hay tablas para borrar'
      })

    }
  }

  borrarAreaDeTexto() {
    if (this.textoGuardado != "") {
      this.swalWithBootstrapButtons.fire({
        title: 'Limpiar el área de texto?',
        text: "Esta acción no se puede deshacer...",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.textoGuardado = "";
          localStorage.removeItem("cadenaTexto");
          this.swalWithBootstrapButtons.fire(
            'Confirmado!',
            'El área de texto se limpió',
            'success'
          )
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.swalWithBootstrapButtons.fire(
            'Cancelado!',
            'El texto no se borró',
            'error'
          )
        }
      })
    }
    else {
      this.Toast.fire({
        icon: 'info',
        title: 'El área de texto está vacía'
      })
    }
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

  fechaDeHoy() {
    const today = new Date();
    let mm = today.getMonth() + 1; // Months start at 0!
    let mms = ""
    let dd = today.getDate();
    let dds = "";
    if (dd < 10)
      dds = '0' + dd;
    if (mm < 10)
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

  ngOnInit(): void {
    if (localStorage.getItem("cadenaTexto") != null) {
      let cadenaParseada: string | null = localStorage.getItem("cadenaTexto");
      if (cadenaParseada != null) {
        //console.log(cadenaParseada);
        this.textoGuardado = cadenaParseada;
      }
    }
    if (localStorage.getItem("arrayGuardado") != null) {
      //console.log("Entró en el onInit");
      let arrayParseado: string | null = localStorage.getItem("arrayGuardado");
      if (arrayParseado != null) {
        this.arrayGuardado = JSON.parse(arrayParseado);
      }
    }
    if (localStorage.getItem("arrayGuardadoFiltrado") != null) {
      let arrayFiltradoParseado: string | null = localStorage.getItem("arrayGuardadoFiltrado");
      if (arrayFiltradoParseado != null) {
        this.arrayGuardadoFiltrado = JSON.parse(arrayFiltradoParseado);
      }
    }
  }

}
