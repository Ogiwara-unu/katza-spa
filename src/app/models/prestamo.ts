export class Prestamo {
    constructor(
        public idPrestamo:number,
        public empleadoEmisor:number,
        public empleadoReceptor:number,
        public estadoPrestamo:string,
        public fechaPrestamo:Date,
        public fechalimite:Date,
    ){

    }


}
