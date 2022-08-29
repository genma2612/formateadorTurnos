export class Turno {
    
    doctor:string;
    nombre:string;
    dni:string;
    hora:string;
    comprobante:string;
    tipo:string = "DX";
    
    constructor(doctor:string,nombre:string, dni:string, hora:string, comprobante:string){
        this.doctor = doctor;
        this.nombre = nombre;
        this.dni = dni;
        this.hora = hora;
        this.comprobante = comprobante;
        if(this.comprobante.length > 0){
            if(this.doctor == "Blanqueamiento")
                this.tipo = this.doctor;
            else
                this.tipo = "DX Promo"
        }
    }
}
