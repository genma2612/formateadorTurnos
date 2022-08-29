import { Turno } from "./turno";

export class Formateador {

    public formatearUno(turno:string){

        let array = [];
        let comprobante = "";
        let cadena = turno.replace(/(\r\n|\n|\r)/gm, "$$$")
        array = cadena.split("$$");

        //array[0] = array[0].replace("Doctor: ", "");
        array[1] = array[1].replace("Paciente: ", "");
        array[2] = array[2].replace("Hora(s): ", "");
        let dni = array[1].split(" ", 1);
        let nombre = array[1].replace(dni[0] + " ", "");
        //console.log(array[3]);
        if(array.length == 4)
            if(array[3] !== "")
                comprobante = array[3];
        return new Turno(this.reemplazarDr(array[0]), nombre, dni[0],
        array[2], comprobante);
        //console.log(new Turno(this.reemplazarDr(array[0]), nombre, dni[0], array[2], comprobante));
    }

    public formatearTodos(cadenaTodos:string){
        let arrayRetorno: Turno[] = [];
        let array = cadenaTodos.split("Doctor: ");
        array.shift();
        //console.log(array);
        array.forEach(turno => {
            arrayRetorno.push(this.formatearUno(turno));
            //console.log(turno);
        });
        //console.log(arrayRetorno);
        return arrayRetorno;
    }

    public reemplazarDr(doctor:string){
        switch (doctor) {
            case "VICTOR ALARCON":
                return "Alarcón"
            case "BLANQUEAMIENTO PROMO":
                return "Blanqueamiento";
            case "CELESTE BELLO ODONTPEDIATRIA Y GENERAL":
                return "Bello";
            case "ODONTOLOGIA GENERAL":
                return "General";
            case "FELICITAS GONZALEZ ENDODONCIA":
                return "González";
            case "MART Y MIERC VILLARREAL VIERN PROTESIS":
                return "Villarreal";
            case "VICTORIA GATTAVARA":
                return "Gattavara";
            case "EDUARDO CANDELO":
                return "Candelo";
            case "JORGE CESALE":
                return "Cesale";
            case "SOL CONDOLUCI":
                return "Condoluci";
            case "EVANGELINA GRANADOS":
                return "Granados";
            case "FERNANDO VARGAS":
                return "Vargas";
            case "SOFIA PEREZ":
                return "Perez";
            default:
                return "";
        }
    }


}
